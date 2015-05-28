/**
 * Created by postepenno on 26.05.2015.
 */

app.directive("sticker", function () {
    return {
        restrict:"A",
        controller: function ($scope) {
            //data - for inner use!
            $scope.data = $scope.item.sticker;

        },
        link: function (scope, el, attrs) {

            el.addClass("shape shape-3");
            var colors = [
                {c1:"#D148F0", c2:"#C24BE3"},
                {c1:"#0099E7", c2:"#055AB7"},
                {c1:"#FFF601", c2:"#F9CF01"},
                {c1:"#11D400", c2:"#2A981B"}
            ];
            var color = _.sample(colors);
            var colorGradient = "linear-gradient(135deg, " + color.c1 + " 0%, " + color.c2 + " 100%)";
            //console.log(colorGradient);
            el.css({
                background:colorGradient
            });

            el.on("mousedown", function () {
                //scope.selectItem(scope.data);
                //scope.$apply();
            })

            scope.$watch("data.x", function (newValue, oldValue) {
                //console.log(newValue, oldValue);
                el.css({left:newValue + "px"});
                //TweenMax.to(el, 0.2, {x:newValue});
            })
            scope.$watch("data.y", function (newValue) {
                el.css({top:newValue + "px"});
                //TweenMax.to(el, 0.2, {y:newValue});
            })
            scope.$watch("data.width", function (newValue) {
                el.css({width:newValue + "px"});
                //TweenMax.set(el, {scaleX:newValue})
            })
            scope.$watch("data.height", function (newValue) {
                el.css({height:newValue + "px"});
            })
            scope.$watch("data.rotation", function (newValue) {
                //TweenMax.to(el, 0.2, {rotation:newValue});
                TweenMax.set(el, {rotation:newValue, transformOrigin:"left top"});
            })
            scope.$watch("data.selected", function (newValue) {
                if (newValue === true) {
                    el.addClass("sticker-selected");
                } else {
                    el.removeClass("sticker-selected");
                }
            })
            scope.$watch("data.hide", function (newValue) {
                if (newValue === true) {
                    TweenMax.to(el, 1.5, {opacity:0});
                }
            })

        }
    }
})

app.directive("stickerText", function () {
    return {
        controller: function ($scope) {
            $scope.data = $scope.item.sticker;

        },
        link: function (scope, el, attrs) {
            el.addClass("sticker-text");

            scope.$watch("data.height", function (newValue) {
                var newHeight = newValue - 10;
                el.css({
                    "line-height":newHeight + "px"
                })
            })
        }
    }
})
