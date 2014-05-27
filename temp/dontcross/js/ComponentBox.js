/**
 * Created by postepenno on 09.02.14.
 */

var ComponentBox = Class.extend({

    init: function() {
        this.components = [];
        //console.log("ComponentBox init");
    },

    addComponent: function(comp) {
        this.components.push(comp);
    },

    removeComponent: function(comp) {
        var index = this.components.indexOf(comp);
        this.components.splice(index, 1);
        comp.destroy();
    },

    hasComponent: function(comp)
    {
        return this.components.indexOf(comp) === -1 ? false : true;
    },

    destroyComponents: function() {
        while (this.components.length > 0) {
            var comp = this.components.pop();
            comp.destroy();
        }
    },

    destroy: function() {
        //console.log("ComponentBox destroy");
        this.destroyComponents();
    }

});
