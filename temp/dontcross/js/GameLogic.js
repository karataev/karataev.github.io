/**
 * Created by postepenno on 17.04.2014.
 */

var GameLogic = ComponentBox.extend({

    init: function(game)
    {
        this.game = game;

        this._super();

        var levelData = this.game.curLevel.data;

        this.linksContainer = new createjs.Container();
        Main.viewContainer.addChild(this.linksContainer);
        this.itemsContainer = new createjs.Container();
        Main.viewContainer.addChild(this.itemsContainer);

        this.parseLevel(levelData);
        //this.addComponent( new Tutorial(this.game, Main.viewContainer) );

        this.checkAllIntersections();

        this.offset = {x:0, y:0};
        this.back = Main.backContainer;

        this.activeItem = undefined;

        this.connectItemsWithLinks();
        this.renderLinks();
        this.renderItems();

        this.levelAppear = new LevelAppear(this, this.appearComplete, this);
        this.addComponent(this.levelAppear);

        this.back.addEventListener("mousedown", this);
    },

    appearComplete: function()
    {
        this.removeComponent(this.levelAppear);
    },

    connectItemsWithLinks: function()
    {
        var links = this.getLinks();
        var items = this.getItems();
        for (var i = 0; i < items.length; i++)
        {
            var item = items[i];
            item.saveLinks(links);
        }
    },

    handleEvent: function(event)
    {
        switch (event.type) {
            case "mousedown":
                this.doMouseDown();
                break;
            case "pressup":
                this.doMouseUp();
                break;
            case "pressmove":
                this.doMouseMove();
                break;
        }
    },

    doMouseDown: function()
    {
        if (this.hasComponent(this.levelAppear))
        {
            this.levelAppear.stopAndComplete();
        }

        var mx = stage.mouseX / stage.scaleX;
        var my = stage.mouseY / stage.scaleY;
        var item = this.getUnfixedItemUnderPoint(mx, my);
        if (item)
        {
            this.offset.x = mx - item.getX();
            this.offset.y = my - item.getY();
            this.back.addEventListener("pressup", this);
            this.back.addEventListener("pressmove", this);
            this.activeItem = item;

            this.activeItem.select();
            //this.renderLinks();
        }
    },

    doMouseMove: function()
    {
        var mx = stage.mouseX / stage.scaleX - this.offset.x;
        var my = stage.mouseY / stage.scaleY - this.offset.y;
        var pos = this.fitInBounds(mx, my);

        this.activeItem.setPos(pos.x, pos.y);

        this.checkAllIntersections();
        this.renderLinks();
        this.renderItems();
    },

    doMouseUp: function()
    {
        this.back.removeEventListener("pressup", this);
        this.back.removeEventListener("pressmove", this);

        this.activeItem.deselect();
        this.activeItem = undefined;

        this.checkAllIntersections(true);
    },

    fitInBounds: function(newx, newy)
    {
        var r = Config.ITEM_GFX_RADIUS;
        var bx = Config.DRAG_BOUNDS.x;
        var by = Config.DRAG_BOUNDS.y;
        var bw = Config.DRAG_BOUNDS.width;
        var bh = Config.DRAG_BOUNDS.height;

        if (newx < bx + r) newx = bx + r;
        if (newx > bx + bw - r)  newx = bx + bw - r;
        if (newy < by + r) newy = by + r;
        if (newy > by + bh - r) newy = by + bh - r;

        return {x:newx, y:newy};
    },

    getUnfixedItemUnderPoint: function(x, y)
    {
        var radius = Config.ITEM_TOUCH_RADIUS;
        var minRadius = radius;
        var closest = undefined;
        for (var i = 0; i < this.components.length; i++)
        {
            var obj = this.components[i];
            if (obj instanceof DragItem && !obj.fixed)
            {
                var dx = x - obj.getX();
                var dy = y - obj.getY();
                var dist = Math.sqrt(dx * dx + dy * dy);
                if (dist <= minRadius)
                {
                    minRadius = dist;
                    closest = obj;
                }
            }
        }

        return closest;
    },


    parseLevel: function(levelData)
    {
        var i;
        var items = levelData.items;
        var links = levelData.links;

        if (levelData.items)
        {
            for (i = 0; i < items.length; i++)
            {
                var itemDef = items[i];
                var itemId = itemDef.id;
                var itemX = items[i].x;
                var itemY = items[i].y;
                var itemFixed = false;
                if (items[i].fixed != undefined) itemFixed = items[i].fixed;
                var p = new DragItem(this.game, this.itemsContainer, this, itemId, {x:itemX, y:itemY, fixed:itemFixed});
                this.addComponent(p);
            }
        }

        if (levelData.links)
        {
            for (i = 0; i < links.length; i++)
            {
                var p1 = this.getItemById(links[i].p1);
                var p2 = this.getItemById(links[i].p2);
                var link = new DragLink(this.game, this.linksContainer, p1, p2);
                this.addComponent(link);
            }
        }
    },

    getItemById: function(id)
    {
        for (var i = 0; i < this.components.length; i++)
        {
            var obj = this.components[i];
            if (obj instanceof DragItem)
            {
                if (obj.id === id) return obj;
            }
        }
        return undefined;
    },

    renderLinks: function()
    {
        for (var i = this.components.length - 1; i >= 0; i--)
        {
            var obj = this.components[i];
            if (obj instanceof DragLink) obj.render();
        }
    },

    renderItems: function()
    {
        for (var i = this.components.length - 1; i >= 0; i--)
        {
            var obj = this.components[i];
            if (obj instanceof DragItem) obj.render();
        }
    },

    setLinksState: function(newState)
    {
        for (var i = this.components.length - 1; i >= 0; i--)
        {
            var obj = this.components[i];
            if (obj instanceof DragLink) obj.setState(newState);
        }
    },

    checkAllIntersections: function(checkIfLevelComplete)
    {
        this.setLinksState(DragLink.STATE_NON_INTERSECT);

        var intersectionsFound = false;
        var links = this.getLinks();
        for (var i = 0; i < links.length; i++)
        {
            var l1 = links[i];
            for (var j = i + 1; j < links.length; j++)
            {
                var l2 = links[j];
                if (this.linkVsLink(l1, l2))
                {
                    intersectionsFound = true;
                    l1.setState(DragLink.STATE_INTERSECT);
                    l2.setState(DragLink.STATE_INTERSECT);
                }
            }
        }

        if (checkIfLevelComplete === true)
        {
            if (!intersectionsFound)
            {
                //this.deselectItem();
                this.game.levelComplete();
            }
        }
    },

    removeTouchListener: function()
    {
        this.back.removeEventListener("mousedown", this);
    },

    linkVsLink: function(l1, l2)
    {
        var id1 = l1.p1.id;
        var id2 = l1.p2.id;
        var id3 = l2.p1.id;
        var id4 = l2.p2.id;

        if (id1 == id3 || id1 == id4 || id2 == id3 || id2 == id4) return false;

        var x1 = l1.p1.getX();
        var x2 = l1.p2.getX();
        var x3 = l2.p1.getX();
        var x4 = l2.p2.getX();
        var y1 = l1.p1.getY();
        var y2 = l1.p2.getY();
        var y3 = l2.p1.getY();
        var y4 = l2.p2.getY();

        if (Math.max(x1, x2) < Math.min(x3, x4) || Math.max(x3, x4) < Math.min(x1, x2)) return false;
        if (Math.max(y1, y2) < Math.min(y3, y4) || Math.max(y3, y4) < Math.min(y1, y2)) return false;

        var ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3));
        var ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3));
        var denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
        if (Math.abs(denom) < 0.001)
        {
            // Lines are too close to parallel
            return false;
        }
        ua /= denom;
        ub /= denom;

        if ((0 < ua) && (ua < 1) && (0 < ub) && (ub < 1))
        {
            //var int = new Vec2(x1 + ua * (x2 - x1), y1 + ua * (y2 - y1));
            //return int;
            return true;
        }
        return false;
    },

    getLinks: function()
    {
        var links = [];
        for (var i = this.components.length - 1; i >= 0; i--)
        {
            var obj = this.components[i];
            if (obj instanceof DragLink) links.push(obj);
        }
        return links;
    },

    getItems: function()
    {
        var items = [];
        for (var i = this.components.length - 1; i >= 0; i--)
        {
            var obj = this.components[i];
            if (obj instanceof DragItem) items.push(obj);
        }
        return items;
    },

    destroy: function()
    {
        this._super();

        Main.viewContainer.removeChild(this.itemsContainer);
        Main.viewContainer.removeChild(this.linksContainer);

        this.removeTouchListener();
    }



});