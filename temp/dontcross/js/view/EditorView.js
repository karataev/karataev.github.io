/**
 * Created by postepenno on 17.04.2014.
 */

var EditorView = ComponentBox.extend({

    init: function(editor)
    {
        this.game = editor;

        this._super();

        var self = this;

        this.addComponent( new Picture(Main.viewContainer, "levelUIBack") );

        this.addComponent( new Button(Main.viewContainer, "restartButton", this.restartClick, this, {x:50, y:50, center:true}) );
        this.addComponent( new Button(Main.viewContainer, "shuffleButton", this.shuffleClick, this, {x:150, y:50, center:true}) );
        this.addComponent( new Button(Main.viewContainer, "saveButton", this.saveClick, this, {x:250, y:50, center:true}) );

        this.isCtrl = false;

        //document.onkeydown = this.keyDownHandler;
        //document.onkeyup = this.keyUpHandler;

        //this.back = Main.backContainer;
        //this.back.addEventListener("mousedown", this);
    },

    saveClick: function()
    {
        this.game.saveLevel();
    },

    shuffleClick: function()
    {
        this.game.shuffleItems();
    },

    restartClick: function(bt)
    {
        this.game.levelAbort();
        this.game.levelStart();
    },

    keyUpHandler: function(event)
    {
        if (event.keyCode == 17) this.isCtrl = false;
        console.log(self);
    },

    keyDownHandler: function(event)
    {
        if (event.keyCode == 17) this.isCtrl = true;
        /*switch(event.keyCode)
        {

        }*/
    }

});