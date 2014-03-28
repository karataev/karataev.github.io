/**
 * Created by postepenno on 10.02.14.
 */


var TextField = Component.extend({


    init: function(parent, txt, params)
    {
        this.parent = parent;

        this.x = 0;
        this.y = 0;
        this.color = TextField.defaultColor;
        this.font = TextField.defaultFont;
        this.align = TextField.defaultAlign;
        this.baseline = TextField.defaultBaseline;
        this.shadow = false;

        if (params)
        {
            if (params.color) this.color = params.color;
            if (params.x) this.x = params.x;
            if (params.y) this.y = params.y;
            if (params.font) this.font = params.font;
            if (params.align) this.align = params.align;
            if (params.baseline) this.baseline = params.baseline;
            if (params.shadow != undefined) this.shadow = params.shadow;
        }

        this.tf = new createjs.Text(txt, this.font, this.color);
        this.tf.x = this.x;
        this.tf.y = this.y;
        this.tf.textAlign = this.align;
        this.tf.textBaseline = this.baseline;

        if (this.shadow) this.tf.shadow = new createjs.Shadow("#000000", 3, 3, 2);
        //this.tf.outline = 1;
        //this.tf.outlineColor = "#FF0000"

        this.parent.addChild(this.tf);
    },

    setText: function(txt)
    {
        this.tf.text = txt;
    },

    destroy: function()
    {
        this.parent.removeChild(this.tf);
    }

});

TextField.defaultColor = "#000000";
TextField.defaultFont = "bold 30px Arial";
TextField.defaultAlign = "left";
TextField.defaultBaseline = "top";