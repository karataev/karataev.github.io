window.APIServicesExample = (function() {
    APIServicesExample.name = 'APIServicesExample';

    function APIServicesExample() {
        this.isSignedInButton = "input.is_signed_in[type='button']";
        this.loginButton = "input.login[type='button']"
        this.subscribeButton = "input.subscribe[type='button']"
        this.isSignedInLabel = $('label.is_signed_in');
        this.eventListener()
    }

    APIServicesExample.prototype.eventListener = function() {
        $(document).on('click', this.isSignedInButton, function(e) {
            e.preventDefault()
            var response = this.isSignedIn()
            this.setResponse(response)
        }.bind(this))

        $(document).on('click', this.loginButton, function(e) {
            e.preventDefault()

            // the method `showSignInBox` calls our screen to to login User
            CJApi.services.showSignInBox()
        })

        $(document).on('click', this.subscribeButton, function(e) {
            e.preventDefault()

            // the method `showRegistrationBox` calls our screen to to subscribe User
            CJApi.services.showRegistrationBox()
        })
    }

    APIServicesExample.prototype.setResponse = function(response) {
        response
            .fail(function(error) {
                APIUtilsExample.setError(error)
            })
            .done(function(obj) {
                this.isSignedInLabel.text(obj.isSignedIn)
            }.bind(this))
    }

    APIServicesExample.prototype.isSignedIn = function() {
        var deferred = $.Deferred(),
            // you must generate a new salt
            salt = APIUtilsExample.salt();

        // CJApi.services
        CJApi.services.isSignedIn(salt)

        /*
            response for success
            result = true or false
        */
        $(CJApi.services).bind('onIsSignedIn', function(event, result) {
            deferred.resolve(result)
        })

        /*
            response for error
            result =
              {
                success: false,
                method: 'is_signed_in',
                errors: [
                  'Salt can't be blank',
                  'Request has expired,
                  'Developer key is invalid',
                  'Game key is invalid',
                  'MD5 is invalid'
                ]
              }
        */
        $(CJApi.services).bind('onIsSignedInError', function(event, result) {
            deferred.reject(result)
        })
        return deferred.promise()
    }

    return APIServicesExample;
})();