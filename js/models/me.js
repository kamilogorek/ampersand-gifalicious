'use strict';

var AmpersandState = require('ampersand-state');
var Gifs = require('./gifs');

module.exports = AmpersandState.extend({
    session: {
        counterText: ['string', true, 'You have 0 delicious gifs!']
    },
    initialize: function () {
        this.listenTo(this.gifs, 'add remove', this.handleGifsUpdates);
        this.handleGifsUpdates();
    },
    collections: {
        gifs: Gifs
    },
    handleGifsUpdates: function () {
        var pluralize = (this.gifs.length !== 1) ? 's' : '';
        var text = 'You have ' + this.gifs.length + ' delicious gif' + pluralize + '!';
        this.set('counterText', text);
    }
});
