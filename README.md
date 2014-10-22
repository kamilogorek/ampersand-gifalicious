# Ampersand.js // Gifalicious
### Ampersand.js implementation of Gifalicious for net magazine

Application demo can be found [here](http://kamilogorek.pl/labs/ampersand-gifalicious).

### Written by [Kamil Ogórek](http://kamilogorek.pl) @ [X-Team](http://x-team.com/)<br>for [net magazine](http://www.creativebloq.com/net-magazine) using [Ampersand.js](http://ampersandjs.com/) by [&yet](http://andyet.com/).


## Additions:
#### Handling single gif route

Let's move to a single gif route. First of all we need to check whether we even have a gif with given ID, and redirect user back to the main page if now. However if we find it, we render proper view. To handle it, we modify `gif` route function in our router.js

```js
// router.js

var gifModel = !app.me.gifs.get(id);

if (gifModel) this.redirectTo('');

app.view.switcher.set(new GifView({
    model: gifModel
}));
```

Once we're inside that route, it's just a matter of creating a single view and setting it up inside our main view switcher just as we did with the main view, but this time we set template to our single page template and add necessary bindings.

Our template here is simple `img` tag with `data-hook=src` and input for displaying a url itself with `data-hook=show-url-value`.


#### Adding gifs counter

In order to add this feature we need to:
- get size of gifs collection
- add counter itself to the template
- bind data
- listen for any changes in gifs collection and update the counter

As we want our counter to be visible on any page, first we'll add `h2` tag with `data-hook=counter` to the index.html.
Next, we need to get the data itself and keep it in sync with the collection.
To make things simpler, we'll store it as a string in a session property – which is a property that's not included in toJSON or any other serialization function. And we'll attach a new listener in `initialize` function.

```js
//views/app.js

session: {
    counterText: ['string', true, 'You have 0 delicious gifs!']
},
initialize: function () {
    this.listenTo(this.gifs, 'add remove', this.handleGifsUpdates);
    this.handleGifsUpdates();
},
handleGifsUpdates: function () {
    var pluralize = (this.gifs.length !== 1) ? 's' : '';
    var text = 'You have ' + this.gifs.length + ' delicious gif' + pluralize + '!';
    this.set('counterText', text);
}
```

Finally we'll add new binding for `model.counterText` of type `text` and hook `counter` to the app view so the data can be displayed.


### Forms validation

To generate this form, we need to introduce 2 new modules and some Lo-dash functions here:

```js
var _ = {
    pluck: require('lodash.pluck'),
    max: require('lodash.max')
};
var AmpersandFormView = require('ampersand-form-view');
var AmpersandInputView = require('ampersand-input-view');
```

and add our `renderForm` function to the main `render` function, directly under collection render.

```js
// views/gifs.js

renderForm: function () {
    var inputView = new AmpersandInputView({
        name: 'src',
        placeholder: 'Where\'s this lovely gif\'s url?',
        tests: [
            function (val) {
                var emailRegexp = /^https?:\/\/.+\.[A-Za-z]{2,}.+\.(gif|jpe?g|png)$/;

                if (!emailRegexp.test(val)) {
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
```

By creating forms this way, we're able to handle things like validation and requirements automatically.
Ampersand Form View takes an element in which it should be placed in, submitCallback which'll expose you all form data if it passes validation and array of fields that should be rendered.
There're all kind of inputs, which you can read about it docs.
By using very simple regexp (it's not perfect url regexp) we can curate links that user is able to use to make sure it'll work for us.
In addition to that, we'll check whether user already stored given gif already and if yes, they we'll ask him whether he's sure that he wants to store it again.
