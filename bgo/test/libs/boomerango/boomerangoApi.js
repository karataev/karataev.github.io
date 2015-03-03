/**
 * API
 */

function BoomerangoApi(params)
{
    /*
     * Const
     */

    var ADS_CHANNEL_KEY = "adsChannel";
    var ADS_DESCRIPTION_KEY = "adsDescription";
    var LEVEL_SUCCESS_AD_INTERVAL_KEY = "levelSuccessAdInterval";
    var LEVEL_FAIL_AD_INTERVAL_KEY = "levelFailAdInterval";
    var REDIRECT_URL_KEY = "redirectUrl";

    /*
     * Fields
     */

    var _siteId;
    var _gameSlug;

    var _service;
    var _settings;
    var _isInitialized;

    var _adsManager;
    var _analyticsWrapper;

    var _coinsWinModal;
    var _coinsPanel;
    var _splashScreen;

    var _levelSucceededCounter;
    var _levelFailedCounter;

    /*
     * Ctor
     */

    {
        _siteId = params["siteId"] || 0;
        _gameSlug = params["gameSlug"] || "";

        _isInitialized = false;

        _levelSucceededCounter = 0;
        _levelFailedCounter = 0;

        _setupService();
        _setupAds();
        _setupWidgets();
        _setupSplashScreen();
        _setupAnalyticsWrapper();
    }

    /*
     * Public methods
     */

    this.initialize = function(params) {
        boomerango.getSharedEventCenter().postEvent(SharedEventKeys.API_INITIALIZE);
    
        _isInitialized = true;

        if (typeof params !== "undefined") {
            var muteSoundCallback = ("soundMuteCallback" in params && typeof params["soundMuteCallback"] === "function") ? params["soundMuteCallback"] : undefined;
            var unmuteSoundCallback = ("soundUnmuteCallback" in params && typeof params["soundUnmuteCallback"] === "function") ? params["soundUnmuteCallback"] : undefined;
            _adsManager.setSoundCallbacks(function() {
                typeof muteSoundCallback === "function" && muteSoundCallback();
                [].forEach.call(document.getElementsByTagName("audio"), function(element){
                    element.muted = true;
                });
            }, function() {
                typeof unmuteSoundCallback === "function" && unmuteSoundCallback();
                [].forEach.call(document.getElementsByTagName("audio"), function(element){
                    element.muted = false;
                });
            });
        }

        _tryShowAd();
    };

    this.preloadProgressChanged = function(params) {
        if(!params.maxValue)
        {
            ConsoleLog("[ERROR] boomerango.preloadProgressChanged incorrect usage. Expected object: {currentValue, maxValue}. Get object: ", params);
            return;
        }

        if(!params.currentValue)
            params.currentValue = 0;

        if(params.currentValue >= params.maxValue)
            boomerango.getSharedEventCenter().postEvent(SharedEventKeys.PRELOAD_COMPLETE);
        else
            boomerango.getSharedEventCenter().postEvent(SharedEventKeys.PRELOAD_PROGRESS, params);
    };

    this.gameStarted = function(params) {
        boomerango.getSharedEventCenter().postEvent(SharedEventKeys.API_GAMESTARTED);
    };

    this.gameEnded = function(params) {
        var gameType = typeof params["gameType"] !== "undefined" ? params["gameType"] : BoomerangoApi.GT_GAMETYPE1;

        boomerango.getSharedEventCenter().postEvent(SharedEventKeys.API_GAMEENDED, {
            siteId: _siteId,
            status: params["status"],
            level: params["level"],
            score: params["score"],
            gameType: gameType,
            gameSlug: _gameSlug
        });

        var isNeedShowAd = false;
        switch (params["status"]) {
            case BoomerangoApi.GS_LEVEL_SUCCEEDED: {
                isNeedShowAd = ++_levelSucceededCounter % _settings[LEVEL_SUCCESS_AD_INTERVAL_KEY] == 0;
                break;
            }
            case BoomerangoApi.GS_LEVEL_FAILED: {
                isNeedShowAd = ++_levelFailedCounter % _settings[LEVEL_FAIL_AD_INTERVAL_KEY] == 0;
                break;
            }
        }
        if (isNeedShowAd) {
            _tryShowAd();
        }
    };

    this.showMoreGames = function() {
        window.open(_settings[REDIRECT_URL_KEY], '_blank');
        _analyticsWrapper.logEvent(AnalyticsWrapper.E_MOREGAMES, _gameSlug);
    };

    /*
     * Private methods
     */

    function _setupService() {
        _settings = null;
        _service = new ApiService();
        _service.fetch({ siteId: _siteId, gameSlug: _gameSlug }, _onFetchSettingsSuccess, _onFetchSettingsError);
    }

    function _setupAds() {
        _adsManager = new BooomerangoAdsManager();
    }

    function _setupWidgets() {
        _coinsWinModal = new BoomerangoWinCoinsModalController(_gameSlug);
        _coinsPanel = new BoomerangoCoinsPanelController(_gameSlug);
    }

    function _setupSplashScreen() {
        _splashScreen = new BoomerangoSplashScreenController(function() {
            _analyticsWrapper.logEvent(AnalyticsWrapper.E_SPLASHSCREEN, [ "play_button", _gameSlug ]);
        }, function() {
            _analyticsWrapper.logEvent(AnalyticsWrapper.E_SPLASHSCREEN, [ "pub_logo", _gameSlug ]);
        }, function() {
            _analyticsWrapper.logEvent(AnalyticsWrapper.E_SPLASHSCREEN, [ "dev_logo", _gameSlug ]);
        });
    }

    function _setupAnalyticsWrapper() {
        _analyticsWrapper = new AnalyticsWrapper(_siteId);
    }

    function _tryShowAd() {
        if (_isInitialized && _settings != null) {
            _adsManager.showAds(_settings["adsDescription"], _settings["adsChannel"]);
        }
    }

    /*
     * Service handlers
     */

    function _onFetchSettingsSuccess(object) {
        if (ADS_CHANNEL_KEY in object &&
            ADS_DESCRIPTION_KEY in object &&
            LEVEL_SUCCESS_AD_INTERVAL_KEY in object &&
            LEVEL_FAIL_AD_INTERVAL_KEY in object &&
            REDIRECT_URL_KEY in object) {
            _settings = object;
            _tryShowAd();
        }
    }

    function _onFetchSettingsError() {
        // todo: try to fetch settings again
    }
}

