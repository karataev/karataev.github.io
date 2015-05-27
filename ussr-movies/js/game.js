/**
 * Created by postepenno on 27.05.2015.
 */


var app = angular.module("app", []);

app.controller("MainCtrl", function ($scope, $http) {

    $scope.model = {
        gameState:"intro",
        levelComplete:undefined
    }

    $scope.items = [];
    var allItems = undefined;
    //$scope.item = undefined;

    $http.get("json/data.json")
        .success(function(data, status, headers, config) {
            //allItems = data.splice(0, 2);
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

app.controller("AnswerCtrl", function($scope) {
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

    }

});

app.directive("quizAnswer", function() {
    return {
        link:function(scope, el, attrs) {
            el.on("click", function() {
                scope.answer.selected = true;
                scope.item.playerCorrect = scope.answer.bingo === true;
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

app.directive("nextButton", function () {
    return {
        link: function (scope, el, attrs) {
            el.addClass("btn btn-primary btn-lg btn-block bt-next");

            el.on("click", function () {
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