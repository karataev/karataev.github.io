/**
 * Created by postepenno on 31.01.14.
 */

var LevelView = ComponentBox.extend({

    init: function(game) {

        this.game = game;

        this._super();

        this.addComponent( new Picture(Main.topContainer, "levelUIBack") );
        this.addComponent( new Button(Main.topContainer, "restartButton", this.restartClick, this, {x:480, y:50, center:true}) );
        this.addComponent( new Button(Main.topContainer, "pauseButton", this.pauseClick, this, {x:590, y:50, center:true}) );
        this.addComponent( new SoundIcon(Main.topContainer, 370, 50) );

        this.timer = new Timer(this.game, Main.topContainer);
        this.addComponent(this.timer);

        var levelNum = this.game.curLevel.id + 1;
        this.levelNumText = new TextField(Main.viewContainer, levelNum, {x:Config.WIDTH / 2, y:Config.HEIGHT / 2 + 35, align:"center", baseline:"middle", font:"500px Arial", color:"#ffffff"});
        this.addComponent(this.levelNumText);

        this.addComponent( new Tutorial(this.game, Main.viewContainer) );

    },

    update: function()
    {
        this.timer.update();
    },

    levelComplete: function()
    {
        //console.log(this.game.curLevel.lastTime, this.game.curLevel.bestTime);
        if (this.game.curLevel.lastTime == this.game.curLevel.bestTime) this.addComponent( new NewRecord(this.game, Main.topContainer) );
    },

    pauseClick: function(bt)
    {
        this.game.tickerPause();
        Main.addView( new PauseView(Main.viewContainer, this.game) );
    },

    restartClick: function(bt)
    {
        var id = this.game.curLevel.id;
        this.game.levelAbort();
        this.game.levelStartByID(id);
    },


    destroy: function()
    {
        this._super();
    }


});