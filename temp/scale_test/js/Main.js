/**
 * Created by postepenno on 18.06.2014.
 */

// entry point
var game;

function startup()
{
    game = new Phaser.Game(320, 480, Phaser.CANVAS, "gameArea");
    game.state.add('Boot', App.BootState);

    game.state.start('Boot');

}