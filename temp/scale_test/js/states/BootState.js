/**
 * Created by postepenno on 18.06.2014.
 */

var App = {};
App.BootState = function(game) {};

App.BootState.prototype = {

    preload: function()
    {
        this.load.image('background', 'assets/images/background.png');
    },

    create: function() {
        //this.game.input.maxPointers = 1;
        //this.game.scale.maxIterations = 100;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.setScreenSize(true);

        this.game.scale.hasResized.add(this.hasResized, this);

        this.back = this.add.sprite(0, 0, 'background');
    },

    hasResized: function()
    {
        console.log("wooo", this.back);
    },

    render: function()
    {
        game.debug.text("isPortrait: " + game.scale.isPortrait, 20, 100 );
        game.debug.text("isLandscape: " + game.scale.isLandscape, 20, 120 );
        game.debug.text("orientation: " + game.scale.orientation, 20, 140 );
    }
};