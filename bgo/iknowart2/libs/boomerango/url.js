/**
 * Created by Feo on 11/01/15.
 */

function UrlGetParams(url)
{
    var params = {};
    var parts = url.split('?');
    if(parts.length > 1) {
        parts = parts[1].split('&');
        var l = parts.length;
        for(var i = 0; i < l; ++i) {
            var ps = parts[i].split('=');
            params[ps[0]] = ps[1];
        }
    }
    return params;
}

function UrlAddParams(url, params)
{
    var result = url;
    var paramsArray = [];
    for(var fieldName in params) {
        paramsArray.push(fieldName + '=' + params[fieldName]);
    }
    if(paramsArray.length != 0) {
        var joinSymbol = url.indexOf('?') >= 0 ? '&' : '?';
        result += joinSymbol + paramsArray.join('&');
    }
    return result;
}

function UrlCreatePostParamsFromObject(object)
{
    var result = "";
    if (object) {
        for (var key in object) {
            result += key + '=' + encodeURIComponent(object[key]) + '&';
        }
    }
    if (result !== null) {
        result = result.substr(0, result.length - 1);
    }
    return result;
}

function IsUrl(url)
{
    return url.match(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi) ? true : false;
}
