var life = life || {};

$(function( $ ) {
    'use strict';

    // The Application
    // ---------------

    // Our overall **AppView** is the top-level piece of UI.
    life.AppView = Backbone.View.extend({

        el: '#game-board',

        initialize: function() {
            var cellModel;

            this.gridSize = 25;
            this.populationDensity = .5;
            this.speed = 750;

            this.totalCellNum = this.gridSize * this.gridSize;

            //create the initial grid of cells
            for(var i = 0; i < this.totalCellNum ; i++){
                cellModel = new life.Cell();
                if(Math.random() > this.populationDensity){
                    cellModel.set("alive", true);
                }
                cellModel.set({"xCoord": i%this.gridSize, "yCoord": Math.floor(i/this.gridSize) });
                life.Cells.add(cellModel);
                
            }
            
            this.render();

            //Set up the main timer loop
            setInterval(this.updateState.bind(this),this.speed);
        },

        // Re-rendering the App just means refreshing the statistics -- the rest
        // of the app doesn't change.
        render: function() {

            this.initRows();
            life.Cells.forEach(this.initCells, this);
            
        },

        initRows: function() {
            for(var i = 0; i < this.gridSize; i++) {
                var rowTemplate =  _.template( $('#cell-row-template').html(), {rowNum:i} )
                $('#game-board').append(rowTemplate);
            }
        },

        initCells: function(cell, index) {     
            var cell = new life.CellView({ model: cell });
            $('#cell-row-' + index % this.gridSize).append( cell.render().el );
        },

        updateState: function() {
            life.Cells.each(function(cell){
                if(cell.get('alive')){
                    this.checkIfNeedsToDie(cell);
                }
                else {
                    this.checkIfNeedstoBeBorn(cell);
                }
            }.bind(this));
        },

        checkIfNeedsToDie: function(cell) {
            var livingNeighborCount = this.getLivingNeighborCount(cell);
            if((livingNeighborCount < 2) || (livingNeighborCount > 3)){
                this.killCell(cell);
            }   
        },

        checkIfNeedstoBeBorn: function(cell) {
            var livingNeighborCount = this.getLivingNeighborCount(cell);
            if(livingNeighborCount === 3){
                this.makeAlive(cell);
            }
        },

        getLivingNeighborCount: function(cell) {
            var neighborCount = 0;
            var currentXCoord = cell.get('xCoord');
            var currentYCoord = cell.get('yCoord');

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

            var y = 2;
            return livingNeighbors.length;

        },

        makeAlive: function(cell) {
            cell.set('alive', true);
        },

        killCell: function(cell) {
            cell.set({'alive': false});
        }

    });
});
