/**
 * Created by postepenno on 29.04.2014.
 */

var LevelAppear = ComponentBox.extend({

    init: function(logic, callback, scope)
    {
        this.logic = logic;
        this.callback = callback;
        this.scope = scope;

        this._super();

        if (Config.LEVEL_START_ANIMATION) this.start();
        else this.callback.call(this.scope, this);
    },

    start: function()
    {
        this.items = this.logic.getItems();
        this.links = this.logic.getLinks();

        this.totalTime = 1000 + this.items.length * 20;

        var i;
        var itemDelay = (this.totalTime - LevelAppear.ITEM_TIME) / this.items.length;
        var linkDelay = (this.totalTime - LevelAppear.LINK_TIME) / this.links.length;
        for (i = 0; i < this.items.length; i++)
        {
            this.startItem(i * itemDelay, this.items[i].container)
        }
        for (i = 0; i < this.links.length; i++)
        {
            this.startLink(i * linkDelay, this.links[i])
        }

        this.logic.linksContainer.visible = false;

        this.timeObj = {a:10};
        createjs.Tween.get(this.timeObj)
            .to({a:20}, this.totalTime)
            .call(this.complete, [], this)

    },

    startItem: function(delay, sprite)
    {
        sprite.scaleX = sprite.scaleY = 0;

        createjs.Tween.get(sprite)
            .wait(delay)
            .to({scaleX:1, scaleY:1}, LevelAppear.ITEM_TIME, createjs.Ease.backOut);
    },

    startLink: function(delay, link)
    {
        var linkAnim = new LinkAnim(delay, this.logic.itemsContainer, link);
        this.addComponent(linkAnim);
    },

    complete: function()
    {
        this.logic.linksContainer.visible = true;
        this.callback.call(this.scope, this)
    },

    stopAndComplete: function()
    {
        createjs.Tween.removeAllTweens();
        for (i = 0; i < this.items.length; i++)
        {
            this.items[i].container.scaleX = this.items[i].container.scaleY = 1;
        }
        this.complete();

    }

});

//LevelAppear.ANIM_TIME = 1000;
LevelAppear.ITEM_TIME = 800;
LevelAppear.LINK_TIME = 800;