// GameStatus
BoomerangoApi.GS_LEVEL_SUCCEEDED = 0;
BoomerangoApi.GS_LEVEL_FAILED = 1;

// GameType
BoomerangoApi.GT_GAMETYPE1 = 1;
BoomerangoApi.GT_GAMETYPE2 = 2;
BoomerangoApi.GT_GAMETYPE3 = 3;
BoomerangoApi.GT_GAMETYPE4 = 4;
BoomerangoApi.GT_GAMETYPE5 = 5;

/**
 * Ads Manager
 */

function BooomerangoAdsManager()
{
    var timeout = 3;
    var timerCount = 15;
    var adDisplayContainer = false;
    var adsLoader = false;
    var adsManager = false;
    var videoContent = false;
    var clientW = false;
    var clientH = false;
    var videoHeight;
    var adBlockLoaded = false;
    var timerInterval = false;
    var adTimerInterval = false;
    var isInitialized = false;

    var _muteCallback = undefined;
    var _unmuteCallback = undefined;

    this.showAds = showAds;

    /**
     * Показ рекламы
     */
    function showAds(gameDescriptionUrl, gameChannel) {
        if(!isInitialized) {
            initAdsBlock();
            isInitialized = true;
        }

        typeof _muteCallback === "function" && _muteCallback();

        videoContent = document.getElementById('gameCanvas');
        var rate = document.body.clientHeight > 480 ? 0.52 : 0.95; //for small moblies
        clientH = document.body.clientHeight * rate;
        clientW = document.body.clientWidth;
        videoHeight = clientH;
        setTimeout(function() {
            requestAds(gameDescriptionUrl, gameChannel);
        }, timeout * 1000);

        document.getElementById('boomerango-game').style.display = "none";
        document.getElementById('remaining').style.display = "block";
        document.getElementById('boomerango-ad').style.display = "block";

        boomerango.getSharedEventCenter().postEvent(SharedEventKeys.AD_DISPLAYED);
    }

    /**
     * Инициализая таймеров
     */
    function initTimer() {
        timerInterval = setTimeout(function(){
            hideAd();
        }, timerCount * 1000);

        var remTimer = timerCount;

        adTimerInterval = setInterval(function(){
            remTimer--;
            if (remTimer == 1) {
                clearInterval(adTimerInterval);
            }
            document.getElementById('rem').innerHTML = Math.floor(remTimer);
        }, 1000);
    }

    function createAdDisplayContainer() {
        adDisplayContainer = new google.ima.AdDisplayContainer(document.getElementById('boomerango-ad'));
    }

    function hideAd() {
        document.getElementById('boomerango-game').style.display = "block";
        document.getElementById('boomerango-ad').style.display = "none";
        document.getElementById('boomerango-ad').innerHTML = '';

        document.getElementById('remaining').style.display = "none";

        clearInterval(timerInterval);
        clearInterval(adTimerInterval);

        if (adsManager) {
            adsManager.destroy();
        }

        typeof _unmuteCallback === "function" && _unmuteCallback();

        boomerango.getSharedEventCenter().postEvent(SharedEventKeys.AD_HIDDEN);
    }

    function requestAds(encodedUrl, channel) {
        createAdDisplayContainer();
        adDisplayContainer.initialize();
        adsLoader = new google.ima.AdsLoader(adDisplayContainer);
        adsLoader.addEventListener(
            google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
            onAdsManagerLoaded,
            false);
        adsLoader.addEventListener(
            google.ima.AdErrorEvent.Type.AD_ERROR,
            onAdError,
            false);
        videoContent.addEventListener('ended', contentEndedListener);
        var adsRequest = new google.ima.AdsRequest();
        var advType = '';
        if (
            ((document.body.clientHeight < 1024) && (document.body.clientWidth < 768)) 
            || 
            ((document.body.clientHeight < 768) && (document.body.clientWidth < 1024))
        ) {
            advType = 'text_image_flash'; //dont show video on small mobile devices
        } else {
            advType = 'video_text_image_flash';
        }
        adsRequest.adTagUrl = 'http://googleads.g.doubleclick.net/pagead/ads?ad_type='+advType+'&client=ca-games-pub-2831045450878592&description_url=' + encodedUrl + '&channel=' + channel + '&videoad_start_delay=0&hl=en&max_ad_duration=30000';

        adsRequest.linearAdSlotWidth = clientW;
        adsRequest.linearAdSlotHeight = clientH;

        adsRequest.nonLinearAdSlotWidth = clientW;
        adsRequest.nonLinearAdSlotHeight = clientH;

        adsLoader.requestAds(adsRequest);
    }

    function contentEndedListener() {
        adsLoader.contentComplete();
    }

    function onAdsManagerLoaded(adsManagerLoadedEvent) {

        function onAdError(adErrorEvent) {
            adsManager.destroy();
        }

        function onAdEvent(adEvent) {
            var ad = adEvent.getAd();
            switch (adEvent.type) {
                case google.ima.AdEvent.Type.LOADED:
                    if (!ad.isLinear()) {

                    }
                    break;

                case google.ima.AdEvent.Type.STARTED:
                    if (ad.isLinear()) {
                        clearInterval(timerInterval);
                        timerCount = adsManager.getRemainingTime();
                    } else {
                        initTimer();
                    }
                    break;

                case google.ima.AdEvent.Type.USER_CLOSE:
                    hideAd();
                    break;

                case google.ima.AdEvent.Type.COMPLETE:
                    if (ad.isLinear()) {
                        hideAd();
                    }
                    break;
            }
        }

        var videoContent = document.getElementById('boomerango-game');

        adsManager = adsManagerLoadedEvent.getAdsManager(videoContent);

        adsManager.addEventListener(
            google.ima.AdErrorEvent.Type.AD_ERROR,
            onAdError);
        adsManager.addEventListener(
            google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
            onAdEvent);
        adsManager.addEventListener(
            google.ima.AdEvent.Type.USER_CLOSE,
            onAdEvent);

        adsManager.addEventListener(
            google.ima.AdEvent.Type.LOADED,
            onAdEvent);
        adsManager.addEventListener(
            google.ima.AdEvent.Type.STARTED,
            onAdEvent);
        adsManager.addEventListener(
            google.ima.AdEvent.Type.COMPLETE,
            onAdEvent);

        try {
            adsManager.init(clientW, clientH, google.ima.ViewMode.NORMAL);
            adsManager.start();
        } catch (adError) {

        }
    }

    function onAdError(adErrorEvent) {
        hideAd();
    }

    /**
     * Сбор блока с рекламой
     */
    function initAdsBlock() {

        var rem = document.createElement('div');
        rem.id = 'remaining';
        rem.style.background = "#333";
        rem.innerHTML = 'Advertisement - please wait <span id="rem">' + timerCount +'</span> seconds';
        document.body.appendChild(rem);

        var ads = document.createElement('div');
        ads.id = 'boomerango-ad';
        ads.style.display = "none";
        ads.style.position = "absolute";
        ads.style.zIndex = 99999;
        ads.style.background = "#333";
        ads.style.width = "100%";
        ads.style.height= "95%";

        document.body.appendChild(ads);

        adBlockLoaded = true;
    }

    this.setSoundCallbacks = function(muteCallback, unmuteCallback) {
        _muteCallback = muteCallback;
        _unmuteCallback = unmuteCallback;
    };
}


