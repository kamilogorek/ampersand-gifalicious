'use strict';

var AmpersandRouter = require('ampersand-router');
var GifsView = require('./views/gifs');
var GifView = require('./views/gif');

module.exports = AmpersandRouter.extend({
    routes: {
        '': 'gifs',
        'gif/:id': 'gif',
        '*catch': 'catch'
    },
    gifs: function () {
        app.view.switcher.set(new GifsView({
            model: app.me
        }));
    },
    gif: function (id) {
        var gifModel = app.me.gifs.get(id);

        if (!gifModel) {
            this.redirectTo('');
        }

        app.view.switcher.set(new GifView({
            model: gifModel
        }));
    },
    catch: function () {
        this.redirectTo('');
    }
});
