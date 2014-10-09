'use strict';

var Me = require('./models/me');
var AppView = require('./views/app');
var Router = require('./router');

window.app = {
    init: function () {
        this.me = new Me();
        this.view = new AppView({
            el: document.body,
            model: this.me
        });
        this.router = new Router();
        this.router.history.start();
    }
};

window.app.init();