function BoomerangoWinCoinsModalController(gameSlug)
{
    var COINS_WIN_MODAL_FRAME_URL = 'http://' + window["boomerangoDomain"] + '/widget/coins-win-modal?gameSlug=' + gameSlug;

    var container;
    var isCreated;
    var onCreated;

    this.show = show;
    this.hide = hide;

    {
        DOMReady(create);
    }

    function create()
    {
        container = document.createElement('iframe');
        container.style.display = 'none';
        container.src = COINS_WIN_MODAL_FRAME_URL;
        document.body.appendChild(container);

        boomerango.getSharedEventCenter().addObserver(SharedEventKeys.SHOW_COINS_WIN, onShowEvent);
        boomerango.getSharedEventCenter().addObserver(SharedEventKeys.HIDE_COINS_WIN, onHideEvent);

        isCreated = true;

        if(onCreated != null)
        {
            onCreated();
            onCreated = null;
        }
    }

    function onShowEvent()
    {
        show();
    }

    function onHideEvent()
    {
        hide();
    }

    function show()
    {
        if(!isCreated)
        {
            onCreated = show;
            return;
        }

        container.style.display = 'block';
        container.className = 'boomerango-win-coins-modal-container boomerango-animated boomerango-coins-win-modal-show';
    }

    function hide()
    {
        container.className = 'boomerango-win-coins-modal-container boomerango-animated boomerango-coins-win-modal-hide';

        container.addEventListener('webkitAnimationEnd', onHideAnimationEnd);
        container.addEventListener('mozAnimationEnd', onHideAnimationEnd);
        container.addEventListener('MSAnimationEnd', onHideAnimationEnd);
        container.addEventListener('oanimationend', onHideAnimationEnd);
        container.addEventListener('animationend', onHideAnimationEnd);

        setTimeout(onHideAnimationEnd, 1000); // на тот случай если браузер не поддерживает анимацию
    }

    function onHideAnimationEnd()
    {
        container.removeEventListener('webkitAnimationEnd', onHideAnimationEnd);
        container.removeEventListener('mozAnimationEnd', onHideAnimationEnd);
        container.removeEventListener('MSAnimationEnd', onHideAnimationEnd);
        container.removeEventListener('oanimationend', onHideAnimationEnd);
        container.removeEventListener('animationend', onHideAnimationEnd);

        container.style.display = 'none';
    }
}

