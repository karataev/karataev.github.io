/**
 * Created by postepenno on 27.08.2014.
 */

App.LogicRotateCircle = Class.extend({

    init: function(parent)
    {
        this.group = game.add.group(parent);
        this.group.x = 0;
        this.group.y = 0;

        this.sourceSprite = data.createPaintingSprite(data.curLevel.data.painting);
        this.group.add(this.sourceSprite);

        this.circles = [];
        for (var i = 0; i < data.curLevel.data.circles.length; i++)
        {
            var circleData = data.curLevel.data.circles[i];
            this.addCircle(circleData);
        }
        //this.addCircle({x:315, y:170, radius:150, startAngle:180});

        this.activeCircle = null;

        game.input.onDown.add(this.touchDownHandler, this);
    },

    addCircle: function(params)
    {
        var circle = new App.RotationCircle(this.group, this.sourceSprite, params.x, params.y, params.radius, params.startAngle);
        this.circles.push(circle);
    },

    touchDownHandler: function(pointer, event)
    {
        var mx = Math.round(pointer.x);
        var my = Math.round(pointer.y);

        var circle = this.getCircleUnderPoint(mx, my);
        if (circle)
        {
            game.input.onUp.add(this.touchUpHandler, this);
            this.activeCircle = circle;
            this.activeCircle.updateOffsetAngle(mx, my);
            this.update();
            sounds.play("sndClick2");
        }
    },

    getCircleUnderPoint: function(px, py)
    {
        var bestCircle = null;
        var minRadius = 1000;
        for (var i = 0; i < this.circles.length; i++)
        {
            var circle = this.circles[i];
            if (circle.isPointInside(px, py))
            {
                if (circle.radius < minRadius)
                {
                    bestCircle = circle;
                    minRadius = circle.radius;
                }
            }
        }
        return bestCircle;
    },

    touchUpHandler: function()
    {
        game.input.onUp.remove(this.touchUpHandler, this);
        cmd.playerMadeMove();
        this.maybeLevelComplete();

        this.activeCircle = null;
    },

    maybeLevelComplete: function()
    {
        var angle = this.activeCircle.getAngle();
        //console.log("angle", angle);
        if (Math.abs(angle) < 5)
        {
            this.activeCircle.victory();
            this.removeCircle(this.activeCircle);

            if (this.circles.length == 0)
            {
                game.input.onDown.remove(this.touchDownHandler, this);
                cmd.levelComplete();
            }
            else sounds.play("sndGood");

        }
    },

    removeCircle: function(circle)
    {
        var index = this.circles.indexOf(circle);
        this.circles.splice(index, 1);
    },

    update: function()
    {
        if (this.activeCircle)
        {
            var px = game.input.activePointer.worldX;
            var py = game.input.activePointer.worldY;
            this.activeCircle.rotateToPoint(px, py);
        }
    }

});