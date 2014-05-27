/**
 * Created by postepenno on 07.05.2014.
 */

var WanderPoint = Class.extend({

    init: function(x, y)
    {
        this.startX = x;
        this.startY = y;

        this.x = this.startX;
        this.y = this.startY;

        this.time = 0;
        this.dt = 0.05 + Math.random() * 0.2;
        if (Math.random() > 0.5) this.dt *= -1;
        this.mult = 5 + Math.random() * 5;
    },

    update: function()
    {
        this.x = this.startX + this.mult * Math.cos(this.time);
        this.y = this.startY + this.mult * Math.sin(this.time);

        this.time += this.dt;
    }

});