/**
 * Created by Feo on 13/02/15.
 */

function ApiService()
{
    var FETCH_SETTINGS_URL = "/api/api-settings/index/";

    var _ajax;

    {
        _ajax = new AjaxRequest();
    }

    this.fetch = function(data, onSuccess, onError) {
        _ajax.get(FETCH_SETTINGS_URL, { siteId: data["siteId"], gameSlug: data["gameSlug"] }, function(response) {
            var object = JSON.parse(response);
            if (object) {
                typeof onSuccess === "function" && onSuccess(object);
            } else {
                typeof onError === "function" && onError();
            }
        }, function() {
            typeof onError === "function" && onError();
        });
    };
}
