/**
 * Created by postepenno on 20.04.2015.
 */


(function($) {
    $.fn.Rotator = function(options) {
        var defaults = {
            container:'.rotator-wrapper',
            animationduration:1000,
            slideWidth:960
        };
        options = $.extend(defaults, options);

        var elm = $(this),
            pageIndex = 0,
            slideCount = 0;

        var _init = function() {
            slideCount = elm.find(options.container).children().children().length;
            elm.find(options.container).children().width(slideCount * options.slideWidth);
            _bindEvents();
            _togglePager();
        };

        var _bindEvents = function() {
            elm.find(".prev").on("click", _previous);
            elm.find(".next").on("click", _next);
        };

        var _next = function(e) {
            e.preventDefault();

            if (pageIndex >= 0 && pageIndex < slideCount - 1) {
                pageIndex++;
                elm.find(options.container).children().animate({
                    left:"-=" + options.slideWidth
                }, options.animationduration)
            }
            _togglePager();
        };

        var _previous = function(e) {
            e.preventDefault();
            if (pageIndex <= slideCount) {
                pageIndex--;
                elm.find(options.container).children().animate({
                    left:"+=" + options.slideWidth
                }, options.animationduration)
            }
            _togglePager();
        };

        var _togglePager = function() {
            var prev = elm.find(".prev");
            var next = elm.find(".next");

            if (pageIndex >= slideCount - 1) {
                next.hide();
            }
            else {
                next.show();
            }

            if (pageIndex <= 0) {
                prev.hide();
            }
            else {
                prev.show();
            }
        };

        return _init();

    }
})(jQuery);