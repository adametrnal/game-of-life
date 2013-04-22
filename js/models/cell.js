var life = life || {};

(function() {
    'use strict';

    // Cell Model
    // ----------

    // Our basic **Cell** model has alive and location attributes
    life.Cell = Backbone.Model.extend({

        // Default attributes for the cell
        // and ensure that each todo created has `title` and `completed` keys.
        defaults: {
            alive: false,
            xCoord: 0,
            yCoord:0
        }

    });

}());