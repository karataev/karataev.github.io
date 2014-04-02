/**
 * Created by postepenno on 28.03.14.
 */


var Eyes = ComponentBox.extend({

    init: function(parent, x, y, shouldBlink)
    {
        this.parent = parent;
        this.x = x;
        this.y = y;
        this.shouldBlink = shouldBlink;

        this._super();

        this.anim = new createjs.Sprite(Eyes.getSpriteSheet(), "idle");
        this.anim.x = this.x;
        this.anim.y = this.y;
        this.parent.addChild(this.anim);

        if (this.shouldBlink) this.waitForBlink();
    },

    waitForBlink: function()
    {
        var delay = 3000 + Math.floor(Math.random() * 3000);
        createjs.Tween.get(this.anim)
            .wait(delay)
            .call(this.blink, [], this);
    },

    blink: function()
    {
        this.anim.gotoAndPlay("blink");
        this.waitForBlink();
    },

    destroy: function()
    {
        this._super();

        this.parent.removeChild(this.anim);
    }


});

Eyes.getSpriteSheet = function()
{
    if (Eyes.spriteSheet == undefined)
    {
        var data = {
            framerate:15,
            images: ["assets/images/eyesAnim.png"],
            frames: {width:60, height:60},
            animations: {
                blink: {
                    frames: [0, 1, 2 ,3],
                    next: "idle"
                },
                idle: {
                    frames: [0]
                }
            }
        };
        Eyes.spriteSheet = new createjs.SpriteSheet(data);
    }
    return Eyes.spriteSheet;
};
