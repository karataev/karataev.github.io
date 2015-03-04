/**
 * Created by postepenno on 18.06.2014.
 */

// entry point
var game;
var cmd;
var data;
var cookies;
var fader;
var sounds;
var util;

function startup()
{
    boomerangoApi.initialize({});

    game = new Phaser.Game(Config.WIDTH, Config.HEIGHT, Phaser.CANVAS, "gameArea");

    game.state.add('Boot', App.BootState);
    game.state.add('Preloader', App.PreloaderState);
    game.state.add('MainMenu', App.MainMenuState);
    game.state.add('LevelSelect', App.LevelSelectState);
    game.state.add('Gameplay', App.GameplayState);
    game.state.add('GameComplete', App.GameCompleteState);

    game.state.start('Boot');

}