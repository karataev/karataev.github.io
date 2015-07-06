/**
 * Created by postepenno on 25.05.2015.
 */

var app = angular.module("app", ["toggle-switch", "ngSocial", "myNav"]);

app.controller("MainCtrl", function($scope, $http, $timeout) {

    $scope.model = {
        levelComplete:undefined,
        gameState:undefined,
        sndEnabled:true
    }

    $scope.goodMsg = ["Да!", "Правильно!", "Верно!", "Молодцом!"];
    $scope.badMsg = ["Увы :(", "Ошибочка", "Очень жаль"];

    alertify.set({ delay: 3000 });

    $http.get("json/data.json")
        .success(function(data, status, headers, config) {
            $scope.items = data;
            //$scope.items = data.splice(0, 1);

            _.each($scope.items, function(item) {
                item.flags = _.shuffle(item.flags);
            });

            $scope.model.gameState = 'intro';
            //$scope.gameStart();
        });

    $scope.sndCorrect = new Howl({
        urls: ['snd/sndRight.mp3']
    });
    $scope.sndWrong = new Howl({
        urls: ['snd/sndWrong.mp3']
    });
    $scope.sndClick = new Howl({
        urls: ['snd/sndClick.mp3']
    });

    $scope.playSnd = function (snd) {
        if ($scope.model.sndEnabled) {
            snd.play();
        }
    }

    $scope.playerAnswered = function (flag) {
        flag.selected = true;
        $scope.model.levelComplete = true;
        disableButtons();

        var index;
        if(flag.bingo === true) {
            $scope.playSnd($scope.sndCorrect);
            index = Math.floor(Math.random() * $scope.goodMsg.length);
            alertify.success($scope.goodMsg[index]);
        }
        else {
            $scope.playSnd($scope.sndWrong);
            index = Math.floor(Math.random() * $scope.badMsg.length);
            alertify.error($scope.badMsg[index]);
        }
    }

    var disableButtons = function () {
        $scope.curItem.flags.forEach(function(x) {
            x.disabled = true;
        });
    }

    $scope.gameStart = function() {
        $scope.model.gameState = "play";
        $scope.levelStart(0);
    }

    $scope.levelStart = function (id) {
        $scope.model.levelComplete = false;
        $scope.curItem = $scope.items[id];
    }

    $scope.nextLevel = function () {

        $scope.curItem.flags.forEach(function (x) {
            x.hide = true;
        })

        $timeout(function () {
            doNextLevel();
        }, 500)
    }

    var doNextLevel = function() {
        var nextId = $scope.curItem.id + 1;
        if (nextId < $scope.items.length) {
            $scope.levelStart(nextId);
        } else {
            $scope.curItem = null;
            $scope.model.gameState = "complete";
        }
    }

    $scope.getCorrectAnswers = function () {
        var result = 0;
        if ($scope.items) {
            $scope.items.forEach(function (item) {
                item.flags.forEach(function (flag) {
                    if (flag.bingo && flag.selected) result++;
                })
            })
        }
        return result;
    }

    $scope.restartGame = function () {
        window.location.reload();
    }

});

app.directive("ekFlag", function () {
    return {
        link: function (scope, el, attrs) {
            el.addClass("flag-wrapper");

            el.on("click", function () {
                scope.playerAnswered(scope.flag);
                scope.$apply();
            })

            scope.$watch("flag.disabled", function (newValue) {
                if (newValue === true) {
                    el.css({cursor:"default"});
                    el.off();
                }
            })

            scope.$watch("flag.selected", function (newValue) {
                if (newValue === true) {
                    el.addClass("flag-selected");
                }
            })

            scope.$watch("flag.hide", function (newValue) {
                if (newValue === true) {
                    TweenMax.to(el, 0.5, {opacity:0, x:"+=40", ease:Power2.easeOut});
                }
            })

        },
        template:'<img ng-src="img/{{flag.img}}" alt=""/>'
    }
})

app.directive("btNext", function () {
    return {
        link: function (scope, el, attrs) {
            el.addClass("btn btn-success btn-lg bt-next");
            el.on("click", function () {

                el.hide();
                scope.playSnd(scope.sndClick);
                scope.nextLevel();
                scope.$apply();
            })
        }
    }
})

app.directive("bornAlpha", function () {
    return {
        link: function (scope, el, attrs) {
            var delay = attrs.bornAlpha || 0;
            //console.log("aaa", attrs.bornAlpha || 0);
            TweenMax.from(el, 0.5, {opacity:0, ease:Power0.easeNone, delay:delay});
        }
    }
})

app.directive("flagBorn", function () {
    return {
        link: function (scope, el, attrs) {
            var delay = attrs.flagBorn || 0;
            TweenMax.from(el, 0.5, {opacity:0, y:"+=20", ease:Back.easeOut, delay:delay});
        }
    }
})

app.directive("grade", function () {
    return {
        link: function (scope, el, attrs) {
            el.addClass("grade");

        },
        template:"<p>grade!</p>"
    }
})





