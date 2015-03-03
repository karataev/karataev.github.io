/**
 * Created by postepenno on 07.03.14.
 */

var GameComplete = ComponentBox.extend({

    init: function(game) {

        this.game = game;

        this._super();

        this.addComponent( new Background() );

        this.parent = Main.viewContainer;

        var titleText = Config.LANG == "RU" ? "Игра пройдена!" : "Game Complete!"
        this.titleTf = new TextField(this.parent, titleText, {x:Config.WIDTH / 2, y:60, font:"60px Arial", align:"center"});
        this.addComponent(this.titleTf);

        var correct = this.game.getNumCorrectAnswers();
        var total = this.game.getTotalLevels();
        var pre = Config.LANG == "RU" ? "Правильные ответы: " : "Correct answers: ";
        var txt = pre + correct + "/" + total;
        this.answersTf = new TextField(this.parent, txt, {x:Config.WIDTH / 2, y:670, font:"30px Arial", align:"center"});
        this.addComponent(this.answersTf);

        this.resultGallery = new ResultGallery(this.parent, this.game, 80, 180);
        this.addComponent(this.resultGallery);

        this.addComponent( new Button(this.parent, "homeButton", 280, 820, this.exitClick, this) );


    },

    exitClick: function(bt, thisRef)
    {
        Fader.fade(thisRef.gameOver, thisRef);
    },

    gameOver: function()
    {
        Main.removeViewByClass(GameComplete);
        Main.addView( new MainMenu() );
    }


});