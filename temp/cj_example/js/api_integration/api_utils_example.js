window.APIUtilsExample = (function() {
    APIUtilsExample.name = 'APIUtilsExample';

    function APIUtilsExample() {}

    APIUtilsExample.divError = function() {
        return $('.error')
    }

    APIUtilsExample.spanErrorMethod = function() {
        return APIUtilsExample.divError().find('.method')
    }

    APIUtilsExample.spanErrorDescription = function() {
        return APIUtilsExample.divError().find('ul')
    }

    APIUtilsExample.resultAchievementsUnlocked = function() {
        return $('.result_achievements_unlocked ul.info')
    }

    APIUtilsExample.resultAchievements = function() {
        return $('.result_achievements_unlocked ul.achievements')
    }


    APIUtilsExample.setError = function(response) {
        APIUtilsExample.spanErrorMethod().text(response.method)
        APIUtilsExample.parserMessageError(response.errors)
    }

    APIUtilsExample.parserMessageError = function(messages) {
        var html = '',
            messages = messages.split(',');

        APIUtilsExample.clearMessageError()
        $.each(messages, function(i, message) {
            li = $('<li>').text(message)
            APIUtilsExample.spanErrorDescription().append(li)
        })
    }

    APIUtilsExample.clearMessageError = function() {
        APIUtilsExample.spanErrorDescription().html('')
        setTimeout(function() {
            APIUtilsExample.spanErrorMethod().text('')
            APIUtilsExample.spanErrorDescription().html('')
        }, 30000)
    }

    APIUtilsExample.parseJsonResultView = function(json) {
        var content = APIUtilsExample.resultAchievementsUnlocked();

        content.html('')
        $.each(json, function(key, value) {
            if (key == 'achievements' && typeof(value) == 'object') {
                $.each(value, function(_key, _value) {
                    APIUtilsExample.parseInfoAchievements(_value)
                })
            } else {
                content.append($('<li>').text(key + ': ' + value))
            }
        })
    }

    APIUtilsExample.parseInfoAchievements = function(obj) {
        var content = APIUtilsExample.resultAchievements(),
            ul = $('<ul>', {
                class: 'achievement_descriptions'
            });

        content.append(ul)

        $.each(obj, function(key, value) {
            ul.append($('<li>').text(key + ': ' + value))
        })
    }

    APIUtilsExample.salt = function() {
        /*
          dev_key  = Key obtained in the edition of your profile in DevCenter.
          game_key = Key obtained in the edition of your game after register it in DevCenter.
          request_time = The time and date that you made the request in out API.
          md5(reques_time/your_dev_key) = MD5 of your request_time/dev_key.
        */
        var devKey = $('.keys input.dev').val(),
            gameKey = $('.keys input.game').val();

        // request_time = The time and date that you made the request in our API
        var requestTime = new Date().getTime(),
            // salt
            md5 = CJApiUtils.encodeMD5(requestTime + '/' + devKey);

        // encode64(your_dev_key/your_game_key/request_time + md5)
        return CJApiUtils.encode64(devKey + '/' + gameKey + '/' + requestTime + '/' + md5).toString();
    }

    return APIUtilsExample;
})();