/**
 * Created by postepenno on 01.07.2014.
 */

App.MainMenuState = function(game) {};

App.MainMenuState.prototype = {

    create: function()
    {
        this.add.sprite(0, 0, 'cuteBack1.jpg');

        this.galleryHolder = game.add.group();
        this.title = new App.GameTitle(20, 45);

        this.playBt = new App.MyButton("playButton", this.playClick, this, {x:520, y:735, center:true, wobble:true});
        this.moreGamesBt = new App.MyButton("moreGamesButton", this.moreGamesClick, this, {x:200, y:735, center:true, wobble:true});
        this.soundIcon = new App.SoundIcon({x:80, y:735});
        this.language = new App.LanguageButton({x:340, y:735});

        var verTxt = "v " + Config.VERSION;
        var versionTf = this.add.text(5, Config.HEIGHT - 5, verTxt, {font: "12px Arial", fill: "#000000"});
        versionTf.anchor.set(0, 1);

        //if (!Config.RELEASE) this.add.text(20, 30, "DEVELOPMENT VERSION", {font: "30px Arial", fill: "#FF0000"});

        if (Config.ANIMATION) this.showWithTweens();
        game.time.events.add(1500, this.startGallery, this);


        if (App.Fader.SHOULD_FADE_OUT) fader.fadeOut();
    },

    showWithTweens: function()
    {
        util.tweenWithAlpha(this.title.group, 0);

        this.tweenScaleButton(this.soundIcon.group, 500);
        this.tweenScaleButton(this.moreGamesBt.bt, 700);
        this.tweenScaleButton(this.language.group, 900);
        this.tweenScaleButton(this.playBt.bt, 1100);
    },

    startGallery: function()
    {
        this.gallery = new App.Gallery(this.galleryHolder);
    },

    tweenScaleButton: function(target, delay)
    {
        target.scale.x = target.scale.y = 0;
        this.add.tween(target.scale).to({x:1, y:1}, 500, Phaser.Easing.Back.Out, true, delay)
    },

    tweenAlphaButton: function(target, delay)
    {
        target.alpha = 0;
        this.add.tween(target).to({alpha:1}, 500, Phaser.Easing.Linear.None, true, delay);
    },

    playClick: function()
    {
        //this.showAds();

        fader.fade(this.startGame, this);
    },

    showAds: function()
    {
        var blanket = document.createElement('div');
        blanket.className = "blanket";
        //overlay.innerHTML = htmlStyleContainer.getImageOverlay('https://reports.fgl.com/sandbox/ads/html5/example_advert.png', 400, 350, 'fgl_overlay_ad');

/*
        var overlayBack = document.createElement("div");
        overlayBack.className = "overlayBack";
        overlay.appendChild(overlayBack);

        var image = document.createElement("img");
        image.src = "assets/images/cuteback1.jpg";
        overlay.appendChild(image);
*/

        blanket.onclick = function()
        {
            console.log("CLICK BABY!", this);
            this.parentNode.removeChild(this);
        };

        document.body.appendChild(blanket);
    },

    startGame: function()
    {
        cmd.gameStart();
    },

    moreGamesClick: function()
    {
        //cookies.clear();
        //var credits = new App.CreditsView();
        boomerangoApi.showMoreGames();
    },

    update: function()
    {
        this.title.update();
    }

};