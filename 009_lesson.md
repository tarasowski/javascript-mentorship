```js
/*
Factory vs Constructor

What is a factory?
Returns an object without `new`

What does `new` do?
1. Instantiates the new object and binds `this` to it.
2. binds instance.__proto__ to Constructor.prototype
3. binds instance.__proto__.constructor to Constructor
4. implicitly returns `this`

What does this have to do with `instanceof`?

How does `instanceof` work?

`instanceof` lies. What does that mean?

False negatives. Prototype link could change. Constructor.prototype could change, or instance.__proto__ could change. Either could create false negtavies or false positives.

`instanceof` fails across iframes (or anything that creates a new memory realm): why?
*/

/*
What is a functional mixin?

Create composite objects without base classes or class inheritance.

Problems with functional mixins:
* Can create class hierarchies if you think in terms of is-a thinking instead of composing from multiple indendent sources
* Implicit dependencies - a functional mixin that depends on the presence of another functional mixin.
* Potential for clashing functional mixins (e.g., key collisions, dependencies on specific behaviors or object structure)

Alternatives:
Regular module imports
Small, pure functions

Good use-cases:
* Build up and compose composite data structures (useful for reducers, application state transitions, etc.) - alternatively, try lenses
* Attaching derived generic methods (map, flatMap, etc.) to data structures
*/

// robot
// greet
// wave
// backflip

const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x)

const withGreet = o => 
	Object.assign(o, {
      greet: name => console.log('Hello, ' + name)
    })

const withWave = o =>
	Object.assign(o, {
    wave: () => console.log('Robot waves')
    })

const withBackflip = o =>
	Object.assign(o, {
    backflip: () => console.log('Robot backflips. Wow!')
    })


const myBot = () => compose(
  withGreet,
  withWave,
  withBackflip
)({});

console.log(
  myBot().greet('Dimitri'), // 'Hello, Dimitri!'
  myBot().wave(),           //  'Robot waves'
  myBot().backflip()       // 'Robot backflips. Wow!'
);
