/**
 * Created by postepenno on 18.06.2014.
 */

App.PreloaderState = function(game) {};

App.PreloaderState.prototype = {

    preload: function()
    {
        this.add.sprite(0, 0, 'cuteBack1.jpg');

        var art = [
            // images
            "fader",
            "blackBack",
            "cuteBack2.jpg"

            // credits
            //"creditsBox",

            // delete progress
            //"clearProgressBox",

            // pause
            //"pauseBox",

            // game complete
            //"gameCompleteBack"

        ];
        
        var snd = [
            "sndClick",
            "sndClick2",
            "sndLevelComplete",
            "sndGood",
            "music"
        ];


        var i;
        for (i = 0; i < art.length; i++)
        {
            var fileName = art[i].indexOf(".jpg") == -1 ? art[i] + ".png" : art[i];
            this.load.image(art[i], "assets/images/" + fileName);
        }

        for (i = 0; i < snd.length; i++)
        {
            var sndMp3 = snd[i] + ".mp3";
            var sndOgg = snd[i] + ".ogg";
            this.load.audio(snd[i], ["assets/sounds/" + sndMp3, "assets/sounds/" + sndOgg]);
        }

        this.load.atlasJSONHash('atlas', 'assets/images/atlas.png', 'assets/images/atlas.json');
        this.load.atlasJSONHash('paintings', 'assets/images/paintings.jpg', 'assets/images/paintings.json');
        this.load.atlasJSONHash('paintings2', 'assets/images/paintings2.jpg', 'assets/images/paintings2.json');

        this.load.bitmapFont('eras', 'assets/fonts/eras.png', 'assets/fonts/eras.fnt');
        this.load.text('textData', 'assets/txt/TextData.json');

        this.holder = this.game.add.group();

        this.preloadBar = this.add.sprite(126, 271, 'preloadBar', null, this.holder);
        this.add.sprite(120, 264, "preloadBarHolder", null, this.holder);

        this.progressTxt = this.game.add.text(Config.WIDTH / 2, 210, "0%", { font: "bold 50px Arial", fill: "#000000" }, this.holder);
        this.progressTxt.anchor.set(0.5, 0);

        this.load.setPreloadSprite(this.preloadBar);

        this.load.onFileComplete.add(this.fileLoaded, this);
	},

    fileLoaded: function(progress)
    {
        this.progressTxt.setText(progress + "%");
        boomerangoApi.preloadProgressChanged({currentValue:progress, maxValue:100});
    },

	create: function()
    {
        //boomerangoApi.preloadProgressChanged({currentValue:100, maxValue:100});

        if (Config.ANIMATION)
        {
            var tween = this.game.add.tween(this.holder).to({alpha:0, y:this.holder.y + 60}, 800, Phaser.Easing.Linear.None, true);
            tween.onComplete.addOnce(this.preloaderComplete, this);
        }
        else this.preloaderComplete();
	},

    preloaderComplete: function()
    {
        //game.add.plugin(Phaser.Plugin.Debug);

        fader = new App.Fader(this.game);
        cmd = new App.Commands();
        data = new App.Data();
        cookies = new App.Cookies();
        sounds = new App.Sounds();
        sounds.startMusic();
        //parser = new App.Parser();
        util = new App.Util();
        //cookies.clear();


        this.game.state.start('MainMenu');
    }
};