'use strict';

var _ = {
    result: require('lodash.result')
};
var AmpersandView = require('ampersand-view');
var AmpersandViewSwitcher = require('ampersand-view-switcher');

module.exports = AmpersandView.extend({
    bindings: {
        'model.counterText': {
            type: 'text',
            hook: 'counter'
        }
    },
    initialize: function () {
        this.container = this.queryByHook('app-container');
        this.switcher = new AmpersandViewSwitcher(this.container, {
            show: function (newView) {
                document.title = _.result(newView, 'pageTitle') || 'Ampersand.js // Gifalicious';
                document.body.scrollTop = 0;
            }
        });
    }
});
