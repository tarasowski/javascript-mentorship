// Pure functions to view and set which can be used with any lens:
const view = (lens, store) => lens.view(store);
const set = (lens, value, store) => lens.set(value, store);


// A function which takes a prop, and returns naive
// lens accessors for that prop.
const lensProp = prop => ({
  view: store => store[prop],
  // This is very naive, because it only works for objects:
  set: (value, store) => ({
    ...store,
    [prop]: value
  })
});

/*
What is a lens?
A getter and setter pair.

Why do we care about lenses?
* Decouple your code from state shape, in order to avoid state shape depenedencies.
* Lens setters are pure - don't mutate the original.

Cool features
Lenses are composable. Composing the lens functions gives you a composed lens path focus.

const pathLens = compose(
a,
b,
c
)


Core principle (really important in every language, every framework):
A small change in requirements should require only a small change in implementation.


The idea of this abstraction has existed since the 1960's when database researchers started experimenting with stored queries (views). SICP getter/setter pairs (1984/83).


What are the lens laws?

view after set a = a
set b after set a = set b
view then set the view = store


What is over?

Over is the map operation for a lens. Apply the function to the focus of the lens. Over should obey the functor laws.

* Identity
* Composition

*/
