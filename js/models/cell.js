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
        },

        getLivingNeighborCount: function() {
            var neighborCount = 0;
            var currentXCoord = this.get('xCoord');
            var currentYCoord = this.get('yCoord');

            var livingNeighbors = life.Cells.filter(function(cell){
                return cell.get('alive') && (
                    (cell.get('xCoord') === currentXCoord - 1 && cell.get('yCoord') === currentYCoord - 1) ||
                    (cell.get('xCoord') === currentXCoord - 1 && cell.get('yCoord') === currentYCoord) ||
                    (cell.get('xCoord') === currentXCoord - 1 && cell.get('yCoord') === currentYCoord + 1) ||
                    (cell.get('xCoord') === currentXCoord && cell.get('yCoord') === currentYCoord - 1) ||
                    (cell.get('xCoord') === currentXCoord && cell.get('yCoord') === currentYCoord + 1) ||
                    (cell.get('xCoord') === currentXCoord + 1 && cell.get('yCoord') === currentYCoord - 1) ||
                    (cell.get('xCoord') === currentXCoord + 1 && cell.get('yCoord') === currentYCoord) ||
                    (cell.get('xCoord') === currentXCoord + 1 && cell.get('yCoord') === currentYCoord + 1)
                )
            });

            return livingNeighbors.length;

        },

        checkIfNeedsToDie: function() {
            var livingNeighborCount = this.getLivingNeighborCount();
            if((livingNeighborCount < 2) || (livingNeighborCount > 3)){
                this.killCell();
            }   
        },

        checkIfNeedstoBeBorn: function() {
            var livingNeighborCount = this.getLivingNeighborCount();
            if(livingNeighborCount === 3){
                this.makeAlive();
            }
        },

        makeAlive: function() {
            this.set('alive', true);
        },

        killCell: function() {
            this.set({'alive': false});
        }

    });

}());