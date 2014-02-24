/**
 * Created by postepenno on 19.02.14.
 */

var Game = Class.extend({

    init: function()
    {
        this.player1 = new Player("X");
        this.player2 = new Player("O");
        this.logic = new Logic(this);

        this.activePlayer = undefined;
        this.canvas = undefined;

        this.createGrid();

        $("#btnReplay").on("click", $.proxy(this.replayClick, this));

        this.gameStart();
    },

    gameStart: function()
    {
        $("#btnReplay").hide();

        this.clearGrid();
        this.enableCells();

        this.activePlayer = this.player1;
        this.comment("Ход игрока " + this.activePlayer.mark);
    },

    drawWinLine: function()
    {
        this.canvas = document.createElement("canvas");
        this.canvas.id = "myCanvas";
        this.canvas.width = 306;
        this.canvas.height = 306;
        //this.canvas.style.border = '2px solid green';
        this.canvas.style.zIndex = 10;
        var parentDiv = document.getElementById("grid");
        parentDiv.appendChild(this.canvas);

        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        var line = this.logic.getWinLine();
        ctx.moveTo(line.p1.x, line.p1.y);
        ctx.lineTo(line.p2.x, line.p2.y);
        ctx.lineWidth = 5;
        ctx.strokeStyle = "#D00801";
        ctx.stroke();

        $("#myCanvas").css("opacity", 0);
        $("#myCanvas").animate({opacity:1});
    },

    clear: function()
    {
        var parentDiv = document.getElementById("grid");
        if (this.canvas) parentDiv.removeChild(this.canvas);
    },

    replayClick: function()
    {
        this.clear();
        this.gameStart();
    },

    createGrid: function()
    {
        this.cells = [];

        for (var i = 0; i < 3; i++) {
            this.cells[i] = [];
            for (var j = 0; j < 3; j++) {
                var cell = new Cell(this, i, j);
                this.cells[i][j] = cell;
            }
        }
    },

    clearGrid: function()
    {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                var cell = this.cells[i][j];
                cell.putMark(".");
            }
        }
    },

    cellClicked: function(cell)
    {
        cell.putMark(this.activePlayer.mark);
        cell.disable();
        //this.traceGrid();


        if (this.logic.hasWinner())
        {
            this.comment("Игрок " + this.logic.getWinMark() + " выйграл! Ура!");
            this.drawWinLine();
            this.gameComplete();
        }
        else
        {
            if (this.isDraw())
            {
                this.comment("Победила дружба!");
                this.gameComplete();
            }
            else
            {
                this.nextTurn();
            }
        }


    },

    isDraw: function()
    {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (this.cells[i][j].isEmpty()) return false;
            }
        }
        return true;
    },

    gameComplete: function()
    {
        this.disableCells();
        $("#btnReplay").show();
    },

    disableCells: function() {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                this.cells[i][j].disable();
            }
        }
    },

    enableCells: function()
    {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                this.cells[i][j].enable();
            }
        }
    },


    getPlayerByMark: function(mark) {
        if (this.player1.mark == mark) return this.player1;
        else if (this.player2.mark == mark) return this.player2;
        return undefined;
    },

    traceGrid: function()
    {
        var output = "";
        for (var i = 0; i < 3; i++) {
            var row = "";
            for (var j = 0; j < 3; j++) {
                var cell = this.cells[i][j];
                row += cell.getMark() + " ";
            }
            output += row + "\n";
        }
        console.log(output);
    },

    nextTurn: function()
    {
        if (this.activePlayer === this.player1) this.activePlayer = this.player2;
        else this.activePlayer = this.player1;

        this.comment("Ход игрока " + this.activePlayer.mark);
    },

    comment: function(txt)
    {
        $("#comment").html(txt);
    }

});