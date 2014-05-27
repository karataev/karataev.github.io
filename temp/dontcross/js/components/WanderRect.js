/**
 * Created by postepenno on 06.05.2014.
 */

var WanderRect = ComponentBox.extend({

    init: function(parent, width, height, color, lineColor)
    {
        this.parent = parent;

        this._super();

        //this.asset = "dialogMedium";
        //this.addComponent( new Picture(this.parent, this.asset) );

        this.shape = new createjs.Shape();
        this.parent.addChild(this.shape);
        this.graphics = this.shape.graphics;

        this.width = width;
        this.height = height;
        this.color = color;
        this.lineColor = lineColor;

        this.points = [];
        this.addPoint(0, 0);
        this.addPoint(this.width, 0);
        this.addPoint(this.width, this.height);
        this.addPoint(0, this.height);


        this.tickRef = createjs.Ticker.on("tick", this.tick, this);
        this.draw();
    },

    addPoint: function(x, y)
    {
        this.points.push( new WanderPoint(x, y) );
    },

    draw: function()
    {
        var g = this.graphics;

        g.clear();
        g.beginFill(this.color);

        var i;
        for (i = 0; i < this.points.length; i++)
        {
            this.points[i].update();
        }

        var fp = this.points[0];
        g.moveTo(fp.x, fp.y);
        for (i = 1; i < this.points.length; i++)
        {
            var p = this.points[i];
            g.lineTo(p.x, p.y);
        }
        g.lineTo(fp.x, fp.y);
        g.endFill();

        this.drawLines();
    },

    drawLines: function()
    {
        var g = this.graphics;

        g.setStrokeStyle(3);
        g.beginStroke(this.lineColor);

        for (var i = 0; i < this.points.length; i++)
        {
            var i1 = i + 1;
            if (i1 == this.points.length) i1 = 0;
            this.drawLine(this.points[i], this.points[i1]);
        }
        g.endStroke();
    },

    drawLine: function(p1, p2)
    {
        var g = this.graphics;

        var dx = p2.x - p1.x;
        var dy = p2.y - p1.y;
        var angle = Math.atan2(dy, dx);

        var xx = 20 * Math.cos(angle);
        var yy = 20 * Math.sin(angle);

        g.moveTo(p1.x - xx, p1.y - yy);
        g.lineTo(p2.x + xx, p2.y + yy);
    },

    tick: function()
    {
        this.draw();
    },


    destroy: function()
    {
        this._super();

        this.parent.removeChild(this.shape);
        createjs.Ticker.off("tick", this.tickRef);
    }

});