/**
 * Created by postepenno on 07.03.14.
 */

var GameComplete = ComponentBox.extend({

    init: function(game) {

        this.game = game;

        this._super();

        this.addComponent( new Background() );

        this.parent = Main.viewContainer;

        this.titleTf = new TextField(this.parent, "Игра пройдена!", {x:Config.WIDTH / 2, y:100, font:"60px Hermes", align:"center"});
        this.addComponent(this.titleTf);

        var correct = this.game.getNumCorrectAnswers();
        var total = this.game.getTotalLevels();
        var txt = "Правильные ответы: " + correct + "/" + total;
        this.answersTf = new TextField(this.parent, txt, {x:Config.WIDTH / 2, y:200, font:"30px Hermes", align:"center"});
        this.addComponent(this.answersTf);

        this.addComponent( new Button(this.parent, "homeButton", 280, 300, this.exitClick, this) );


    },

    exitClick: function(bt, thisRef)
    {
        Main.removeViewByClass(GameComplete);
        Main.addView( new MainMenu() );
    }


});