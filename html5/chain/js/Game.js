/**
 * Created by postepenno on 20.03.14.
 */

var Game = Class.extend({

    init: function()
    {
        this.createLevels();

        this.progress = new GameProgress(this);
    },

    loadProgress: function()
    {
        console.log("first");
        console.log(localStorage["game.version"]);
        console.log("second");
    },

    createLevels: function()
    {
        this.levels = [];

        //this.addLevel( {name:'Test', clicks:7, circles:[ {x:210, y:113, shots:2, angle:0, gap:180, armor:0}, {x:196, y:333, shots:2, angle:0, gap:180, armor:0}, {x:214, y:186, shots:2, angle:0, gap:180, armor:0}, {x:102, y:281, shots:2, angle:-30, gap:180, armor:0}, {x:109, y:416, shots:2, angle:180, gap:90, armor:0}, {x:87, y:163, shots:0, angle:0, gap:90, armor:1}, {x:277, y:438, shots:1, angle:-168, gap:90, armor:0} ]} );
        this.addLevel( {name:'First', clicks:4, circles:[ {x:224, y:320, shots:0, angle:0, gap:90, armor:0}, {x:96, y:320, shots:0, angle:0, gap:90, armor:0}, {x:224, y:195, shots:0, angle:0, gap:90, armor:0}, {x:96, y:195, shots:0, angle:0, gap:90, armor:0} ]} );
        this.addLevel( {name:'Simple Quad', clicks:1, circles:[ {x:64, y:365, shots:1, angle:-90, gap:90, armor:0}, {x:255, y:365, shots:1, angle:180, gap:90, armor:0}, {x:257, y:174, shots:1, angle:90, gap:90, armor:0}, {x:65, y:171, shots:1, angle:0, gap:90, armor:0} ]} );
        this.addLevel( {name:'One Quad Touch', clicks:1, circles:[ {x:160, y:269, shots:4, angle:0, gap:90, armor:0}, {x:160, y:416, shots:0, angle:0, gap:90, armor:0}, {x:282, y:272, shots:0, angle:0, gap:90, armor:0}, {x:42, y:272, shots:0, angle:0, gap:90, armor:0}, {x:160, y:126, shots:0, angle:0, gap:90, armor:0} ]} );
        this.addLevel( {name:'Shooting', clicks:4, circles:[ {x:257, y:420, shots:1, angle:180, gap:90, armor:0}, {x:257, y:225, shots:1, angle:180, gap:90, armor:0}, {x:65, y:421, shots:0, angle:0, gap:90, armor:0}, {x:256, y:323, shots:0, angle:0, gap:90, armor:0}, {x:64, y:323, shots:1, angle:0, gap:90, armor:0}, {x:64, y:226, shots:0, angle:0, gap:90, armor:0}, {x:64, y:128, shots:1, angle:0, gap:90, armor:0}, {x:258, y:128, shots:0, angle:0, gap:90, armor:0} ]} );
        this.addLevel( {name:'Simple order', clicks:1, circles:[ {x:165, y:264, shots:1, angle:180, armor:0}, {x:275, y:264, shots:0, angle:0, armor:0}, {x:49, y:264, shots:1, angle:0, armor:0} ]} );
        this.addLevel( {name:'Medium Quad', clicks:2, circles:[ {x:53, y:385, shots:1, angle:-90, gap:90, armor:0}, {x:268, y:385, shots:1, angle:180, gap:90, armor:0}, {x:268, y:158, shots:1, angle:90, gap:90, armor:0}, {x:159, y:267, shots:4, angle:0, gap:90, armor:0}, {x:50, y:159, shots:0, angle:0, gap:90, armor:0}, {x:161, y:385, shots:0, angle:0, gap:90, armor:0}, {x:266, y:269, shots:0, angle:0, gap:90, armor:0}, {x:52, y:268, shots:0, angle:0, gap:90, armor:0}, {x:163, y:158, shots:0, angle:0, gap:90, armor:0} ]} );
        this.addLevel( {name:'Quads 2 Touch', clicks:2, circles:[ {x:122, y:116, shots:0, angle:0, gap:90, armor:0}, {x:124, y:429, shots:0, angle:0, gap:90, armor:0}, {x:45, y:351, shots:0, angle:0, gap:90, armor:0}, {x:284, y:353, shots:0, angle:0, gap:90, armor:0}, {x:120, y:351, shots:4, angle:0, gap:90, armor:0}, {x:196, y:429, shots:0, angle:0, gap:90, armor:0}, {x:40, y:192, shots:0, angle:0, gap:90, armor:0}, {x:201, y:116, shots:0, angle:0, gap:90, armor:0}, {x:278, y:191, shots:0, angle:0, gap:90, armor:0}, {x:200, y:192, shots:4, angle:0, gap:90, armor:0} ]} );
        this.addLevel( {name:'Simple order2', clicks:1, circles:[ {x:153, y:359, shots:1, angle:-90, armor:0}, {x:153, y:278, shots:1, angle:-90, armor:0}, {x:153, y:189, shots:1, angle:90, armor:0}, {x:153, y:114, shots:1, angle:90, armor:0}, {x:154, y:435, shots:0, angle:0, armor:0} ]} );
        this.addLevel( {name:'Spiral', clicks:1, circles:[ {x:53, y:139, shots:0, angle:0, gap:90, armor:0}, {x:129, y:139, shots:1, angle:180, gap:90, armor:0}, {x:203, y:139, shots:1, angle:180, gap:90, armor:0}, {x:273, y:206, shots:1, angle:-90, gap:90, armor:0}, {x:273, y:269, shots:1, angle:-90, gap:90, armor:0}, {x:273, y:342, shots:1, angle:-90, gap:90, armor:0}, {x:205, y:410, shots:1, angle:0, gap:90, armor:0}, {x:134, y:410, shots:1, angle:0, gap:90, armor:0}, {x:62, y:344, shots:1, angle:90, gap:90, armor:0}, {x:62, y:273, shots:1, angle:90, gap:90, armor:0}, {x:129, y:205, shots:1, angle:180, gap:90, armor:0}, {x:202, y:273, shots:1, angle:-90, gap:90, armor:0}, {x:270, y:139, shots:1, angle:180, gap:90, armor:0}, {x:273, y:415, shots:1, angle:-90, gap:90, armor:0}, {x:62, y:410, shots:1, angle:0, gap:90, armor:0}, {x:57, y:205, shots:1, angle:90, gap:90, armor:0}, {x:202, y:346, shots:1, angle:-90, gap:90, armor:0}, {x:204, y:205, shots:1, angle:180, gap:90, armor:0}, {x:129, y:275, shots:1, angle:90, gap:90, armor:0}, {x:129, y:347, shots:1, angle:0, gap:90, armor:0} ]} );
        this.addLevel( {name:'Triple Shoot', clicks:3, circles:[ {x:258, y:123, shots:0, angle:0, gap:90, armor:0}, {x:258, y:427, shots:0, angle:0, gap:90, armor:0}, {x:39, y:349, shots:0, angle:0, gap:90, armor:0}, {x:110, y:348, shots:0, angle:0, gap:90, armor:0}, {x:111, y:273, shots:0, angle:0, gap:90, armor:0}, {x:261, y:198, shots:0, angle:0, gap:90, armor:0}, {x:259, y:349, shots:4, angle:0, gap:90, armor:0}, {x:183, y:272, shots:4, angle:0, gap:90, armor:0}, {x:111, y:199, shots:4, angle:0, gap:90, armor:0}, {x:40, y:200, shots:0, angle:0, gap:90, armor:0}, {x:185, y:348, shots:0, angle:0, gap:90, armor:0}, {x:260, y:271, shots:0, angle:0, gap:90, armor:0}, {x:109, y:120, shots:0, angle:0, gap:90, armor:0}, {x:184, y:197, shots:0, angle:0, gap:90, armor:0} ]} );
        this.addLevel( {name:'Yellow Start', clicks:6, circles:[ {x:162, y:264, shots:4, angle:0, gap:90, armor:1}, {x:159, y:409, shots:0, angle:0, gap:90, armor:1}, {x:277, y:264, shots:0, angle:0, gap:90, armor:1}, {x:43, y:264, shots:0, angle:0, gap:90, armor:1}, {x:160, y:131, shots:0, angle:0, gap:90, armor:1} ]} );
        this.addLevel( {name:'Yellow Intro', clicks:4, circles:[ {x:197, y:264, shots:0, angle:0, gap:90, armor:1}, {x:127, y:264, shots:0, angle:0, gap:90, armor:1}, {x:125, y:412, shots:1, angle:-90, gap:90, armor:0}, {x:122, y:111, shots:1, angle:90, gap:90, armor:0}, {x:272, y:264, shots:1, angle:180, gap:90, armor:0}, {x:48, y:264, shots:1, angle:0, gap:90, armor:0} ]} );
        this.addLevel( {name:'Corners', clicks:1, circles:[ {x:78, y:121, shots:0, angle:0, gap:90, armor:0}, {x:82, y:420, shots:0, angle:0, gap:90, armor:0}, {x:82, y:347, shots:2, angle:-90, gap:90, armor:0}, {x:188, y:347, shots:2, angle:180, gap:90, armor:0}, {x:183, y:194, shots:2, angle:90, gap:90, armor:0}, {x:82, y:194, shots:2, angle:0, gap:90, armor:0}, {x:191, y:420, shots:0, angle:0, gap:90, armor:0}, {x:258, y:347, shots:0, angle:0, gap:90, armor:0}, {x:253, y:196, shots:0, angle:0, gap:90, armor:0} ]} );
        this.addLevel( {name:'Many Clicks2', clicks:16, circles:[ {x:276, y:392, shots:0, angle:0, gap:90, armor:0}, {x:201, y:392, shots:0, angle:0, gap:90, armor:0}, {x:124, y:392, shots:0, angle:0, gap:90, armor:0}, {x:50, y:392, shots:0, angle:0, gap:90, armor:0}, {x:276, y:312, shots:0, angle:0, gap:90, armor:0}, {x:201, y:312, shots:0, angle:0, gap:90, armor:0}, {x:124, y:312, shots:0, angle:0, gap:90, armor:0}, {x:50, y:312, shots:0, angle:0, gap:90, armor:0}, {x:276, y:230, shots:0, angle:0, gap:90, armor:0}, {x:201, y:230, shots:0, angle:0, gap:90, armor:0}, {x:124, y:230, shots:0, angle:0, gap:90, armor:0}, {x:50, y:230, shots:0, angle:0, gap:90, armor:0}, {x:276, y:154, shots:0, angle:0, gap:90, armor:0}, {x:201, y:154, shots:0, angle:0, gap:90, armor:0}, {x:124, y:154, shots:0, angle:0, gap:90, armor:0}, {x:50, y:154, shots:0, angle:0, gap:90, armor:0} ]} );
        this.addLevel( {name:'Simple Yellow', clicks:1, circles:[ {x:68, y:221, shots:0, angle:0, gap:90, armor:1}, {x:165, y:221, shots:2, angle:0, gap:180, armor:0}, {x:165, y:117, shots:1, angle:90, gap:90, armor:0}, {x:165, y:433, shots:0, angle:0, gap:90, armor:0}, {x:165, y:327, shots:2, angle:180, gap:90, armor:0}, {x:66, y:325, shots:0, angle:0, gap:90, armor:0}, {x:269, y:327, shots:1, angle:180, gap:90, armor:0}, {x:269, y:221, shots:2, angle:90, gap:90, armor:0} ]} );
        this.addLevel( {name:'More Yellow', clicks:1, circles:[ {x:148, y:130, shots:0, angle:-90, gap:90, armor:0}, {x:148, y:433, shots:0, angle:-90, gap:90, armor:0}, {x:243, y:202, shots:1, angle:180, gap:90, armor:0}, {x:240, y:282, shots:2, angle:90, gap:180, armor:0}, {x:148, y:282, shots:2, angle:0, gap:180, armor:0}, {x:51, y:281, shots:2, angle:-45, gap:90, armor:0}, {x:146, y:202, shots:1, angle:90, gap:90, armor:1}, {x:243, y:365, shots:1, angle:180, gap:90, armor:0}, {x:146, y:365, shots:1, angle:-90, gap:90, armor:1} ]} );
        this.addLevel( {name:'Yellow Four', clicks:2, circles:[ {x:43, y:429, shots:0, angle:0, gap:90, armor:1}, {x:267, y:429, shots:1, angle:180, gap:90, armor:0}, {x:260, y:123, shots:1, angle:90, gap:90, armor:1}, {x:43, y:123, shots:2, angle:0, gap:90, armor:0}, {x:158, y:123, shots:2, angle:0, gap:180, armor:1}, {x:43, y:276, shots:0, angle:0, gap:90, armor:1}, {x:158, y:433, shots:1, angle:-90, gap:90, armor:0}, {x:267, y:275, shots:1, angle:180, gap:90, armor:0}, {x:157, y:276, shots:4, angle:0, gap:90, armor:1} ]} );
        this.addLevel( {name:'Red Intro', clicks:3, circles:[ {x:280, y:275, shots:1, angle:180, gap:90, armor:0}, {x:155, y:125, shots:1, angle:90, gap:90, armor:0}, {x:47, y:277, shots:1, angle:0, gap:90, armor:0}, {x:157, y:275, shots:0, angle:0, gap:90, armor:2} ]} );
        this.addLevel( {name:'RedQuad', clicks:3, circles:[ {x:44, y:373, shots:0, angle:0, gap:90, armor:0}, {x:39, y:170, shots:0, angle:0, gap:90, armor:0}, {x:278, y:369, shots:0, angle:0, gap:90, armor:0}, {x:278, y:170, shots:0, angle:0, gap:90, armor:0}, {x:160, y:277, shots:4, angle:45, gap:90, armor:2} ]} );
        this.addLevel( {name:'Right Order', clicks:3, circles:[ {x:128, y:145, shots:0, angle:0, gap:90, armor:0}, {x:201, y:145, shots:0, angle:0, gap:90, armor:0}, {x:52, y:380, shots:1, angle:-90, gap:90, armor:0}, {x:127, y:379, shots:1, angle:180, gap:90, armor:0}, {x:280, y:380, shots:1, angle:-90, gap:90, armor:0}, {x:202, y:379, shots:2, angle:0, gap:180, armor:0}, {x:202, y:300, shots:1, angle:0, gap:90, armor:0}, {x:127, y:300, shots:2, angle:0, gap:180, armor:0}, {x:129, y:223, shots:1, angle:180, gap:90, armor:0}, {x:206, y:223, shots:1, angle:180, gap:90, armor:0}, {x:284, y:223, shots:1, angle:180, gap:90, armor:0}, {x:280, y:145, shots:1, angle:180, gap:90, armor:0}, {x:49, y:145, shots:1, angle:0, gap:90, armor:0}, {x:54, y:223, shots:0, angle:0, gap:90, armor:0}, {x:282, y:302, shots:0, angle:0, gap:90, armor:0}, {x:50, y:302, shots:0, angle:0, gap:90, armor:0} ]} );
        this.addLevel( {name:'Reds', clicks:4, circles:[ {x:206, y:388, shots:0, angle:0, gap:90, armor:1}, {x:282, y:306, shots:0, angle:0, gap:90, armor:0}, {x:46, y:306, shots:0, angle:0, gap:90, armor:1}, {x:118, y:388, shots:0, angle:0, gap:90, armor:0}, {x:122, y:139, shots:0, angle:0, gap:90, armor:1}, {x:206, y:308, shots:4, angle:0, gap:90, armor:1}, {x:46, y:222, shots:0, angle:0, gap:90, armor:1}, {x:282, y:222, shots:0, angle:0, gap:90, armor:0}, {x:206, y:139, shots:0, angle:0, gap:90, armor:0}, {x:121, y:223, shots:4, angle:0, gap:90, armor:0}, {x:121, y:308, shots:4, angle:0, gap:90, armor:1}, {x:206, y:223, shots:4, angle:0, gap:90, armor:2} ]} );
        this.addLevel( {name:'Many Clicks3', clicks:6, circles:[ {x:50, y:312, shots:2, angle:90, gap:180, armor:0}, {x:199, y:312, shots:4, angle:0, gap:90, armor:0}, {x:275, y:233, shots:1, angle:90, gap:90, armor:0}, {x:198, y:154, shots:1, angle:0, gap:90, armor:0}, {x:122, y:230, shots:2, angle:0, gap:180, armor:0}, {x:276, y:392, shots:0, angle:0, gap:90, armor:0}, {x:201, y:392, shots:0, angle:0, gap:90, armor:0}, {x:124, y:392, shots:0, angle:0, gap:90, armor:0}, {x:50, y:392, shots:0, angle:0, gap:90, armor:0}, {x:276, y:312, shots:0, angle:0, gap:90, armor:0}, {x:124, y:312, shots:0, angle:0, gap:90, armor:0}, {x:201, y:230, shots:0, angle:0, gap:90, armor:0}, {x:50, y:230, shots:0, angle:0, gap:90, armor:0}, {x:276, y:154, shots:0, angle:0, gap:90, armor:0}, {x:124, y:154, shots:0, angle:0, gap:90, armor:0}, {x:50, y:154, shots:0, angle:0, gap:90, armor:0} ]} );
        this.addLevel( {name:'Reds2', clicks:3, circles:[ {x:252, y:267, shots:2, angle:90, gap:180, armor:0}, {x:159, y:360, shots:2, angle:0, gap:180, armor:0}, {x:74, y:267, shots:2, angle:90, gap:180, armor:0}, {x:163, y:171, shots:2, angle:0, gap:180, armor:0}, {x:252, y:358, shots:4, angle:0, gap:90, armor:2}, {x:73, y:358, shots:4, angle:0, gap:90, armor:2}, {x:73, y:173, shots:4, angle:0, gap:90, armor:2}, {x:163, y:264, shots:4, angle:0, gap:90, armor:1}, {x:250, y:168, shots:4, angle:0, gap:90, armor:2} ]} );
        this.addLevel( {name:'Sides', clicks:1, circles:[ {x:42, y:434, shots:1, angle:0, gap:90, armor:0}, {x:42, y:131, shots:1, angle:0, gap:90, armor:0}, {x:278, y:433, shots:0, angle:0, gap:90, armor:0}, {x:282, y:129, shots:0, angle:0, gap:90, armor:0}, {x:204, y:284, shots:2, angle:180, gap:180, armor:0}, {x:285, y:284, shots:1, angle:180, gap:90, armor:0}, {x:120, y:284, shots:2, angle:180, gap:180, armor:0}, {x:46, y:286, shots:2, angle:90, gap:180, armor:2} ]} );
        this.addLevel( {name:'Blue Intro', clicks:1, circles:[ {x:159, y:430, shots:1, angle:-90, gap:90, armor:0}, {x:163, y:115, shots:2, angle:0, gap:90, armor:0}, {x:276, y:270, shots:2, angle:90, gap:90, armor:0}, {x:44, y:274, shots:2, angle:-90, gap:90, armor:0}, {x:48, y:430, shots:1, angle:-90, gap:90, armor:0}, {x:162, y:274, shots:0, angle:0, gap:90, armor:3}, {x:275, y:115, shots:1, angle:90, gap:90, armor:0}, {x:48, y:115, shots:1, angle:0, gap:90, armor:0}, {x:273, y:430, shots:1, angle:180, gap:90, armor:0} ]} );
        this.addLevel( {name:'Many Clicks', clicks:16, circles:[ {x:87, y:329, shots:0, angle:0, gap:90, armor:3}, {x:232, y:329, shots:0, angle:0, gap:90, armor:3}, {x:232, y:174, shots:0, angle:0, gap:90, armor:3}, {x:86, y:174, shots:0, angle:0, gap:90, armor:3} ]} );
        this.addLevel( {name:'Shooting 2', clicks:1, circles:[ {x:48, y:437, shots:1, angle:-90, gap:90, armor:0}, {x:282, y:437, shots:2, angle:180, gap:90, armor:0}, {x:128, y:436, shots:2, angle:180, gap:90, armor:0}, {x:207, y:436, shots:2, angle:180, gap:90, armor:0}, {x:284, y:360, shots:2, angle:-90, gap:180, armor:0}, {x:209, y:363, shots:2, angle:-90, gap:90, armor:0}, {x:127, y:363, shots:2, angle:-90, gap:90, armor:0}, {x:48, y:363, shots:2, angle:-90, gap:90, armor:0}, {x:50, y:287, shots:2, angle:-90, gap:180, armor:0}, {x:282, y:288, shots:2, angle:180, gap:90, armor:0}, {x:128, y:287, shots:2, angle:180, gap:90, armor:0}, {x:207, y:287, shots:2, angle:180, gap:90, armor:0}, {x:282, y:204, shots:2, angle:-90, gap:180, armor:0}, {x:207, y:207, shots:2, angle:-90, gap:90, armor:0}, {x:125, y:207, shots:2, angle:-90, gap:90, armor:0}, {x:46, y:207, shots:2, angle:-90, gap:90, armor:0}, {x:280, y:118, shots:0, angle:0, gap:90, armor:3}, {x:203, y:118, shots:0, angle:0, gap:90, armor:3}, {x:123, y:118, shots:0, angle:0, gap:90, armor:3}, {x:45, y:118, shots:0, angle:0, gap:90, armor:3} ]} );

        this.curLevel = undefined;
    },

    addLevel: function(data)
    {
        var id = this.levels.length;
        var level = new Level(id, data);
        this.levels.push(level);
    },

    levelStart: function(id)
    {
        this.curLevel = this.levels[id];
        this.clicks = this.curLevel.clicks;
        this.isLevelCompleted = false;
        this.isLevelFailed = false;

        this.levelView = new LevelView(this);
        Main.addView(this.levelView);
    },

    levelAbort: function()
    {
        Main.removeViewByClass(LevelView);
        Main.removeViewByClass(LevelCompleteView);
        Main.removeViewByClass(LevelFailView);
        Main.removeViewByClass(PauseView);
        Main.removeViewByClass(GameCompleteView);
    },

    levelNext:function()
    {
        var levelId = this.curLevel.id;
        this.levelAbort();

        if (levelId == this.levels.length - 1)
        {
            this.gameComplete();
        }
        else
        {
            this.levelStart(levelId + 1);
        }

    },

    bulletOutOfBounds: function(bullet)
    {
        this.levelView.removeComponent(bullet);

        this.maybeLevelEnd();
    },

    circleBulletCollision: function(circle, bullet)
    {
        this.levelView.removeComponent(bullet);
        this.removeCircle(circle);
    },


    circleClicked: function(circle)
    {
        if (this.clicks > 0)
        {
            this.clicks--;
            this.levelView.updateClicksText();

            this.removeCircle(circle);
        }
        else
        {
            this.levelView.noClicksLeft();
        }
    },

    removeCircle: function(circle)
    {
        circle.explode();
        this.maybeLevelEnd();
    },

    maybeLevelEnd: function()
    {
        if (this.isLevelCompleted || this.isLevelFailed) return;

        if (this.levelView.noCircles())
        {
            this.levelComplete();
        }
        else if (this.clicks == 0 && this.levelView.noBullets())
        {
            this.levelFail();
        }

    },

    levelComplete: function()
    {
        this.isLevelCompleted = true;
        this.curLevel.isCompleted = true;
        this.progress.levelComplete();
        Main.addView( new LevelCompleteView(this) );
        Sounds.play("sndLevelComplete");
    },

    levelFail: function()
    {
        this.isLevelFailed = true;
        Main.addView( new LevelFailView(this) );
        Sounds.play("sndLevelFail");
    },

    gameComplete: function()
    {
        Main.addView( new GameCompleteView(this) );
    },

    gameAbort:function()
    {
        this.levelAbort();
        Main.addView( new LevelSelectView(this) );
    }

});