/**
 * Created by postepenno on 01.07.2014.
 */

App.Util = Class.extend({

    init: function()
    {
    },

    getParam: function(obj, key, defaultValue)
    {
        return (obj && typeof obj[key] !== "undefined") ? obj[key] : defaultValue;
    },

    pulse: function(target, scale)
    {
        if (scale == undefined) scale = 1.2;

        game.add.tween(target.scale)
            .to({x:scale, y:scale}, 1000, Phaser.Easing.Sinusoidal.InOut)
            .to({x:1, y:1}, 1000, Phaser.Easing.Sinusoidal.InOut)
            .loop()
            .start();
    },

    wobble: function(target, times)
    {
        if (times == undefined) times = 1;
        var tween = game.add.tween(target.scale);
        for (var i = 0; i < times; i++)
        {
            var tween = tween.to({x:1.2, y:0.8}, 100, Phaser.Easing.Sinusoidal.InOut);
            tween.to({x:1, y:1}, 100, Phaser.Easing.Sinusoidal.InOut);
        }
        tween.start();
    },

    tweenWithAlpha: function(target, delay)
    {
        target.alpha = 0;
        game.add.tween(target).to({alpha:1}, 500, Phaser.Easing.Linear.None, true, delay);
    },


    formatTime: function(ms)
    {
        var sec_num = Math.floor(ms / 1000); // don't forget the second param
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        //var time    = hours+':'+minutes+':'+seconds;

        return minutes + ':' + seconds;
    },

    // returns a randomized version of the array passed into the function
    // Testing Required!!
    randomizeArray: function(array)
    {
        var counter = array.length, temp, index;

        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            index = Math.floor(Math.random() * counter);

            // Decrease counter by 1
            counter--;

            // And swap the last element with it
            temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }

        return array;
    },

    randomizeAndCopyArray: function(array)
    {
        var newArray = array.slice();
        return this.randomizeArray(newArray);
    },

    equalArrays: function(arr, arr2)
    {
        if (arr.length != arr2.length) return false;

        for (var i = 0; i < arr.length; i++)
        {
            if (arr[i] !== arr2[i]) return false;
        }

        return true;
    },

    getDist: function(x1, y1, x2, y2)
    {
        var dx = x1 - x2;
        var dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    }

});