function BoomerangoCoinsPanelController(gameSlug)
{
    var COINS_PANEL_FRAME_URL = 'http://' + window["boomerangoDomain"] + '/widget/coins-panel?gameSlug=' + gameSlug;

    var container;

    var containerPositionCssClass;
    var containerCssClass = 'boomerango-coins-panel';
    var animatedCssClass = 'boomerango-animated';
    var showCssClass;
    var hideCssClass;

    var isHidden = true;
    var isCreated;
    var isGameStarted;

    var onInit;

    this.create = create;
    this.show = show;
    this.hide = hide;

    {
        DOMReady(init);
    }

    function init()
    {
        container = document.createElement('iframe');
        container.style.display = 'none';
        container.src = COINS_PANEL_FRAME_URL;
        document.body.appendChild(container);

        boomerango.getSharedEventCenter().addObserver(SharedEventKeys.SHOW_COINS_PANEL, onShowEvent);
        boomerango.getSharedEventCenter().addObserver(SharedEventKeys.HIDE_COINS_PANEL, onHideEvent);
        boomerango.getSharedEventCenter().addObserver(SharedEventKeys.CREATE_COINS_PANEL, onCreateEvent);
        boomerango.getSharedEventCenter().addObserver(SharedEventKeys.SPLASH_SCREEN_HIDDEN, onSplashScreenHiddenEvent);
    }

    function onCreateEvent(source, settings)
    {
        create(settings);
    }

    function onShowEvent()
    {
        show();
    }

    function onHideEvent()
    {
        hide();
    }

    function onSplashScreenHiddenEvent()
    {
        isGameStarted = true;
        if(onInit != null)
        {
            onInit();
            onInit = null;
        }
        boomerango.getSharedEventCenter().addObserver(SharedEventKeys.AD_DISPLAYED, onAdDisplayed);
        boomerango.getSharedEventCenter().addObserver(SharedEventKeys.AD_HIDDEN, onAdHidden);
    }

    function onAdDisplayed()
    {
        container.style.display = 'none';
    }

    function onAdHidden()
    {
        container.style.display = 'block';
    }

    function create(settings)
    {
        if(settings)
        {
            setCoordinates(settings);
            var postfix = defineCssClassPostfix(settings.position);
            containerPositionCssClass = containerCssClass + postfix;
            showCssClass = 'boomerango-coins-panel-show' + postfix;
            hideCssClass = 'boomerango-coins-panel-hide' + postfix;
        }

        isCreated = true;

        if(onInit != null)
        {
            onInit();
            onInit = null;
        }
    }

    function show()
    {
        if(!isCreated || !isGameStarted)
        {
            onInit = function(){
                show();
            };
            return;
        }

        container.style.display = 'block';
        isHidden = false;

        container.className = containerCssClass + ' ' + containerPositionCssClass + ' ' + animatedCssClass + ' ' + showCssClass;
    }

    function hide()
    {
        if(!isCreated || !isGameStarted)
        {
            onInit = function(){
                hide();
            };
            return;
        }

        container.style.display = 'block';

        container.addEventListener('webkitAnimationEnd', onHideAnimationEnd);
        container.addEventListener('mozAnimationEnd', onHideAnimationEnd);
        container.addEventListener('MSAnimationEnd', onHideAnimationEnd);
        container.addEventListener('oanimationend', onHideAnimationEnd);
        container.addEventListener('animationend', onHideAnimationEnd);

        container.className = containerCssClass + ' ' + containerPositionCssClass + ' ' + animatedCssClass + ' ' + hideCssClass;
    }

    function onHideAnimationEnd()
    {
        container.removeEventListener('webkitAnimationEnd', onHideAnimationEnd);
        container.removeEventListener('mozAnimationEnd', onHideAnimationEnd);
        container.removeEventListener('MSAnimationEnd', onHideAnimationEnd);
        container.removeEventListener('oanimationend', onHideAnimationEnd);
        container.removeEventListener('animationend', onHideAnimationEnd);

        isHidden = true;
    }

    function setCoordinates(settings)
    {
        if(settings.top)
            container.style.top = settings.top;
        if(settings.left)
            container.style.left = settings.left;
        if(settings.bottom)
            container.style.bottom = settings.bottom;
        if(settings.right)
            container.style.right = settings.right;
    }

    function defineCssClassPostfix(position)
    {
        switch (position)
        {
            case 4://'left':
            {
                return '-left';
            }
            case 2://'right':
            {
                return '-right';
            }
            case 3://'bottom':
            {
                return '-bottom';
            }
            default:
            case 1://'top':
            {
                return '-top';
            }
        }
    }
}

