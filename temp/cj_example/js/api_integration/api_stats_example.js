window.APIStatsExample = (function() {
    APIStatsExample.name = 'APIStatsExample';

    function APIStatsExample() {
        this.achievementButton = "input.achievements[type='button']";
        this.eventListener()
    }

    APIStatsExample.prototype.eventListener = function() {
        $(document).on('click', this.achievementButton, function(e) {
            e.preventDefault()
            element = $(e.currentTarget)
            statName = $('input.' + element.data('stat_name')).val()
            value = $('input.achievement_value').val()

            this.onResponse({
                statName: statName,
                value: value
            })
        }.bind(this))
    }

    APIStatsExample.prototype.onResponse = function(obj) {
        $.when(this.submit(obj))
            .done(function(data) {
                APIUtilsExample.parseJsonResultView(data)
            })
            .fail(function(error) {
                APIUtilsExample.setError(error)
            })
    }

    APIStatsExample.prototype.submit = function(obj) {
        var deferred = $.Deferred(),
            // CJApi.stats
            stats = CJApi.stats;

        // request
        stats.submit(obj.statName, obj.value, APIUtilsExample.salt())


        /*
            response for success
              result =
                {
                  success: true,
                  achievements: [
                    {
                      id: "_id",
                      name: "name",
                      achieved: false,
                      description: "description",
                      image_medium: "/assets/achievements/star_medium.png",
                      image_thumb: "/assets/achievements/star_thumb.png"
                    }
                  ],
                  method: "stats",
                  score: 0,
                  stat_type: "maximum",
                  value: 0
        */
        $(stats).bind('onSubmit', function(event, data) {
            deferred.resolve(data)
        })


        /*
            response for error
            result =
              {
                success: false,
                method: 'stats',
                errors: [
                  'User don't logged',
                  'Stat value must be greater than or equal to 0',
                  'Stat doesn't exist',
                  'Salt can't be blank',
                  'Request has expired,
                  'Developer key is invalid',
                  'Game key is invalid',
                  'MD5 is invalid'
                ]

              }
        */
        $(stats).bind('onSubmitError', function(event, error) {
            deferred.reject(error)
        })
        return deferred.promise()
    }

    return APIStatsExample;
})();