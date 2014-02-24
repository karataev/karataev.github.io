/**
 * Created by postepenno on 24.02.14.
 */

var Logic = Class.extend({

    init: function(game)
    {
        this.game = game;

        this.winMark = undefined;
        this.winLine = undefined;
    },

    hasWinner: function()
    {
        var c00 = this.game.cells[0][0].getMark(); var c01 = this.game.cells[0][1].getMark(); var c02 = this.game.cells[0][2].getMark();
        var c10 = this.game.cells[1][0].getMark(); var c11 = this.game.cells[1][1].getMark(); var c12 = this.game.cells[1][2].getMark();
        var c20 = this.game.cells[2][0].getMark(); var c21 = this.game.cells[2][1].getMark(); var c22 = this.game.cells[2][2].getMark();

        var row0 = (c00 == c01) && (c01 == c02) && (c00 != ".");
        var row1 = (c10 == c11) && (c11 == c12) && (c10 != ".");
        var row2 = (c20 == c21) && (c21 == c22) && (c20 != ".");

        var col0 = (c00 == c10) && (c10 == c20) && (c00 != ".");
        var col1 = (c01 == c11) && (c11 == c21) && (c01 != ".");
        var col2 = (c02 == c12) && (c12 == c22) && (c02 != ".");

        var dia0 = (c00 == c11) && (c11 == c22) && (c11 != ".");
        var dia1 = (c02 == c11) && (c11 == c20) && (c11 != ".");

        var w = 100;
        var h = 100;

        if (row0 || row1 || row2 || col0 || col1 || col2 || dia0 || dia1)
        {
            if (row0) {
                this.winMark = c00;
                this.winLine = {p1:{x:w * 0, y:h * 0}, p2:{x:w * 2, y:h * 0}};
            }
            if (row1) {
                this.winMark = c10;
                this.winLine = {p1:{x:w * 0, y:h * 1}, p2:{x:w * 2, y:h * 1}};
            }
            if (row2) {
                this.winMark = c20;
                this.winLine = {p1:{x:w * 0, y:h * 2}, p2:{x:w * 2, y:h * 2}};
            }

            if (col0) {
                this.winMark = c00;
                this.winLine = {p1:{x:w * 0, y:h * 0}, p2:{x:w * 0, y:h * 2}};
            }
            if (col1) {
                this.winMark = c01;
                this.winLine = {p1:{x:w * 1, y:h * 0}, p2:{x:w * 1, y:h * 2}};
            }
            if (col2) {
                this.winMark = c02;
                this.winLine = {p1:{x:w * 2, y:h * 0}, p2:{x:w * 2, y:h * 2}};
            }

            if (dia0) {
                this.winMark = c11;
                this.winLine = {p1:{x:w * 0, y:h * 0}, p2:{x:w * 2, y:h * 2}};
            }
            if (dia1) {
                this.winMark = c11;
                this.winLine = {p1:{x:w * 0, y:h * 2}, p2:{x:w * 2, y:h * 0}};
            }

            this.winLine.p1.x += w / 2;
            this.winLine.p1.y += h / 2;
            this.winLine.p2.x += w / 2;
            this.winLine.p2.y += h / 2;

            return true;
        }


        return false;
    },

    getWinMark: function()
    {
        return this.winMark;
    },

    getWinLine: function()
    {
        return this.winLine;
    }

});