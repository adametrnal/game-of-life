var life = life || {};

(function() {
    'use strict';

    // Cells Collection
    // ---------------

    var Cells = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: life.Cell,

    });

    // Create our global collection of **Todos**.
    life.Cells = new Cells();

}());
