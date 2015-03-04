/**
 * Created by Feo on 28/01/15.
 */

function AnalyticsWrapper(siteId)
{
    /*
     * Private fields
     */

    var _siteId;

    // TODO: implement fetching site name from service
    // TODO2: siteId will replaced with project slug later
    var _siteNames = [
        "default",
        "",
        "gg4f",
        "mindgames",
        "",
        "freegamesboom",
        "tg4f",
        "tgr",
        "boomerango"
    ];

    /*
     * Ctor
     */

    {
        _siteId = siteId;
    }

    /*
     * Public methods
     */

    /**
     * Track event
     * @param event
     * @param params - must be string or array
     */
    this.logEvent = function(event, params) {
        var string = "/gmf/" + _siteNames[_siteId] + "/" + event;
        if (typeof params !== "undefined") {
            switch (typeof params) {
                case "string": {
                    string += "/" + params;
                    break;
                }
                case "object": {
                    if (Object.prototype.toString.call(params) === "[object Array]") {
                        params.forEach(function(param) {
                            string += "/" + param;
                        });
                    }
                }
            }
        }
        string += "/";
        ga("send", "pageview", string);
    }
}

/*
 * Events
 */

AnalyticsWrapper.E_SIGNIN = "login";
AnalyticsWrapper.E_SIGNUP = "signup";
AnalyticsWrapper.E_VOTEUP = "vote_up";
AnalyticsWrapper.E_VOTEDOWN = "vote_down";
AnalyticsWrapper.E_LUCKYCOIN = "lucky_coin";
AnalyticsWrapper.E_HIGHSCORES = "highscores";
AnalyticsWrapper.E_LEADERBOARD = "leaderboard";

AnalyticsWrapper.E_MOREGAMES = "moregames";
AnalyticsWrapper.E_SPLASHSCREEN = "splashscreen";
