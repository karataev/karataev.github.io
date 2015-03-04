/**
 * Created by postepenno on 23.06.2014.
 */

App.Data = Class.extend({

    init: function()
    {
        this.texts = JSON.parse(game.cache.getText('textData'));
        this.curLevel = null;
        this.levelStartTime = 0;

        this.levelStartTime = 0;
        this.pauseTime = 0;
        this.pausedByUser = false;
        this.initPaintings();
        this.initLevels();

        this.atlasName = "atlas";
    },

    text: function(key)
    {
        return data.texts[Config.LANGUAGE][key];
    },

    getAtlasKey: function(key)
    {
        return this.atlasName + "/" + key + "_0000";
    },

    addAtlasSprite: function(asset, params)
    {
        var x = util.getParam(params, "x", 0);
        var y = util.getParam(params, "y", 0);
        var center = util.getParam(params, "center", false);
        var parent = util.getParam(params, "parent", game.world);

        var sprite = game.add.sprite(x, y, this.atlasName, this.getAtlasKey(asset), parent);
        if (center) sprite.anchor.set(0.5, 0.5);

        return sprite;
    },

    createPaintingSprite: function(key)
    {
        var painting = this.getPaintingByName(key);

        return new Phaser.Sprite(game, 0, 0, painting.atlasName, painting.atlasName + "/" + key + "_0000");
    },

    addPainting: function(name, desc)
    {
        this.paintings.push({name:name, desc:desc, atlasName:"paintings"});
    },

    addPainting2: function(name, desc)
    {
        this.paintings.push({name:name, desc:desc, atlasName:"paintings2"});
    },

    getPaintingDesc: function()
    {
        var painting = this.getPaintingByName(this.curLevel.data.painting);

        return painting.desc[Config.LANGUAGE];
    },

    getPaintingByName: function(name)
    {
        var i, p;
        for (i = 0; i < this.paintings.length; i++)
        {
            p = this.paintings[i];
            if (p.name == name) return p;
        }

        return null;
    },

    initPaintings: function()
    {
        this.paintings = [];

        this.STARRY_NIGHT = "picStarryNight";
        this.MONA_LISA = "picMonaLisa";
        this.EARRING = "picEarring";
        this.BURNING = "picBurning";
        this.HARVEST = "picHarvest";
        this.TREES = "picMastTreeGrove";
        this.CAGE = "picCage";
        this.LIFE_LINE = "picLifeLine";
        this.OLD_MUSICIAN = "picOldMusician";

        this.LILIES = "picLilies";
        this.WAVE = "picWave";
        this.WOMAN = "picWoman";
        this.TOWER = "picTower";
        this.CAFE = "picCafe";
        this.SUNFLOWERS = "picSunflowers";
        this.RIVER = "picRiver";

        this.addPainting(this.MONA_LISA, {
                en:"Leonardo da Vinci\nMona Lisa (1503-1519)",
                ru:"Леонардо да Винчи\nМона Лиза (1503-1519)"
            });
        this.addPainting(this.EARRING, {
            en:"Johannes Vermeer\nGirl with a Pearl Earring (1665)",
            ru:"Ян Вермеер\nДевушка с жемчужной сережкой (1665)"
        });
        this.addPainting(this.OLD_MUSICIAN, {
            en:"Edouard Manet\nThe Old Musician (1862)",
            ru:"Эдуард Мане\nСтарый музыкант (1862)"
        });
        this.addPainting(this.BURNING, {
            en:"Eero Jarnefelt\nBurning the Brushwood (1893)",
            ru:"Ээро Ярнефельт\nСжигание хвороста (1893)"
        });
        this.addPainting(this.HARVEST, {
            en:"Vincent Van Gogh\nHarvest in Provence (1888)",
            ru:"Винсент Ван Гог\nСбор урожая (1888)"
        });
        this.addPainting(this.TREES, {
            en:"Ivan Shishkin\nMast-Tree grove (1887)",
            ru:"Иван Шишкин\nКорабельная роща (1887)"
        });
        this.addPainting(this.CAGE, {
            en:"Berthe Morisot\nThe Cage (1885)",
            ru:"Берта Моризо\nКлетка (1885)"
        });
        this.addPainting(this.LIFE_LINE, {
            en:"Winslow Homer\nThe Life Line (1884)",
            ru:"Уинслоу Хомер\nЛиния жизни (1884)"
        });
        this.addPainting(this.STARRY_NIGHT, {
            en:"Vincent van Gogh\nThe Starry Night (1889)",
            ru:"Винсент Ван Гог\nЗвездная ночь (1889)"
        });
        this.addPainting2(this.LILIES, {
            en:"Claude Monet\nWater Lilies (1906)",
            ru:"Клод Моне\nВодяные лилии (1906)"
        });
        this.addPainting2(this.WAVE, {
            en:"Kasushika Hokusai\nGreat Wave Off Kanagawa (1830)",
            ru:"Кацусика Хокусай\nБольшая волна в Канагаве (1830)"
        });
        this.addPainting2(this.WOMAN, {
            en:"Johannes Vermeer\nYoung Woman with a Water Pitcher (1665)",
            ru:"Ян Вермеер\nМолодая женщина с кувшином воды (1665)"
        });
        this.addPainting2(this.TOWER, {
            en:"Pieter Brueghel the Elder\nTower of Babel (1563)",
            ru:"Питер Брейгель Старший\nВавилонская башня (1563)"
        });
        this.addPainting2(this.CAFE, {
            en:"Vincent Van Gogh\nCafe Terrace at Night (1888)",
            ru:"Винсент Ван Гог\nНочная терраса кафе (1888)"
        });
        this.addPainting2(this.SUNFLOWERS, {
            en:"Vincent van Gogh\nVase with Twelve Sunflowers (1888)",
            ru:"Винсент Ван Гог\nПодсолнухи (1888)"
        });
        this.addPainting2(this.RIVER, {
            en:"Emilio Sanchez-Perrier\nBoating on the River (1890)",
            ru:"Эмилио Санчез Перье\nКатаение на лодке по реке (1890)"
        });
    },

    initLevels: function()
    {
        this.levels = [];
        //this.createDummyLevels();
        this.addLevel({painting:this.MONA_LISA, type:"rotateTiles", divide:2});
        this.addLevel({painting:this.EARRING, type:"swapTiles", divide:2});
        this.addLevel({painting:this.HARVEST, type:"rotateCircle", circles:[{x:320, y:320, radius:180, startAngle:180}]});
        this.addLevel({painting:this.TREES, type:"dragTiles", tiles:[{from:{row:2, col:0}, to:{row:2, col:4}}, {from:{row:4, col:2}, to:{row:1, col:2}}]});

        this.addLevel({painting:this.CAGE, type:"rotateTiles", divide:3});
        this.addLevel({painting:this.STARRY_NIGHT, type:"swapTiles", divide:3});
        this.addLevel({painting:this.LILIES, type:"rotateCircle", circles:[{x:160, y:160, radius:125, startAngle:120}, {x:480, y:160, radius:125, startAngle:70}, {x:160, y:470, radius:125, startAngle:180}, {x:480, y:470, radius:125, startAngle:220}]});
        this.addLevel({painting:this.CAFE, type:"dragTiles", tiles:[{from:{row:1, col:0}, to:{row:0, col:0}}, {from:{row:0, col:1}, to:{row:4, col:1}}, {from:{row:4, col:2}, to:{row:2, col:2}}, {from:{row:2, col:3}, to:{row:3, col:3}}, {from:{row:3, col:4}, to:{row:1, col:4}}]});

        this.addLevel({painting:this.LIFE_LINE, type:"rotateTiles", divide:3, matrix:[[0, 1]]});
        this.addLevel({painting:this.WOMAN, type:"swapTiles", divide:4});
        this.addLevel({painting:this.SUNFLOWERS, type:"rotateCircle", circles:[{x:320, y:320, radius:275, startAngle:120}, {x:320, y:320, radius:200, startAngle:45}, {x:320, y:320, radius:130, startAngle:-100}]});
        this.addLevel({painting:this.BURNING, type:"dragTiles", tiles:[{from:{row:1, col:0}, to:{row:1, col:2}}, {from:{row:3, col:0}, to:{row:3, col:3}}, {from:{row:2, col:1}, to:{row:2, col:2}}, {from:{row:1, col:2}, to:{row:4, col:2}}, {from:{row:2, col:3}, to:{row:2, col:0}}, {from:{row:1, col:4}, to:{row:3, col:4}}, {from:{row:3, col:4}, to:{row:1, col:4}}]});

        this.addLevel({painting:this.RIVER, type:"rotateTiles", divide:3, matrix:[[0, -1], [0, 1]]});
        this.addLevel({painting:this.TOWER, type:"swapTiles", divide:5});
        this.addLevel({painting:this.OLD_MUSICIAN, type:"rotateTiles", divide:5, matrix:[[0, -1], [-1, 0], [-1, -1]]});
        this.addLevel({painting:this.WAVE, type:"rotateTiles", divide:5, matrix:[[-2, 0], [-1, 0], [1, 0], [2, 0]]});
    },

    createDummyLevels: function()
    {
        for (var i = 0; i < this.paintings.length; i++)
        {
            var painting = this.paintings[i];
            //this.addLevel( {painting:painting.name, type:"swapTiles", divide:4} );
            this.addLevel( {painting:painting.name, type:"rotateTiles", divide:3} );
        }
    },

    addLevel: function(data)
    {
        var id = this.levels.length;
        var level = new App.Level(id, data);
        this.levels.push(level);
    },

    getLevelTime: function()
    {
        return Math.round(game.time.elapsedSince(this.levelStartTime) - data.pauseTime);
    },

    getTotalTime: function()
    {
        var totalTime = 0;
        for (var i = 0; i < this.levels.length; i++)
        {
            var level = this.levels[i];
            if (level.isCompleted)
            {
                //console.log(i, level.bestTime);
                totalTime += level.bestTime;
            }
        }
        return totalTime;
    },

    getTotalMoves: function()
    {
        var totalMoves = 0;
        for (var i = 0; i < this.levels.length; i++)
        {
            var level = this.levels[i];
            if (level.isCompleted && level.bestMoves != undefined) totalMoves += level.bestMoves;
        }
        return totalMoves;
    }




});
