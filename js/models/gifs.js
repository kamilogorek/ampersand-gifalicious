'use strict';

var AmpersandCollection = require('ampersand-collection');
var Gif = require('./gif');
var STORAGE_KEY = 'ampersand-gifalicious';

module.exports = AmpersandCollection.extend({
    model: Gif,
    initialize: function () {
        this.readFromLocalStorage();
        this.on('all', this.writeToLocalStorage, this);
    },
    comparator: function (model) {
        return -model.id;
    },
    writeToLocalStorage: function () {
        localStorage[STORAGE_KEY] = JSON.stringify(this);
    },
    readFromLocalStorage: function () {
        var existingData = localStorage[STORAGE_KEY];

        if (existingData) {
            this.add(JSON.parse(existingData));
        }
    }
});
