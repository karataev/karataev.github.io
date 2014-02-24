/**
 * Created by postepenno on 19.02.14.
 */

var Cell = Class.extend({

    init: function(game, row, col)
    {
        this.game = game;
        this.row = row;
        this.col = col;

        var gridPos = $("#grid").position();

        this.$p = $("<p class='cellp'>*</p>");
        this.$div = $("<div class='cell'></div>");
        //this.$div.css("left", gridPos.left + col * 100);
        //this.$div.css("top", gridPos.top + row * 100);
        this.$div.append(this.$p);
        $("#cells").append(this.$div);
    },

    onClick: function()
    {
        this.game.cellClicked(this);
    },

    putMark: function(mark)
    {
        this.$p.html(mark);
    },

    disable: function() {
        this.$div.removeClass("can_click");
        this.$div.addClass("cant_click");
        this.$div.off("click");
    },

    enable: function() {
        this.$div.removeClass("cant_click");
        this.$div.addClass("can_click");
        this.$div.click($.proxy(this.onClick, this));
    },

    getMark: function() {
        return this.$p.html();
    },

    isEmpty: function()
    {
        if (this.getMark() == ".") return true;
        return false;
    }


});