'use strict';

var AmpersandState = require('ampersand-state');

module.exports = AmpersandState.extend({
    props: {
        id: {
            type: 'number',
            required: true
        },
        src: {
            type: 'string',
            required: true
        }
    },
    derived: {
        url: {
            deps: ['id'],
            fn: function () {
                return '#gif/' + this.id;
            }
        },
        srcBackground: {
            deps: ['src'],
            fn: function () {
                return 'background-image: url(' + this.src + ')';
            }
        }
    },
    session: {
        showUrl: ['boolean', true, false]
    }
});
