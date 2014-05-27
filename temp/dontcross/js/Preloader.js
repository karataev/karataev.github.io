/**
 * Created by postepenno on 14.03.14.
 */

var Preloader = Class.extend({

    init: function()
    {
        var barHeight = 20;
        var barWidth = 200;
        var barX = (Config.WIDTH - barWidth) / 2;
        var barY = Config.HEIGHT / 2 - 20;
        var edgeHeight = barHeight + 10;
        var edgeWidth = barWidth + 10;
        var edgeX = (Config.WIDTH - edgeWidth) / 2;
        var edgeY = Config.HEIGHT / 2 - 25;

        this.container = new createjs.Container();
        stage.addChild(this.container);

        this.loaderEdge = new createjs.Shape();
        this.loaderEdge.graphics.setStrokeStyle(2).beginStroke("#000000").drawRect(edgeX, edgeY, edgeWidth, edgeHeight).endStroke();
        this.container.addChild(this.loaderEdge);

        this.loaderBar = new createjs.Shape();
        this.loaderBar.graphics.beginFill("#000000").drawRect(0, barY, barWidth, barHeight).endFill();
        //this.loaderBar.graphics.setStrokeStyle(2).beginStroke("#000000").drawRect(0, Config.HEIGHT / 2 - 20, 400, 40).endStroke();
        this.loaderBar.x = barX;
        this.loaderBar.scaleX = 0;
        this.container.addChild(this.loaderBar);

        this.percentTf = new createjs.Text("0%", "40px Arial", "#555555");
        this.percentTf.textAlign = "center";
        this.percentTf.x = Config.WIDTH / 2;
        this.percentTf.y = Config.HEIGHT / 2 - 80;
        this.container.addChild(this.percentTf);

        var txtY = this.percentTf.y;
        createjs.Tween.get(this.percentTf, {loop:true})
            .to({y:txtY - 10}, 1000, createjs.Ease.sineInOut)
            .to({y:txtY}, 1000, createjs.Ease.sineInOut);

    },

    update: function(progress)
    {
        var percent = Math.round(progress * 100);
        this.percentTf.text = percent + "%";
        this.loaderBar.scaleX = progress;
        stage.update();
    },

    destroy: function()
    {
        createjs.Tween.removeTweens(this.percentTf);

        this.container.removeChild(this.loaderEdge);
        this.container.removeChild(this.loaderBar);
        this.container.removeChild(this.percentTf);
        stage.removeChild(this.container);

        stage.update();
    }

});