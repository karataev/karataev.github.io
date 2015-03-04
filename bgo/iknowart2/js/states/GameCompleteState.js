/**
 * Created by postepenno on 27.08.2014.
 */

App.GameCompleteState = function(game) {};

App.GameCompleteState.prototype = {

    create: function()
    {
        this.add.sprite(0, 0, 'cuteBack2.jpg');

        this.completeTf = game.add.text(Config.WIDTH / 2, 60, data.text("gameComplete"), {font: "60px Arial", fill: "#CC0000"});
        this.completeTf.anchor.set(0.5, 0.5);

        this.awesomeTf = game.add.text(Config.WIDTH / 2, 150, data.text("awesome"), {font: "50px Arial", fill: "#000000"});
        this.awesomeTf.anchor.set(0.5, 0.5);

        this.dog = data.addAtlasSprite("youAreAwesome", {x:145, y:190});

        var totalMoves = data.getTotalMoves();
        this.movesTf = game.add.text(Config.WIDTH / 2, 490, data.text("totalMoves") + totalMoves, {font: "50px Arial", fill: "#000000"});
        this.movesTf.anchor.set(0.5, 0.5);

        this.iknowart1 = new App.MyButton("iknowart1Button", this.iknowart1Click, this, {x:100, y:575, center:true, wobble:true});
        this.playTf = game.add.text(170, 575, data.text("iknowart1"), {font: "50px Arial", fill: "#6D4028"});
        this.playTf.anchor.set(0, 0.5);

        this.twitter = new App.MyButton("twitterButton", this.twitterClick, this, {x:100, y:675, center:true, wobble:true});
        this.shareTf = game.add.text(170, 675, data.text("share"), {font: "50px Arial", fill: "#004462"});
        this.shareTf.anchor.set(0, 0.5);

        this.home = new App.MyButton("homeButton", this.homeClick, this, {x:320, y:765, center:true, wobble:true});

        this.showWithTweens();

        if (App.Fader.SHOULD_FADE_OUT) fader.fadeOut();
    },

    showWithTweens: function()
    {
        util.tweenWithAlpha(this.completeTf, 500);
        util.tweenWithAlpha(this.awesomeTf, 1000);
        util.tweenWithAlpha(this.dog, 2000);
        util.tweenWithAlpha(this.movesTf, 2500);
        util.tweenWithAlpha(this.iknowart1.bt, 3000);
        util.tweenWithAlpha(this.playTf, 3500);
        util.tweenWithAlpha(this.twitter.bt, 4000);
        util.tweenWithAlpha(this.shareTf, 4500);
        util.tweenWithAlpha(this.home.bt, 5000);
    },

    iknowart1Click: function()
    {
        window.open("http://postepenno.com/html5/iknowart", "_blank");
    },

    twitterClick: function()
    {
        //console.log("Tweet!");
        var totalMoves = data.getTotalMoves();
        var url = "http://twitter.com/share?text=I completed I Know Art 2 game with " + totalMoves + " moves. I'm awesome!&url=http://postepenno.com/html5/iknowart2";
        window.open(url, "_blank");
    },

    homeClick: function()
    {
        fader.fade(this.gotoMainMenu, this);
    },

    gotoMainMenu: function()
    {
        game.state.start("MainMenu");
    }


};