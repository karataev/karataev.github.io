/**
 * Created by postepenno on 31.01.14.
 */

var LevelView = ComponentBox.extend({

    init: function(game) {

        this.game = game;

        this._super();

        //this.back = new Background();
        //this.addComponent(this.back);

        //this.addComponent( new Picture(Main.viewContainer, "levelUIBack") );
        this.addComponent( new Button(Main.viewContainer, "restartButton", this.restartClick, this, {x:190, y:5}) );
        this.addComponent( new Button(Main.viewContainer, "pauseButton", this.pauseClick, this, {x:255, y:5}) );
        this.addComponent( new SoundIcon(this.game, Main.viewContainer, 125, 5) );

        var levelNum = "Level " + (this.game.curLevel.id + 1);
        this.levelNumText = new TextField(Main.viewContainer, levelNum, {x:10, y:5, font:"30px Ceviche One", color:"#FFFFFF", shadow:true});
        this.addComponent(this.levelNumText);

        this.clicksText = new TextField(Main.viewContainer, "", {x:10, y:35, font:"30px Ceviche One", color:"#FFFFFF", shadow:true});
        //this.clicksText = new TextField(Main.viewContainer, "", {x:10, y:40, font:"bold 20px Arial", color:"#555555"});
        this.updateClicksText();
        this.addComponent(this.clicksText);

        var levelData = this.game.curLevel.data;
        //console.log("Start level", levelData.name);
        var circlesData = levelData.circles;
        for (var i = 0; i < circlesData.length; i++)
        {
            var c = circlesData[i];
            this.addCircle(c.x, c.y, c.shots, c.angle, c.gap, c.armor, false);
        }

        this.addComponent( new Tutorial(this.game, Main.viewContainer) );

        this.tickListener = createjs.Ticker.on("tick", this.tick, this);

    },

    addCircle: function(x, y, shots, angle, gap, armor, wobble)
    {
        var circle = new Circle(this.game, this, Main.viewContainer, {x:x, y:y, shots:shots, angle:angle, gap:gap, armor:armor, wobble:wobble});
        this.addComponent(circle);
    },

    updateClicksText: function()
    {
        this.clicksText.setText("Taps: " + this.game.clicks);
    },

    noClicksLeft: function()
    {
        console.log("No taps left :(");
    },

    pauseClick: function(bt, thisRef)
    {
        Main.addView( new PauseView(Main.viewContainer, thisRef.game) );
    },

    restartClick: function(bt, thisRef)
    {
        var id = thisRef.game.curLevel.id;
        thisRef.game.levelAbort();
        thisRef.game.levelStart(id);
    },

    addBullet: function(x, y, angle)
    {
        var r = Config.CIRCLE_RADIUS;
        var m = Config.BULLET_SPEED;
        var dx = Math.cos(angle * Math.PI / 180);
        var dy = Math.sin(angle * Math.PI / 180);

        this.addComponent( new Bullet(this.game, this, Main.viewContainer, x + dx * r, y + dy * r, dx * m, dy * m) );
    },

    tick: function()
    {
        this.checkCollisions();
        this.updateObjects();
    },

    checkCollisions: function()
    {
        for (var i = this.components.length - 1; i >= 0; i--)
        {
            var obj = this.components[i];
            if (obj instanceof Bullet) this.checkBullet(obj);
        }
    },

    checkBullet: function(bullet)
    {
        for (var i = this.components.length - 1; i >= 0; i--)
        {
            var obj = this.components[i];
            if (obj instanceof Circle)
            {
                if (this.checkBulletVsCircle(bullet, obj))
                {
                    this.game.circleBulletCollision(obj, bullet);
                    break;
                }
            }
        }
    },

    noCircles: function()
    {
        for (var i = 0; i < this.components.length; i++)
        {
            var obj = this.components[i];
            if (obj instanceof Circle)
            {
                return false;
            }
        }
        return true;
    },

    noBullets: function()
    {
        for (var i = 0; i < this.components.length; i++)
        {
            var obj = this.components[i];
            if (obj instanceof Bullet)
            {
                return false;
            }
        }
        return true;
    },

    checkBulletVsCircle: function(bullet, circle)
    {
        var dx = circle.x - bullet.x;
        var dy = circle.y - bullet.y;
        var dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < Config.CIRCLE_RADIUS) return true;
        return false;
    },

    updateObjects: function()
    {
        for (var i = this.components.length - 1; i >= 0; i--)
        {
            var obj = this.components[i];
            if (obj instanceof Bullet) obj.update();
        }
    },


    destroy: function()
    {
        createjs.Ticker.off("tick", this.tickListener);

        this._super();
    }


});