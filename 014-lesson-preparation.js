const {expect} = require('expect.equal')
const {trace} = require('compose.helpers')

const Identity = x => ({
  map: f => Identity(f(x)),
  chain: f => f(x),
  toString: () => `Identity(${x})`
})

Identity.of = Identity
{
// Identity law
const ii = Identity.of(10).map(x => x).toString()

console.log(ii)

// Composition law
const g = n => n + 1
const f = n => n * 2 
const ia = Identity.of(10).map(g).map(f).toString()
const ib = Identity.of(10).map(x => f(g(x))).toString()
console.log(ia, ib)

// Identity law w/ Promises
Promise.resolve(20).then(x => x).then(x => console.log(x))

// Composition law w/ Promises
const a = Promise.resolve(10).then(g).then(f)
const b = Promise.resolve(10).then(x => f(g(x)))

Promise.all([a, b]).then(([a, b]) => console.log(a, b))
}
/*

- A monad is a way of composing function that require context in addition to the return value, such as computation, branching, or I/O. 
- Monads type lift, flatten and map so that the types line up for lifting functison a => M(b) making them composable
- Its mapping from type `a` to some type `b`along with some computational context

* Functions map: a => b (a function maps some arguments of type a to results of another type b)
* Functors mpa with context: F(a) => F(b) (e.g. Identity with a map method)
* Monads flatten and map with context: Monad(Monad(a)) => Monad(b)

- Context is the computational detail of the monad's composition (including lift, flatten, and map).
  - The Functor/Monad API and its working supply the context wich allows you to compose the monads with the rest of the application.
  - The point of Functors/Monads is to abstract that context away so we don#t have to worry about it while we're composing things.
  - Mapping inside the context means that you apply a function from a => b to the value inside the context, and return a new value b wrapped inside the same kind of context.

- Type lift means to lift a type into a context, blessing the value with an API that you can use to compuse from that value, trigger contextual computations a => F(a)

- Flatten means unwrap the value from the context F(a) => a

*/
{
const g = n => n + 1
const f = n => n * 2 
const x = 20 // Some data of type a
const h = n => n * 2 // A function from `a` to `b`
const arr = Array.of(x) // The type lift
const result = arr.map(f) // [40]

expect(result).toEqual([40], 'result -> should lift a value into a context of an array and apply a function `f`')
}

// The essence of moand

/*
- What are monads?
  - Functions map: a -> b which lets you compose functions of type `a -> b`
  - Functors map with context: Functor(a) -> Functor(b), which lets you compose function F(a) -> F(b)
  - Monads flatten adn map with context: Monad(Monad(a)) -> Monad(b), which lets you compose lifting functions a -> F(b)
**Note:** These are all just different ways of expressing function composition. The whole reson function exists is you can compose them. 
- Monads help us to preserve function composition. Because in a function composition you are working with a pipeline. But for that to work, each stage of the pipeline must be expecting the data type that the previous stage returns.
*/

// Composing pure functions
{
// g :: a -> b
const g = n => n + 2

// g :: b -> c
const f = n => n * 2

// h :: a -> c
const h = n => f(g(n))

expect(h(20)).toEqual(44, 'h() -> should return a result form a to c')
}

// Composing functors
{
const g = n => Identity.of(n + 2)
const f = f => f.map(n => n * 2)
const h = n => f(g(n)).map(n => n * 50)  

console.log(
h(200).toString()
)
}

// Composing different types

/*
- If you want to compose functions from a -> F(b), b -> F(c), and so on, you need monads. 

g:  a => M(b)
f:    b => M(c)
h = composeM(f, g): a => M(c)

- In this example, the component function types don't line up! For f's input we wanted type b, but what we got was type M(b) (a monad of b)
- In order to compose them together you need to unwrap b from M(b). Monads make the types line up for lifting functions a -> M(b), so that you can compose them

g: a -> M(b) flattens to -> b
f:  b maps to -> M(c)
h composeM(f, g):
  a flaten(M(b)) -> b -> map(b -> M(c)) -> M(c)

- Monads are needed because lots of functions aren't simple mapping from a -> b. Some functions need to deal with side effects (promises, streams), ahndle branching (Maybe), deal with expections (Either). Basically if you want to compose functions of different types you need Monads. Monad is a function that has a chain method. A Monad can be anything e.g. a Promise when we want to compose Promises.
*/

{
  // Identity monad
  const Id = value => ({
    // Functor mapping
    // Preserve the wraping for .map() by
    // passing the mapped value into the type lift:
    map: f => Id.of(f(value)),

    // Monad chaining
    // Discard one level of wrapping
    // by omitting the .of() type lift:
    chain: f => f(value),

    // Just a convenient way to inspect 
    // the values
    toString: () => `Id(${value})`

    })

    // The type lift for this monad is just 
    // a reference to the factory.
    Id.of = Id

    const g = n => Id(n + 1)
    const f = n => Id(n * 2)

    // Left identity
    // unit(x).chain(f) === f(x)
    trace('Id monad left identity')([
      Id(20).chain(f).toString(),
      f(20).toString()
    ])
    // Right identity
    // m.chain(unit) === m
    trace('Id monad right identity')([
    Id(20).chain(Id.of).toString(),
    Id(20).toString()
    ])
    //Associativity
    // m.chain(f).chain(g) ===
    // m.chain(x => f(x).chain(g))
    trace('Id monad associativity')([
    Id(20).chain(g).chain(f).toString(),
    Id(20).chain(x => g(x).chain(f)).toString()
    ])
}

// Monad laws
/*
- Monads must satisfy three laws (axioms) -> monad laws:
  * Left identity: unit(x).chain(f) === f(x)
  * Right identity: m.chain(unit) === m
  * Associativity: m.chain(f).chain(g) === m.chain(x => f(x).chain(g))

// Conclusion
/*
- Functors are things you can map over. Monads are things you can flatMap over:
  * Functions map: a -> b
  * Functors map with context: Functor(a) -> Functor(b)
  * Monads flatten and map with context: Monad(Monad(a)) -> Monad(b)
- A monad is based on simply symmetry - A way to wrap a value into a context, and a way to unwrap the value from the context:
  * Lift/Unit: A type lift from some type into the monad context: a -> M(a)
  * Flatten/Join: Unwrapping the type from the context: M(a) -> a
  * Map: Map with context preserved: M(a) -> M(b)
  * Chain: Combine flatten with map, and you get chain - function composition for lifting functions, aka Kleisli composition M(M(a)) -> M(b)
*/