function BoomerangoSplashScreenController(playClickCallback, pubLogoClickCallback, devLogoClickCallback)
{
    var container;
    var playButton;
    var progressBar;
    var progressBarContainer;

    var _playClickCallback;
    var _pubLogoClickCallback;
    var _devLogoClickCallback;

    {
        _playClickCallback = playClickCallback;
        _pubLogoClickCallback = pubLogoClickCallback;
        _devLogoClickCallback = devLogoClickCallback;

        DOMReady(init);
    }

    function init()
    {
        container = document.getElementById('Boomerango-SplashScreen');
        if(!container)
            return;

        container.style.display = 'none';

        playButton = document.getElementById('Boomerango-SplashScreen-PlayButton');
        progressBarContainer = document.getElementById('Boomerango-SplashScreen-PreloadProgressContainer');
        progressBar = document.getElementById('Boomerango-SplashScreen-PreloadProgress');

        var pubLogoElement = document.getElementById('Boomerango-SplashScreen-PublisherLogo');
        if (pubLogoElement) {
            pubLogoElement.addEventListener('click', function () {
                typeof _pubLogoClickCallback === "function" && _pubLogoClickCallback();
            });
        }
        var devLogoElement = document.getElementById('Boomerango-SplashScreen-DeveloperLogo');
        if (devLogoElement) {
            devLogoElement.addEventListener('click', function () {
                typeof _devLogoClickCallback === "function" && _devLogoClickCallback();
            });
        }

        boomerango.getSharedEventCenter().addObserver(SharedEventKeys.AD_HIDDEN, onAdHidden);
        boomerango.getSharedEventCenter().addObserver(SharedEventKeys.PRELOAD_PROGRESS, onPreloadProgress);
        boomerango.getSharedEventCenter().addObserver(SharedEventKeys.PRELOAD_COMPLETE, onPreloadComplete);

        disablePlayButton();
    }

    function onAdHidden()
    {
        boomerango.getSharedEventCenter().removeObserver(SharedEventKeys.AD_HIDDEN, onAdHidden);
        show();
    }

    function show()
    {
        container.style.display = 'block';
    }

    function onPreloadProgress(params)
    {
        if(!progressBar)
            return;

        progressBar.style.width = (100 * params.currentValue / params.maxValue) + '%';
    }

    function onPreloadComplete()
    {
        hideProgress();
        enablePlayButton();
    }

    function hideProgress()
    {
        if(!progressBarContainer)
            return;

        progressBarContainer.style.visibility = 'hidden';
    }

    function disablePlayButton()
    {
        if(playButton == null)
            return;

        playButton.disabled = 'disabled';
    }

    function enablePlayButton()
    {
        if(playButton == null)
        {
            hide();
            return;
        }
        playButton.disabled = null;

        if(typeof playButton.addEventListener != 'undefined')
            playButton.addEventListener('click', onPlayClick);
        else if(typeof playButton.onclick != 'undefined')
            playButton.onclick = onPlayClick;
    }

    function onPlayClick()
    {
        hide();

        typeof _playClickCallback === "function" && _playClickCallback();
    }

    function hide()
    {
        container.style.display = 'none';
        boomerango.getSharedEventCenter().postEvent(SharedEventKeys.SPLASH_SCREEN_HIDDEN);
    }
}
