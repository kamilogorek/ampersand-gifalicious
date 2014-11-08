'use strict';

var _ = {
    pluck: require('lodash.pluck'),
    contains: require('lodash.contains'),
    max: require('lodash.max')
};
var AmpersandView = require('ampersand-view');
var AmpersandFormView = require('ampersand-form-view');
var AmpersandInputView = require('ampersand-input-view');
var GifsItemView = require('./gifs-item');

module.exports = AmpersandView.extend({
    template: require('../templates/gifs.html'),
    render: function () {
        this.renderWithTemplate();
        this.renderCollection(app.me.gifs, GifsItemView, this.queryByHook('gifs-container'));
        this.renderForm();
        return this;
    },
    renderForm: function () {
        var inputView = new AmpersandInputView({
            name: 'src',
            placeholder: 'Where\'s this lovely gif\'s url?',
            tests: [
                function (val) {
                    var urlRegexp = /^https?:\/\/.+\.[A-Za-z]{2,}.+\.(gif|jpe?g|png)$/;

                    if (!urlRegexp.test(val)) {
                        return 'Please provide valid URL';
                    }
                }
            ]
        });

        this.form = new AmpersandFormView({
            el: this.queryByHook('add-gif'),
            submitCallback: function (obj) {
                var isAlreadyAdded = _.contains(_.pluck(app.me.gifs.models, 'src'), obj.src);
                var confirmationText = 'You already stored this gif. Are you sure you want to add it again?';

                if (isAlreadyAdded && !window.confirm(confirmationText)) {
                    return;
                }

                app.me.gifs.add({
                    id: app.me.gifs.length ? _.max(_.pluck(app.me.gifs.models, 'id')) + 1 : 1,
                    src: obj.src
                });

                this.el.reset();
            },
            fields: [inputView]
        });
    }
});
