/**
 * Created by postepenno on 20.03.14.
 */

var Level = Class.extend({

    init: function(id, data)
    {
        this.id = id;
        this.data = data;

        this.clicks = data.clicks;

        this.isCompleted = false;
        this.isOpen = false;
    }

});