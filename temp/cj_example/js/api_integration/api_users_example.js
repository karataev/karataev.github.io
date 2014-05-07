window.APIUsersExample = (function() {
    APIUsersExample.name = 'APIUsersExample';

    function APIUsersExample() {
        this.getUsernameButton = "input.get_username[type='button']";
        this.getUsernameLabel = $('label.get_username');
        this.eventListener()
    }

    APIUsersExample.prototype.eventListener = function() {
        $(document).on('click', this.getUsernameButton, function(e) {
            e.preventDefault()
            this.setUsername()
        }.bind(this))
    }

    APIUsersExample.prototype.setUsername = function(response) {
        $.when(this.getUsername())
            .fail(function(error) {
                APIUtilsExample.setError(error)
            })
            .done(function(obj) {
                this.getUsernameLabel.text(obj.username)
            }.bind(this))
    }

    APIUsersExample.prototype.getUsername = function() {
        var deferred = $.Deferred(),
            // CJApi.users
            users = CJApi.users;

        // request
        users.getUsername(APIUtilsExample.salt())

        /*
            response for success
            {
                username: 'username' or 'Guest'
            }
        */
        $(users).bind('onGetUsername', function(event, data) {
            deferred.resolve(data)
        })

        /*
            response error
            result = {
                success: false,
                method: 'username',
                errors: [
                    "Salt can't be blank",
                    "Request has expired",
                    "Developer key is invalid",
                    "Game key is invalid",
                    "MD5 is invalid"
                ]
            }
        */
        $(users).bind('onGetUsernameError', function(event, error) {
            deferred.reject(error)
        })

        return deferred.promise()
    }

    return APIUsersExample;
})();