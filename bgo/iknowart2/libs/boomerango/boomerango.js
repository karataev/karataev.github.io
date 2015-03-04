var SharedEventKeys = {
    WIDGET_ENROLL: "WIDGET_ENROLL",

    SHOW_SIGNIN_PANE: "SHOW_SIGNIN_PANE",
    SHOW_SIGNUP_PANE: "SHOW_SIGNUP_PANE",
    SHOW_INVITE_PANE: "SHOW_INVITE_PANE",
    SHOW_LUCKY_COIN: "SHOW_LUCKY_COIN",
    SHOW_COINS_WIN: "SHOW_COINS_WIN",
    SHOW_COINS_PANEL : "SHOW_COINS_PANEL",

    HIDE_SIGNIN_PANE: "HIDE_SIGNIN_PANE",
    HIDE_SIGNUP_PANE: "HIDE_SIGNUP_PANE",
    HIDE_INVITE_PANE: "HIDE_INVITE_PANE",
    HIDE_LUCKY_COIN: "HIDE_LUCKY_COIN",
    HIDE_COINS_WIN: "HIDE_COINS_WIN",
    HIDE_COINS_PANEL : "HIDE_COINS_PANEL",

    CREATE_COINS_PANEL : "CREATE_COINS_PANEL",

    SET_METADATA: "SET_METADATA",
    VALIDATE_TOKEN: "VALIDATE_TOKEN",

    LUCKY_COIN_GET_METADATA: "LUCKY_COIN_GET_METADATA",

    PARTNER_WINDOW_LOCATION: "PARTNER_WINDOW_LOCATION",

    API_INITIALIZE: "API_INITIALIZE",
    API_GAMESTARTED: "API_GAMESTARTED",
    API_GAMEENDED: "API_GAMEENDED",

    USER_COINS_WIN: "USER_COINS_WIN",

    AD_DISPLAYED: "AD_DISPLAYED",
    AD_HIDDEN: "AD_HIDDEN",

    SPLASH_SCREEN_HIDDEN: "SPLASH_SCREEN_HIDDEN",

    PRELOAD_PROGRESS: "PRELOAD_PROGRESS",
    PRELOAD_COMPLETE: "PRELOAD_COMPLETE"
};

