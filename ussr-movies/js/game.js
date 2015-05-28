/**
 * Created by postepenno on 27.05.2015.
 */


var app = angular.module("app", ["toggle-switch", "ngSocial"]);

app.controller("MainCtrl", function ($scope, $http, sndService) {

    $scope.sndService = sndService;

    $scope.model = {
        gameState:"intro",
        levelComplete:undefined
    }

    $scope.items = [];
    var allItems = undefined;
    //$scope.item = undefined;

    $http.get("json/data.json")
        .success(function(data, status, headers, config) {
            //allItems = data.splice(0, 1);
            allItems = data;

            _.each(allItems, function(item) {
                item.answers = _.shuffle(item.answers);
                //console.table(item.answers);
            });

            //$scope.gameStart();
        });

    $scope.gameStart = function() {
        $scope.model.gameState = "play";
        $scope.levelStart(0);
    }

    $scope.levelStart = function (id) {
        //$scope.model.levelComplete = false;
        $scope.items[0] = allItems[id];
    }

    $scope.nextLevel = function () {
        var nextLevelId = $scope.items[0].id + 1;

        if (nextLevelId == allItems.length) {
            $scope.model.gameState = "complete";
        } else {
            $scope.levelStart(nextLevelId);
        }
    }

    $scope.getCorrectAnswers = function () {
        var result = 0;
        allItems.forEach(function (item) {
            item.answers.forEach(function (answer) {
                if (answer.bingo && answer.selected) result++;
            })
        })
        return result;
    }

    $scope.getTotalQuestions = function () {
        return allItems.length;
    }

    // ugly hack. should be in sndService
    $scope.$watch("sndService.musicEnabled", function (newValue) {
        if (newValue === true) {
            sndService.startMusic();
        } else if (newValue === false) {
            sndService.stopMusic();
        }
    })
})



app.directive("disableDrag", function () {
    return {
        link: function (scope, el, attrs) {
            el.on("mousedown", function (e) {
                e.preventDefault();
            })

        }
    }
})

app.directive("gamePanel", function () {
    return {
        link: function (scope, el, attrs) {
            el.addClass("panel panel-default gameplay clearfix");

            scope.$watch("item.hide", function (newValue) {
                if (newValue === true) {
                    TweenMax.to(el, 0.5, {opacity:0, onComplete: function () {
                        scope.nextLevel();
                        scope.$apply();
                    }});
                }

            })
        }
    }
})

app.controller("AnswerCtrl", function($scope, sndService) {
    $scope.disableButtons = function() {
        $scope.item.answers.forEach(function(x) {
            x.disabled = true;
        });
    };

    $scope.playerAnswered = function () {
        $scope.disableButtons();
        $scope.item.sticker.hide = true;
        $scope.item.nextShow = true;
        //$scope.update();
        if ($scope.item.playerCorrect) {
            sndService.play("correct");
        } else {
            sndService.play("wrong");
        }
    }

});

app.directive("quizAnswer", function() {
    return {
        link:function(scope, el, attrs) {
            el.on("click", function() {
                scope.answer.selected = true;
                if (scope.answer.bingo === true) scope.item.playerCorrect = true;
                scope.playerAnswered();
                scope.$apply();
            });

            scope.$watch("answer.disabled", function(newValue, oldValue) {
                if (newValue === true) {
                    el.off();
                    el.attr("disabled", "");
                    if (scope.answer.bingo) {
                        el.addClass("quiz-answer-correct");
                    }
                    if (!scope.answer.bingo && scope.answer.selected) {
                        el.addClass("quiz-answer-wrong");
                    }
                }
            });

            scope.$watch("item.selected", function(newValue) {
                if (newValue === true) {
                }
            });

        }
    }
});

app.directive("answerIcon", function() {
    return {
        link:function(scope, el, attrs) {
            el.addClass("glyphicon glyphicon-unchecked");
            scope.$watch("answer.selected", function(newValue, oldValue) {
                if (newValue === true) {
                    el.removeClass("glyphicon-unchecked");
                    el.addClass("glyphicon-check");
                }
            })
        }
    }
})

app.directive("nextButton", function (sndService) {
    return {
        link: function (scope, el, attrs) {
            el.addClass("btn btn-primary btn-lg btn-block bt-next");

            el.on("click", function () {
                sndService.play("click");
                el.off();
                el.remove();
                //scope.nextLevel();
                scope.item.hide = true;
                scope.$apply();
            })

            scope.$watch("item.nextShow", function (newValue) {
                if (newValue === true) {
                    el.css({display:"block"});
                    TweenMax.from(el, 1, {opacity:0});
                } else {
                    el.css({display:"none"});
                }
            })
        },
        template:"Далее"
    }
})

app.directive("tweenBorn", function() {
    return {
        link:function(scope, el, attrs) {
            TweenMax.from(el, 0.5, {opacity:0, ease:Power0.easeNone});
        }
    }
});


app.factory("sndService", function () {

    var sndCorrect = new Howl({
        urls: ['snd/sndRight.mp3']
    });
    var sndWrong = new Howl({
        urls: ['snd/sndWrong.mp3']
    });
    var sndClick = new Howl({
        urls: ['snd/sndClick.mp3']
    });

    var music = new Howl({
        urls:['snd/utro.mp3'],
        loop:true,
        autoplay:false
    })

    var s = {
        enabled:true,
        musicEnabled:true,
        correct:sndCorrect,
        wrong:sndWrong,
        click:sndClick
    };

    s.play = function (snd) {
        if (s.enabled) {
            s[snd].play();
        }
    }

/*
    $rootScope.$watch("sndService.musicEnabled", function (newValue) {
        console.log("!", newValue);
    })
*/

    s.stopMusic = function () {
         music.stop();
    }
    s.startMusic = function () {
        music.play();
    }

    return s;
})
