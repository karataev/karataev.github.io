/**
 * Created by postepenno on 09.02.14.
 */

var Background = ComponentBox.extend({

    init: function() {

        this._super();

        this.container = Main.backContainer;

        this.addComponent( new Picture(this.container, "background") );
    }

});