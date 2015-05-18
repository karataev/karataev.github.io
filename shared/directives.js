/**
 * Created by postepenno on 18.05.2015.
 */

app.directive("googleAds", function() {
    return {
        restrict:"E",
        replace:true,
        templateUrl:"../shared/google-ads.html",
        controller: function() {
            (adsbygoogle = window.adsbygoogle || []).push({});
        },
        link: function(scope, el, attrs) {
            var script = document.createElement( 'script' );
            script.type = 'text/javascript';
            script.src = "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
            script.async = true;
            el.append( script );
        }
    }
});

app.directive("googleAnalytics", function() {
    return {
        controller: function() {
            var _gaq = _gaq || [];
            _gaq.push(['_setAccount', 'UA-47794384-1']);
            _gaq.push(['_trackPageview']);

            (function() {
                var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
                ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
            })();
        }
    }
});

app.directive("navMenu", function() {
    return {
        replace:true,
        templateUrl:"../shared/nav-menu.html"
    }
});
