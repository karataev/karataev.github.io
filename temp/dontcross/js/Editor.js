/**
 * Created by postepenno on 17.04.2014.
 */

var Editor = ComponentBox.extend({

    init: function()
    {
        this._super();

        var id = 0;
        var data = {name:'Jail', items:[ {id:0, x:225, y:482}, {id:1, x:311, y:480}, {id:2, x:311, y:390}, {id:3, x:392, y:435, fixed: true}, {id:4, x:549, y:622, fixed: true}, {id:5, x:377, y:622}, {id:6, x:222, y:622}, {id:7, x:81, y:622, fixed: true}, {id:8, x:455, y:527}, {id:9, x:387, y:542, fixed: true}, {id:10, x:223, y:391, fixed: true}, {id:11, x:174, y:542, fixed: true}, {id:12, x:81, y:490}, {id:13, x:551, y:398}, {id:14, x:455, y:398}, {id:15, x:392, y:340, fixed: true}, {id:16, x:226, y:306}, {id:17, x:81, y:382}, {id:18, x:455, y:272}, {id:19, x:392, y:258, fixed: true}, {id:20, x:308, y:302}, {id:21, x:176, y:256, fixed: true}, {id:22, x:81, y:266}, {id:23, x:557, y:173, fixed: true}, {id:24, x:392, y:173}, {id:25, x:210, y:173}, {id:26, x:81, y:173, fixed: true} ], links:[ {p1:13, p2:14}, {p1:13, p2:8}, {p1:8, p2:4}, {p1:8, p2:5}, {p1:14, p2:8}, {p1:18, p2:13}, {p1:23, p2:18}, {p1:24, p2:18}, {p1:18, p2:14}, {p1:2, p2:14}, {p1:10, p2:1}, {p1:10, p2:20}, {p1:10, p2:2}, {p1:16, p2:10}, {p1:10, p2:0}, {p1:1, p2:0}, {p1:2, p2:1}, {p1:20, p2:2}, {p1:16, p2:20}, {p1:21, p2:11}, {p1:11, p2:9}, {p1:3, p2:9}, {p1:19, p2:15}, {p1:19, p2:21}, {p1:25, p2:22}, {p1:12, p2:6}, {p1:26, p2:22}, {p1:22, p2:17}, {p1:17, p2:12}, {p1:12, p2:7}, {p1:7, p2:6}, {p1:6, p2:5}, {p1:5, p2:4}, {p1:13, p2:4}, {p1:23, p2:13}, {p1:23, p2:24}, {p1:24, p2:25}, {p1:25, p2:26} ]};
        this.curLevel = new Level(id, data);
    },

    levelStart: function()
    {
        this.view = new EditorView(this);
        Main.addView(this.view);

        this.logic = new GameLogic(this);
        this.addComponent(this.logic);

    },

    levelAbort: function()
    {
        this.removeComponent(this.logic);
        Main.removeViewByClass(EditorView);
    },

    shuffleItems: function()
    {
        var items = this.logic.getItems();
        for (var i = 0; i < items.length; i++)
        {
            var item = items[i];
            if (!item.fixed)
            {
                var randX = Math.floor(Math.random() * Config.WIDTH);
                var randY = Math.floor(Math.random() * Config.HEIGHT);
                var pos = this.logic.fitInBounds(randX, randY);
                item.setPos(pos.x, pos.y);
            }
        }
        this.logic.checkAllIntersections();
        this.logic.renderLinks();
        this.logic.renderItems();
    },

    saveLevel: function()
    {
        var items = this.logic.getItems();
        var links = this.logic.getLinks();

        var i;
        var itemsDef = "items:[ ";
        for (i = items.length - 1; i >= 0; i--)
        {
            var item = items[i];
            var fixedDef = "";
            var idDef = "id:" + item.id;
            var xDef = "x:" + Math.round(item.getX());
            var yDef = "y:" + Math.round(item.getY());

            if (item.fixed) fixedDef = "fixed:true";
            if (fixedDef.length > 0) fixedDef = ", " + fixedDef;

            var itemDef = "{" + idDef + ", " + xDef + ", " + yDef + fixedDef + "}, ";
            itemsDef += itemDef;
        }
        itemsDef = itemsDef.slice(0, itemsDef.length - 2);
        itemsDef += " ]";

        var linksDef = "links:[ ";
        for (i = links.length - 1; i >= 0; i--)
        {
            var link = links[i];
            var linkDef = "{" + "p1:" + link.p1.id + ", p2:" + link.p2.id + "}, ";
            linksDef += linkDef;
        }
        linksDef = linksDef.slice(0, linksDef.length - 2);
        linksDef += " ]";

        var nameDef = "name:'" + this.curLevel.getTitle() + "'";
        var levelDef = "{" + nameDef + ", " + itemsDef + ", " + linksDef + "}";

        this.copyToClipboard(levelDef);
        //console.log(levelDef);
    },

    copyToClipboard: function(text)
    {
        window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
    },

    levelComplete: function()
    {
        //console.log("Nothing to do!");
    }

});