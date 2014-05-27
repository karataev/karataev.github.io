/**
 * Created by postepenno on 20.03.14.
 */

var Level = Class.extend({

    init: function(id, data)
    {
        this.id = id;
        this.data = data;

        this.reset();
    },

    reset: function()
    {
        this.isCompleted = false;
        this.isOpen = false;
        this.bestTime = 1000 * 60 * 99;
        this.lastTime = -1;
    },

    complete: function(newTime)
    {
        this.isCompleted = true;

        this.lastTime = newTime;
        if (this.lastTime < this.bestTime)
        {
            this.bestTime = this.lastTime;
        }
    },

    getTitle: function()
    {
        return this.data.name;
    }

});