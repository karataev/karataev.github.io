/**
 * Created by postepenno on 25.05.2015.
 */

var app = angular.module("app", ["ngSocial", "myNav"]);

app.controller("MainCtrl", function($scope, $http, $timeout, Snd) {

  $scope.model = {
    levelComplete:undefined,
    gameState:undefined
  }


  $http.get("json/data.json")
    .success(function(data) {
      $scope.items = data;
      //$scope.items = data.splice(0, 1);

      _.each($scope.items, function(item) {
        item.flags = _.shuffle(item.flags);
      });

      $scope.model.gameState = 'intro';
      //$scope.gameStart();
    });

  Snd.init();

  $scope.playerAnswered = function (flag) {
    flag.selected = true;
    $scope.model.levelComplete = true;
    disableButtons();

    if(flag.bingo === true) {
      Snd.correct();
    }
    else {
      Snd.wrong();
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

app.controller("SndController", function (Snd) {
  var vm = this;

  function turnOn() {
    Snd.toggleEnabled();
  }

  function turnOff() {
    Snd.toggleEnabled();
  }

  function isEnabled() {
    return Snd.isEnabled();
  }

  // exports
  vm.turnOn = turnOn;
  vm.turnOff = turnOff;
  vm.isEnabled = isEnabled;
})

app.factory("Snd", function () {

  var sndEnabled = true;
  var sndCorrect;
  var sndWrong;
  var sndClick;

  function play(snd) {
    if (sndEnabled) {
      snd.play();
    }
  }

  return {
    init: function () {
      sndCorrect = new Howl({
        urls: ['snd/sndRight.mp3']
      });
      sndWrong = new Howl({
        urls: ['snd/sndWrong.mp3']
      });
      sndClick = new Howl({
        urls: ['snd/sndClick.mp3']
      });
    },

    toggleEnabled: function () {
      sndEnabled = !sndEnabled;
    },

    isEnabled: function () {
      return sndEnabled;
    },

    correct: function () {
      play(sndCorrect);
    },

    wrong: function () {
      play(sndWrong);
    },

    click: function () {
      play(sndClick);
    }

  }
})

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
          if (scope.flag.bingo) {
            el.addClass("flag-correct");
          }
          else if (scope.flag.selected) {
            el.addClass("flag-wrong");
          }
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

app.directive("btNext", function (Snd) {
  return {
    link: function (scope, el, attrs) {
      el.addClass("btn btn-success btn-lg bt-next");
      el.on("click", function () {

        el.hide();
        Snd.click();
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





