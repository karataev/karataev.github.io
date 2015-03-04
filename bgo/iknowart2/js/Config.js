/**
 * Created by postepenno on 18.06.2014.
 */

function Config() {}

Config.VERSION = "0.92";

Config.WIDTH = 640;
Config.HEIGHT = 832;
Config.LANGUAGE = "en"; // ru

Config.ANIMATION = true;
Config.SOUNDS_ENABLED = false;
Config.TRANSPARENT = false;
Config.START_LEVEL = 0;
Config.TEST_GAME_COMPLETE = false;
Config.SHOW_FPS = true;
Config.OPEN_ALL_LEVELS = true;
Config.ENABLE_CHEAT = false;
Config.DEBUG_GRID = false;

Config.RELEASE = true;

if (Config.RELEASE)
{
    Config.ANIMATION = true;
    Config.SOUNDS_ENABLED = true;
    Config.TRANSPARENT = false;
    Config.START_LEVEL = 0;
    Config.TEST_GAME_COMPLETE = false;
    Config.SHOW_FPS = false;
    Config.OPEN_ALL_LEVELS = false;
    Config.ENABLE_CHEAT = false;
}

