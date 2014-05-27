/**
 * Created by postepenno on 29.04.2014.
 */

var LinkAnim = ComponentBox.extend({

    init: function(delay, parent, link)
    {
        this.delay = delay;
        this.link = link;
        this.parent = parent;

        this._super();

        this.color = DragLink.getColorByState(link.state);
        this.g = new createjs.Graphics();
        this.shape = new createjs.Shape(this.g);
        this.parent.addChildAt(this.shape, 0);

        this.g.clear();
        this.g.setStrokeStyle(5);
        this.g.beginStroke(this.color);

        var x1 = this.link.p1.getX();
        var y1 = this.link.p1.getY();
        var x2 = this.link.p2.getX();
        var y2 = this.link.p2.getY();
        var dx = x2 - x1;
        var dy = y2 - y1;
        var dist = Math.floor(Math.sqrt(dx * dx + dy * dy));

        this.shape.x = x1 + dx / 2;
        this.shape.y = y1 + dy / 2;
        this.g.moveTo(-dist / 2, 0);
        this.g.lineTo(dist / 2, 0);

        var angle = Math.atan2(dy, dx);
        this.shape.rotation = angle * 180 / Math.PI;

        this.shape.scaleX = 0;
        createjs.Tween.get(this.shape)
            .wait(this.delay)
            .to({scaleX:1}, LevelAppear.LINK_TIME, createjs.Ease.cubicOut)
    },

    destroy: function()
    {
        this.parent.removeChild(this.shape);
    }

});