function SharedEventProxy()
{
    /*
     * Const
     */

    var PM_DOMAIN = "*";
    var REG_MESSAGE = "SEC_REGISTER";
    var UNREG_MESSAGE = "SEC_UNREGISTER";
    var MESSAGE_PREFIX_ALL = "SEC_DEADC0DE";
    var MESSAGE_PREFIX_PARENT = "SEC_DEADBEEF";
    var SPLITTER = "|";

    /*
     * Private fields
     */

    var _widgetWindows;
    var _observers;

    /*
     * Ctor
     */

    {
        _widgetWindows = [];
        _observers = {};

        window.addEventListener("message", _messageEventListener);
    }

    /*
     * Public methods
     */

    this.addObserver = function(key, callback) {
        if (key in _observers) {
            _observers[key].push(callback);
        } else {
            _observers[key] = [ callback ];
        }
    };

    this.removeObserver = function (key, callback) {
        if (key in _observers) {
            if (callback) {
                var index = _observers[key].indexOf(callback);
                if (index != -1) {
                    _observers[key].splice(index, 1);
                }
            } else {
                _observers[key] = [];
            }
        }
    };

    this.postEvent = function(key, object) {
        var obj = typeof object !== "undefined" ? JSON.stringify(object) : "";
        var message = MESSAGE_PREFIX_ALL + SPLITTER + key + SPLITTER + obj;
        _widgetWindows.forEach(function (wnd) {
            wnd.postMessage(message, PM_DOMAIN);
        });

        if (key in _observers) {
            _observers[key].forEach(function (callback) {
                callback(object);
            });
        }
    }

    this.postEventToSource = function(receiver, key, object) {
        _unicastMessage(receiver, MESSAGE_PREFIX_ALL + SPLITTER + key + SPLITTER + JSON.stringify(object));
    }

    /*
     * Private methods
     */

    function _messageEventListener(event) {
        var message = event.data;
        if (message && typeof message == "string") {
            //console.info("Proxy: ", message);
            if (message == REG_MESSAGE) {
                event.preventDefault();
                if (_widgetWindows.indexOf(event.source) == -1) {
                    _widgetWindows.push(event.source);
                    if (_widgetWindows.length == 1) {
                        // Validate gamer's token by first registered widget
                        _unicastMessage(event.source, MESSAGE_PREFIX_ALL + SPLITTER + SharedEventKeys.VALIDATE_TOKEN + SPLITTER);
                    }
                    // Notify about widget enrollment
                    _postEvent(event.source, MESSAGE_PREFIX_PARENT + SPLITTER + SharedEventKeys.WIDGET_ENROLL + SPLITTER);
                }
            } else if (message == UNREG_MESSAGE) {
                event.preventDefault();
                var index = _widgetWindows.indexOf(event.source);
                if (index != -1) {
                    _widgetWindows.splice(index, 1);
                }
            } else {
                //ConsoleLog(message);
                var regexAll = new RegExp("^" + MESSAGE_PREFIX_ALL + "\\" + SPLITTER, "");
                var regexParent = new RegExp("^" + MESSAGE_PREFIX_PARENT + "\\" + SPLITTER, "");
                if (regexAll.test(message)) {
                    event.preventDefault();
                    _broadcastMessage(event.source, message);
                } else if (regexParent.test(message)) {
                    event.preventDefault();
                    _postEvent(event.source, message);
                }
            }
        }
    }

    function _broadcastMessage(source, message) {
        _widgetWindows.forEach(function (wnd) {
           if (wnd !== source) {
               wnd.postMessage(message, PM_DOMAIN);
           }
        });
    }

    function _unicastMessage(receiver, message) {
        receiver.postMessage(message, PM_DOMAIN);
    }

    function _postEvent(source, message) {
        var values = message.split(SPLITTER);
        var key = values[1];
        var object = (typeof values[2] !== "undefined" && values[2] != "") ? JSON.parse(values[2]) : null;
        if (key in _observers) {
            _observers[key].forEach(function (callback) {
                callback(source, object);
            });
        }
    }
}

