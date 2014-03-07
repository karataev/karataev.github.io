/**
 * Created by postepenno on 03.02.14.
 */

var GameUI = ComponentBox.extend({

    init: function(parent, game)
    {
        this._super();

        this.parent = parent;
        this.game = game;

        this.createBack();

        //this.addComponent( new SoundIconComp(this.parent, 180, 10) );
        this.addComponent( new Button(this.parent, "homeButton", 20, 10, this.exitClick, this) );

        this.nextBtn = new Button(this.parent, "nextButton", 120, 10, this.nextClick, this);
        this.nextBtn.hide();
        this.addComponent(this.nextBtn);

        /*var x1 = this.nextBtn.bmp.x + 30;
        var x2 = this.nextBtn.bmp.x;
        createjs.Tween.get(this.nextBtn.bmp, {loop:true})
            .to({x:x1}, 1000, createjs.Ease.sineInOut)
            .to({x:x2}, 1000, createjs.Ease.sineInOut);
        */

        this.levelTf = new TextField(this.parent, "...", {x:350, y:30, font:"30px Hermes"});
        this.addComponent(this.levelTf);

        this.desc = new Description(this.game, this.parent);
        this.addComponent(this.desc);

        this.addComponent( new SoundIcon(this.parent, 550, 10));
    },

    createBack: function() {
        var g = new createjs.Graphics();
        g.beginFill("#EEE").drawRect(0, 0, Config.WIDTH, 100);
        this.back = new createjs.Shape(g);
        this.parent.addChild(this.back);

        var g2 = new createjs.Graphics();
        g2.beginFill("#EEE").drawRect(0, 810, Config.WIDTH, 150);
        this.back2 = new createjs.Shape(g2);
        this.parent.addChild(this.back2);
    },

    exitClick: function(bt, thisRef)
    {
        //Main.removeViewByClass(Instructions);
        //Main.removeViewByClass(LevelComplete);
        Main.removeViewByClass(Game);
        Main.addView( new MainMenu() );
    },

    nextClick: function(bt, thisRef) {
        //console.log("NEXT!");
        new LevelHideCommand(thisRef.game);

    },

    removeAButtons: function() {
        while (this.game.abuttons.length > 0) {
            var abutton = this.game.abuttons.pop();
            this.game.removeComponent(abutton);
        }
    },

    levelStart: function() {
        this.desc.setText(this.game.curLevel.description);
        this.desc.hide();

        var p1 = this.game.curLevel.id + 1;
        var p2 = this.game.getTotalLevels();
        this.levelTf.setText("Уровень " + p1 + "/" + p2);
    },

    update: function() {
        var time = Util.formatTime(this.game.gameTime);
        this.timeTf.setText( "Time " + time );
    },

    destroy: function() {
        this._super();
        this.parent.removeChild(this.back);
        this.parent.removeChild(this.back2);
    }
});