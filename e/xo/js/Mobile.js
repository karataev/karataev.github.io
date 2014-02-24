/**
 * Created by postepenno on 19.02.14.
 */

var Mobile = Class.extend({

    init: function()
    {
        this.android = false;
        this.chromeOS = false;
        this.iOS = false;
        this.macOS = false;
        this.windows = false;
        this.linux = false;
        this.desktop = false;

        this.parseUserAgent();

        if (this.isMobile())
        {
            this.disableScroll();
            this.checkOrientation();

            $(window).on("orientationchange", $.proxy(this.onRotate, this));

        }

    },

    onRotate: function() {
        this.checkOrientation();
        //alert("Yo man!!! " + this.desktop);
    },

    disableScroll: function() {
        $(document).on('touchmove', function(e) {
            e.preventDefault();
        });
    },

    parseUserAgent: function()
    {
        var ua = navigator.userAgent;

        if (/Android/.test(ua)) {
            this.android = true;
        } else if (/CrOS/.test(ua)) {
            this.chromeOS = true;
        } else if (/iP[ao]d|iPhone/i.test(ua)) {
            this.iOS = true;
        } else if (/Linux/.test(ua)) {
            this.linux = true;
        } else if (/Mac OS/.test(ua)) {
            this.macOS = true;
        } else if (/Windows/.test(ua)) {
            this.windows = true;
        }

        if (this.windows || this.macOS || this.linux) {
            this.desktop = true;
        }
    },

    checkOrientation: function() {
        if (!this.isCorrectOrientation())
        {
            $("#block").show();
        }
        else {
            $("#block").hide();
        }
    },

    isCorrectOrientation: function() {
        if (window.orientation === 0 || window.orientation === 180) return true;
        return false;
    },

    isMobile: function() {
        return !this.desktop;
    },

    isDesktop: function() {
        return this.desktop;
    }

});

