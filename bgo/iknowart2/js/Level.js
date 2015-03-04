/**
 * Created by postepenno on 23.06.2014.
 */

App.Level = Class.extend({

    init: function(id, data)
    {
        this.id = id;
        this.data = data;
        this.moves = undefined;
        this.bestMoves = undefined;

        this.reset();
    },

    reset: function()
    {
        this.isCompleted = false;
        this.isOpen = false;
    },

    complete: function(newTime)
    {
        this.isCompleted = true;
        if (this.bestMoves != undefined)
        {
            if (this.moves < this.bestMoves) this.bestMoves = this.moves;
        }
        else this.bestMoves = this.moves;
    },

    getTitle: function()
    {
        return this.data.name;
    }


});

