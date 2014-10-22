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

