/**
 * Created by postepenno on 16.01.14.
 */


var Resizer = Class.extend({

    init: function()
    {
        Resizer.onResize = this.onResize;

        window.onresize = Resizer.onResize;
        this.onResize();
    },

    onResize: function() {
        var viewportWidth = window.innerWidth;
        var viewportHeight = window.innerHeight;

        var canvasWidth = Config.WIDTH;
        var canvasHeight = Config.HEIGHT;

        var scale = Math.min(viewportWidth / canvasWidth, viewportHeight / canvasHeight);
        var newWidth = canvasWidth * scale;
        var newHeight = canvasHeight * scale;
        gameDiv.style.width = newWidth + "px";
        gameDiv.style.height = newHeight + "px";
        gameDiv.style.left = (viewportWidth - newWidth) / 2 + "px";

        stage.scaleX = scale;
        stage.scaleY = scale;
        stage.canvas.width = newWidth;
        stage.canvas.height = newHeight;

        stage.update();
    }
});

