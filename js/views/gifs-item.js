'use strict';

var AmpersandView = require('ampersand-view');

module.exports = AmpersandView.extend({
    template: require('../templates/gifs-item.html'),
    bindings: {
        'model.id': {
            type: 'text',
            hook: 'id'
        },
        'model.url': {
            type: 'attribute',
            hook: 'url',
            name: 'href'
        },
        'model.src': {
            type: 'value',
            hook: 'show-url-value'
        },
        'model.srcBackground': {
            type: 'attribute',
            hook: 'src',
            name: 'style'
        },
        'model.showUrl': {
            type: 'toggle',
            hook: 'show-url'
        }
    },
    events: {
        'click [data-hook~=remove]': 'onRemoveClick',
        'click [data-hook~=show-url-button]': 'onShowUrlClick'
    },
    onRemoveClick: function () {
        if (!this.collection) {
            return;
        }

        this.collection.remove(this.model);
    },
    onShowUrlClick: function () {
        this.model.showUrl = !this.model.showUrl;
    }
});
