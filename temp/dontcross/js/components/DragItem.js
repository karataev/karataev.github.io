/**
 * Created by postepenno on 11.04.2014.
 */

var DragItem = ComponentBox.extend({

    init: function(game, parent, levelView, id, params)
    {
        this.game = game;
        this.parent = parent;
        this.levelView = levelView;
        this.id = id;

        this.x = 0;
        this.y = 0;
        this.fixed = false;
        if (params)
        {
            if (params.x != undefined) this.x = params.x;
            if (params.y != undefined) this.y = params.y;
            if (params.fixed != undefined) this.fixed = params.fixed;
        }

        this._super();

        this.container = new createjs.Container();
        this.parent.addChild(this.container);
        this.setPos(this.x, this.y);

        //var assetName = this.fixed ? "dragItemFixed" : "dragItem";
        //this.pic = new Picture(this.container, assetName, {x:0, y:0, center:true});
        //this.addComponent(this.pic);


        this.shape = new createjs.Shape();
        this.container.addChildAt(this.shape, 0);

        //var shadow = new createjs.Shadow("#000000", 8, 8, 5);
        //shape.shadow = shadow;
    },

    saveLinks: function(allLinks)
    {
        this.links = [];
        for (var i = 0; i < allLinks.length; i++)
        {
            var link = allLinks[i];
            if (link.p1.id === this.id || link.p2.id === this.id)
            {
                this.links.push(link);
            }
        }
    },

    getLinks: function()
    {
        return this.links;
    },

    render: function()
    {
        var color = "#FFFFFF";
        var radius = 10;

        if (this.fixed)
        {
            color = "#000000";
            radius = 10;
        }
        else
        {
            radius = Config.ITEM_GFX_RADIUS;
            var hasClearLink = false;
            var hasCrossLink = false;
            for (var i = 0; i < this.links.length; i++)
            {
                var link = this.links[i];
                if (link.getState() === DragLink.STATE_NON_INTERSECT) hasClearLink = true;
                else if (link.getState() === DragLink.STATE_INTERSECT) hasCrossLink = true;
            }

            if (hasClearLink)
            {
                if (hasCrossLink) color = "#FED138";
                else color = "#569D01";
            }
            else if (hasCrossLink) color = "#AE0001";
        }

        var g = this.shape.graphics;
        g.clear();
        g.beginFill(color);
        g.drawCircle(0, 0, radius);
        g.endFill();
    },

    getX: function()
    {
        return this.container.x;
    },

    getY: function()
    {
        return this.container.y;
    },

    setPos: function(x, y)
    {
        this.container.x = x;
        this.container.y = y;
    },

    moveOnTop: function()
    {
        this.parent.setChildIndex(this.container, this.parent.getNumChildren() - 1);
    },

    select: function()
    {
        this.moveOnTop();

        createjs.Tween.get(this.container, {override:true})
            .to({scaleX:1.2, scaleY:1.2}, 200)

        this.selection = new ItemSelection(this.container);
        this.addComponent(this.selection);
    },

    deselect: function()
    {
        //createjs.Tween.removeTweens(this.container)
        createjs.Tween.get(this.container, {override:true})
            .to({scaleX:1, scaleY:1}, 200)

        this.removeComponent(this.selection);
    },

    destroy: function()
    {
        this._super();

    }

});