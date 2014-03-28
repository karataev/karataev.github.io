/**
 * Created by postepenno on 17.03.14.
 */

var Circle = ComponentBox.extend({



    init: function(game, view, parent, params)
    {
        this.game = game;
        this.view = view;
        this.parent = parent;

        this.x = 0;
        this.y = 0;

        this.shots = 0;
        this.angle = 0;
        this.armor = 0;
        this.gap = 90;
        this.wobble = false;

        if (params)
        {
            if (params.x != undefined) this.x = params.x;
            if (params.y != undefined) this.y = params.y;
            if (params.shots != undefined) this.shots = params.shots;
            if (params.angle != undefined) this.angle = params.angle;
            if (params.gap != undefined) this.gap = params.gap;
            if (params.armor != undefined) this.armor = params.armor;
            if (params.wobble != undefined) this.wobble = params.wobble;
        }

        this._super();

        if (this.armor == 0) this.assetName = "circle";
        else if (this.armor == 1) this.assetName = "circle2";
        else if (this.armor == 2) this.assetName = "circle3";
        else if (this.armor == 3) this.assetName = "circle4";

        this.holder = new createjs.Container();
        this.holder.x = this.x;
        this.holder.y = this.y;
        this.parent.addChild(this.holder);

        this.parse();

        this.pic = new Picture(this.holder, this.assetName, {x:0, y:0, center:true});
        this.addComponent(this.pic);

        this.pic.bitmap.addEventListener("click", this);

        if (this.wobble) this.doWobble();
    },

    doWobble: function()
    {
        var time = 110;
        var b = createjs.Tween.get(this.holder);
        var sx = 1;
        var sy = 1;
        for (var i = 0; i < 10; i++)
        {
            if (i % 2 == 0) {
                sx = 1.1 - i * 0.01;
                sy = 0.9 + i * 0.01;
            } else {
                sx = 0.9 + i * 0.01;
                sy = 1.1 - i * 0.01;
            }
            b = b.to({scaleX:sx, scaleY:sy}, time);
        }
    },

    parse: function()
    {
        var px = this.x;
        var py = this.y;
        var r = Config.CIRCLE_RADIUS;

        for (var i = 0; i < this.shots; i++)
        {
            var angle = (i * this.gap + this.angle) * Math.PI / 180;
            var dx = Math.cos(angle) * r;
            var dy = Math.sin(angle) * r;
            this.addPicBullet(dx, dy);
        }

    },

    addPicBullet: function(x, y)
    {
        var bullet = new Picture(this.holder, "bullet", {x:x, y:y, center:true});
        this.addComponent(bullet);
    },

    handleEvent: function(event)
    {
        switch (event.type) {
            case "click":
                this.game.circleClicked(this);
                //this.explode();
                break;
        }
    },

    explode: function()
    {

        this.view.removeComponent(this);
        this.view.addComponent( new CircleExplode(this.view, this.parent, this.assetName, this.x, this.y) );

        if (this.armor > 0)
        {
            var newArmor = this.armor - 1;
            this.view.addCircle(this.x, this.y, this.shots, this.angle, this.gap, newArmor, true);
        }
        else
        {
            for (var i = 0; i < this.shots; i++)
            {
                this.view.addBullet(this.x, this.y, i * this.gap + this.angle);
            }
        }

    },

    destroy: function()
    {
        this.pic.bitmap.removeEventListener("click", this);
        this._super();

        this.parent.removeChild(this.holder);
    }


});