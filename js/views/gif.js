'use strict';

var AmpersandView = require('ampersand-view');

module.exports = AmpersandView.extend({
    pageTitle: function () {
        return 'Ampersand.js // Gifalicious // Gif #' + this.model.id;
    },
    template: require('../templates/gif.html'),
    bindings: {
        'model.src': [
            {
                type: 'attribute',
                hook: 'src',
                name: 'src'
            },
            {
                type: 'value',
                hook: 'show-url-value'
            }
        ]
    }
});
