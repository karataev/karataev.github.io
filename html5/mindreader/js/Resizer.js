/**
 * Created by postepenno on 16.01.14.
 */

function onResize() {
    var viewportWidth = window.innerWidth;
    var viewportHeight = window.innerHeight;

    var canvasWidth = 320;
    var canvasHeight = 480;

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

    //var mx = stage.mouseX;
    //var my = stage.mouseY;
    //hintTxt.text = "Div, canvas, stage scale: " + scale + "\n";

    stage.update();
}