function Boomerango(siteId)
{
    /*
     * Private fields
     */

    var _proxy;

    var _metadata;

    var _isWindowLoaded;
    /*
     * Ctor
     */

    {
        _isWindowLoaded = false;
        window.addEventListener("load", function() {
            _isWindowLoaded = true;
        });

        _metadata = { siteId: siteId };

        _proxy = new SharedEventProxy();

        // Widget enrollment
        _proxy.addObserver(SharedEventKeys.WIDGET_ENROLL, _widgetEnrollEventListener);

        // Modal panes control
        _proxy.addObserver(SharedEventKeys.SHOW_SIGNIN_PANE, _showSigninPaneEventListener);
        _proxy.addObserver(SharedEventKeys.SHOW_SIGNUP_PANE, _showSignupPaneEventListener);
        _proxy.addObserver(SharedEventKeys.SHOW_INVITE_PANE, _showInvitePaneEventListener);
        _proxy.addObserver(SharedEventKeys.SHOW_LUCKY_COIN, _showLuckyCoinEventListener);

        _proxy.addObserver(SharedEventKeys.HIDE_SIGNIN_PANE, _hideSigninPaneEventListener);
        _proxy.addObserver(SharedEventKeys.HIDE_SIGNUP_PANE, _hideSignupPaneEventListener);
        _proxy.addObserver(SharedEventKeys.HIDE_INVITE_PANE, _hideInvitePaneEventListener);
        _proxy.addObserver(SharedEventKeys.HIDE_LUCKY_COIN, _hideLuckyCoinEventListener);

        // Lucky coin settings
        _proxy.addObserver(SharedEventKeys.LUCKY_COIN_GET_METADATA, _getLuckyCoinMetadataEventListener);

        _proxy.addObserver(SharedEventKeys.PARTNER_WINDOW_LOCATION, _getWindowLocationEventListener);
    }

    /*
     * Public methods
     */

    this.getSharedEventCenter = function() {
        return _proxy;
    }

    /*
     * Private methods
     */

    function _calculateLuckyCoinMetadata() {
        var elements = document.getElementsByClassName("adsbygoogle");
        var metadata = {
            clientSize: { width: window.innerWidth, height: window.innerHeight },
            restrictedRects: []
        };
        for (var i = 0; i < elements.length; ++i) {
            var rect = elements[i].getBoundingClientRect();
            metadata.restrictedRects.push({ x: rect.left, y: rect.top, width: rect.width, height: rect.height });
        }
        return metadata;
    }

    /*
     * Event listeners
     */

    function _widgetEnrollEventListener(source) {
        _proxy.postEventToSource(source, SharedEventKeys.SET_METADATA, _metadata);
    }

    function _showSigninPaneEventListener() {
        document.getElementById("boomerangoSigninPanel").style.display = "block";
    }

    function _showSignupPaneEventListener() {
        document.getElementById("boomerangoSignupPanel").style.display = "block";
    }

    function _showInvitePaneEventListener() {
        document.getElementById("boomerangoInvitePanel").style.display = "block";
    }

    function _hideSigninPaneEventListener() {
        document.getElementById("boomerangoSigninPanel").style.display = "none";
    }

    function _hideSignupPaneEventListener() {
        document.getElementById("boomerangoSignupPanel").style.display = "none";
    }

    function _hideInvitePaneEventListener() {
        document.getElementById("boomerangoInvitePanel").style.display = "none";
    }

    function _showLuckyCoinEventListener(source, pos) {
        var element = document.getElementById("luckyCoin");
        element.style.left = pos.x + "px";
        element.style.top = pos.y + "px";
        element.style.display = "block";
    }

    function _hideLuckyCoinEventListener() {
        document.getElementById("luckyCoin").style.display = "none";
    }

    function _getLuckyCoinMetadataEventListener(source) {
        function CalculateAndPostMetadata() {
            var metadata = _calculateLuckyCoinMetadata();
            _proxy.postEventToSource(source, SharedEventKeys.LUCKY_COIN_GET_METADATA, JSON.stringify(metadata));
        }

        if (_isWindowLoaded) {
            CalculateAndPostMetadata();
        } else {
            window.addEventListener("load", function () {
                CalculateAndPostMetadata();
            });
        }
    }

    function _getWindowLocationEventListener(source)
    {
        var data = { location: window.location.href };
        _proxy.postEventToSource(source, SharedEventKeys.PARTNER_WINDOW_LOCATION, JSON.stringify(data));
    }

}

function DOMReady(callback)
{
    if ( document.readyState === "complete" ) {
        return setTimeout( callback, 1 );
    }

    if ( document.addEventListener ) {
        document.addEventListener( "DOMContentLoaded", function(){
            callback();
        }, false );

        // If IE event model is used
    } else if ( document.attachEvent ) {
        document.attachEvent( "onreadystatechange", function(){
            if ( document.readyState === "complete" ) {
                callback();
            }
        } );
    }
}

function ConsoleLog()
{
    if(!window.console)
        return;

    if(typeof window.console.log == 'function')
    {
        window.console.log.apply(console, arguments);
    }
    else if(typeof window.console.log == 'object')
    {
        // в ie как обычно все не как у людей
        // если инструменты разработчиков не открыты то window.console == undefined
        // и даже если открыта, то window.console.log - это не функция, а объект
        // не придумал как решить эту проблему умнее, может быть ты придумаешь?
        var l = arguments.length;
        switch(l)
        {
            case 0:
            {
                return;
            }
            case 1:
            {
                window.console.log(arguments[0]);
                return;
            }
            case 2:
            {
                window.console.log(arguments[0], arguments[1]);
                return;
            }
            case 3:
            {
                window.console.log(arguments[0], arguments[1], arguments[2]);
                return;
            }
            case 4:
            {
                window.console.log(arguments[0], arguments[1], arguments[2], arguments[3]);
                return;
            }
            default:
            case 5:
            {
                window.console.log(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
                return;
            }
        }
    }
}