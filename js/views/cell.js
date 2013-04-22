var life = life || {};

$(function() {
    'use strict';

    // Single Cell View
    // --------------

    // The DOM element for a todo item...
    life.CellView = Backbone.View.extend({

        //... is a table data tag.
        tagName:  'td',

        className: 'table-element',

        // Cache the template function for a single item.
        template: _.template( $('#cell-template').html() ),

        initialize: function() {
            this.listenTo(this.model, 'change', this.render);

        },

        // Re-render the titles of the todo item.
        render: function() {
            this.$el.html( this.template( this.model.toJSON() ) );
            this.$el.toggleClass('alive', this.model.get('alive') );

            return this;
        }

    });
});
