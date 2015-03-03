/**
 * Created by postepenno on 30.01.14.
 */

var Assets = Class.extend({

    queue: undefined,
    callback: undefined,
    scope: undefined,
    loaderBar: undefined,
    percentTf: undefined,

    init: function(callback, scope) {

        this.callback = callback;
        this.scope = scope;

        this.preloader = new Preloader();

        this.queue = new createjs.LoadQueue(false);
        createjs.Sound.alternateExtensions = ["mp3"];
        this.queue.installPlugin(createjs.Sound);

        var manifest = [

            // images
            {id:"background", src:"assets/images/background.png"},
            {id:"mainTitle", src:"assets/images/mainTitle.png"},
            {id:"playButton", src:"assets/images/playButton.png"},
            {id:"mona", src:"assets/images/mona.jpg"},
            {id:"homeButton", src:"assets/images/homeButton.png"},
            {id:"answerButton", src:"assets/images/answerButton.png"},
            {id:"correctButton", src:"assets/images/correctButton.png"},
            {id:"correctCheckButton", src:"assets/images/correctCheckButton.png"},
            {id:"nextButton", src:"assets/images/nextButton.png"},
            {id:"selectedButton", src:"assets/images/selectedButton.png"},
            {id:"sticker", src:"assets/images/sticker.png"},
            {id:"stickerStar", src:"assets/images/stickerStar.png"},
            {id:"soundIconOn", src:"assets/images/soundIconOn.png"},
            {id:"soundIconOff", src:"assets/images/soundIconOff.png"},
            {id:"fader", src:"assets/images/fader.png"},
            {id:"itemGalka", src:"assets/images/itemGalka.png"},
            {id:"itemKrest", src:"assets/images/itemKrest.png"},
            {id:"shadow", src:"assets/images/shadow.png"},
            {id:"creditsButton", src:"assets/images/creditsButton.png"},
            {id:"moreGamesButton", src:"assets/images/moreGamesButton.png"},
            {id:"creditsBack", src:"assets/images/creditsBack.png"},
            {id:"closeButton", src:"assets/images/closeButton.png"},
            {id:"postepennoLogo", src:"assets/images/postepennoLogo.png"},
            {id:"karataev", src:"assets/images/karataev.png"},

            // pics
            {id:"alenushka", src:"assets/pics/alenushka.jpg"},
            {id:"serezhka", src:"assets/pics/serezhka.jpg"},
            {id:"gornostai", src:"assets/pics/gornostai.jpg"},
            {id:"madonna", src:"assets/pics/madonna.jpg"},
            {id:"sunrise", src:"assets/pics/sunrise.jpg"},
            {id:"girlWithPeaches", src:"assets/pics/girlWithPeaches.jpg"},
            {id:"italianPolden", src:"assets/pics/italianPolden.jpg"},
            {id:"9val", src:"assets/pics/9val.jpg"},
            {id:"grachi", src:"assets/pics/grachi.jpg"},
            {id:"mart", src:"assets/pics/mart.jpg"},
            {id:"suprem", src:"assets/pics/suprem.jpg"},
            {id:"garden", src:"assets/pics/garden.jpg"},
            {id:"hunters", src:"assets/pics/hunters.jpg"},
            {id:"arnolfini", src:"assets/pics/arnolfini.jpg"},
            {id:"redtower", src:"assets/pics/redtower.jpg"},
            {id:"sunday", src:"assets/pics/sunday.jpg"},
            {id:"skelet", src:"assets/pics/skelet.jpg"},
            {id:"vangog", src:"assets/pics/vangog.jpg"},
            {id:"dog", src:"assets/pics/dog.jpg"},
            {id:"players", src:"assets/pics/players.jpg"},

            // sounds
            {id:"sndWrong", src:"assets/sounds/wrong.mp3"},
            {id:"sndRight", src:"assets/sounds/right.mp3"},
            {id:"sndClick", src:"assets/sounds/click.mp3"}

        ];

        this.queue.on("fileload", this.onFileLoad, this);
        this.queue.on("complete", this.onComplete, this);
        this.queue.loadManifest(manifest);

    },

    get: function(assetName)
    {
        return this.queue.getResult(assetName);
    },

    onComplete: function(event)
    {
        this.preloader.destroy();
        this.callback(this.scope);
    },

    onFileLoad: function(event) {
        this.preloader.update(this.queue.progress);
        //console.log(this.queue.progress);

        boomerangoApi.preloadProgressChanged({currentValue:this.queue.progress, maxValue:1});
    }

});