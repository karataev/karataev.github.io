/**
 * Created by postepenno on 18.06.2014.
 */

App.BootState = function(game) {};

App.BootState.prototype = {

    preload: function()
    {
        this.load.image('preloadBar', 'assets/images/preloadBar.png');
        this.load.image('preloadBarHolder', 'assets/images/preloadBarHolder.png');
        this.load.image('background', 'assets/images/background.jpg');
        this.load.image('cuteBack1.jpg', 'assets/images/cuteBack1.jpg');

        game.stage.backgroundColor = '#EBE7DA';
    },

    create: function() {
        this.game.input.maxPointers = 1;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.enterPortrait.add(this.rescale, this);
        this.game.scale.enterLandscape.add(this.rescale, this);
        this.game.scale.setScreenSize(true);


        if (Config.TRANSPARENT) this.game.world.alpha = 0.5;

        var userLang = (navigator.language) ? navigator.language : navigator.userLanguage;
        //alert ("The language is: " + userLang);
        if (userLang == "ru") Config.LANGUAGE = "ru";
        else Config.LANGUAGE = "en";

        this.game.state.start('Preloader');
    },

    rescale: function() {
        var _game = this.game;
        setTimeout(function() {
            _game.scale.refresh();
        }, 500);
    }

};