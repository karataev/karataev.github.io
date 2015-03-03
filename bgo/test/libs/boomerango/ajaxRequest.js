/*
 * Dependecies:
 *  framework/accessory/url.js
 */

function AjaxRequest()
{
    /*
     * Public methods
     */

    this.get = function(url, params, onSuccess, onError) {
        _load(url, params, AjaxRequest.METHOD_GET, onSuccess, onError);
    }

    this.post = function(url, params, onSuccess, onError) {
        _load(url, params, AjaxRequest.METHOD_POST, onSuccess, onError);
    }

    /*
     * Private methods
     */

    function _createProvider() {
        // IE9+ supports XMLHttpRequest which prevent cyclic references
        return new XMLHttpRequest();
    }

    function _load(url, params, method, onSuccess, onError) {
        var requestUrl = (method == AjaxRequest.METHOD_GET) ? UrlAddParams(url, params) : url;
        var postParams = (method == AjaxRequest.METHOD_POST) ? UrlCreatePostParamsFromObject(params) : "";

        var provider = _createProvider();
        provider.open(method, requestUrl, true);
        provider.addEventListener("readystatechange", function _listener() {
            if (this.readyState == 4) {
                this.removeEventListener("readystatechange", _listener);
                if (this.status == 200) {
                    if (typeof onSuccess === "function") {
                        onSuccess(this.responseText);
                    }
                } else {
                    if (typeof onError === "function") {
                        onError();
                    }
                }
            }
        });
        if (method == AjaxRequest.METHOD_POST) {
            provider.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        provider.send(postParams);
        provider = null;
    }
}

AjaxRequest.METHOD_GET = "GET";
AjaxRequest.METHOD_POST = "POST";
