/**
 * Created by postepenno on 11.04.2014.
 */

var DragLink = ComponentBox.extend({

    init:function(game, parent, p1, p2)
    {
        this.game = game;
        this.parent = parent;
        this.p1 = p1;
        this.p2 = p2;

        this._super();

        this.setState(DragLink.STATE_NON_INTERSECT);

        this.g = new createjs.Graphics();
        this.shape = new createjs.Shape(this.g);
        //this.parent.addChildAt(this.shape, 0);
        this.parent.addChild(this.shape);

        this.drawLink();
    },

    drawLink:function()
    {
        this.g.clear();
        this.g.setStrokeStyle(5);
        this.g.beginStroke(this.color);

        var xx = 100 + Math.floor(Math.random() * 200);
        var yy = 100 + Math.floor(Math.random() * 200);
        this.g.moveTo(this.p1.getX(), this.p1.getY());
        this.g.lineTo(this.p2.getX(), this.p2.getY());

    },

    setState: function(newState)
    {
        this.state = newState;
        this.color = DragLink.getColorByState(this.state);
    },

    getState: function()
    {
        return this.state;
    },

    render:function()
    {
        this.drawLink();
    },

    destroy: function()
    {
        this._super();

        this.parent.removeChild(this.shape);
    }

});

DragLink.STATE_INTERSECT = "StateIntersect";
DragLink.STATE_NON_INTERSECT = "StateNonIntersect";
DragLink.STATE_UNKNOWN = "StateUnknown";

DragLink.getColorByState = function(state)
{
    if (state == DragLink.STATE_INTERSECT) return "#AE0001";
    else if (state == DragLink.STATE_NON_INTERSECT) return "#569D01";
    else if (state == DragLink.STATE_UNKNOWN) return "#A5A5A5";
};