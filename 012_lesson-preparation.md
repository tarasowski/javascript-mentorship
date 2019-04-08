# TDD the RITE Way
[Source](https://medium.com/javascript-scene/tdd-the-rite-way-53c9b46f45e3)

* Important: Checkout this video from [Dan Abramov](https://egghead.io/lessons/react-redux-writing-a-todo-list-reducer-adding-a-todo) he shows how to do it right.

1. Start with a function e.g. `const double = x => {}`
2. Write a test to prove the requirements e.g. `const testDouble = before => after => expect(before).toEqual(after)`
3. What the test fail. This proves that the test won't produce a false positive e.g. `testDouble(1)(2)`
4. Add the implementation code e.g. `const double = x => x * 2`
5. Watch the test pass -> run the test again and see it working!
6. Look over the code and improve -> do some refactoring if needed

## TDD the RITE Way
  - Redable: Every tests shold be readable: 
    1. What component is under test? `double() should double the numbers` -> here you see that `double()` is under test
    2. What was the actual result?
    3. What was the expected result?
    4. How do you reproduce the findings?

  - Isolated: Isolated components means that we're testing a unit of code (think module) in isolation from other parts of the system. You tests them in a black box interface level.
      - Tests should be isolated from each other. In unit tests, units should be isolted from the rest of the app. Integration tests - test that modules work correctly with other modules and in the context of the running. 
    1. Unit tests should run fast to provide needed developer feedback. Because they need to run fast, they should not depend on the network, access to storage etc.
    2. Be deterministic: Given the same component with the same input, the test should always produce the same result. 

> The black box has only one-way communcation: Something goes in (arguments), and something comes out (a return value). Your tests should not care what happens between.

* If your components have side-effects, you should usually forget about unit-tests, instead rely on functional or integration tests. Why?
  1. **Tests are no longer deterministic**, meaning that test can break even when the code works properly. Unit tests should never break for those reasons.
  2. **Unit testing code with side-effects requires mocking.** Attempting to isolate tightly coupled code from non-deterministic processes requires lots of mocking. **Mocking is code smell**

> Isolate side-effects from business logic and you'll find not only that your software becomes easier to test, but also to debug, easier to extend, and easier to maintain.

  - Thorough: You should test all of the likey edge cases. (Error states, malicious data (e.g. you can verfiy the structure with the JSONSchema), numbers, test0, 1, very large, very small)
  - Explicit: Your unit test should contain everything you need to know to reproduce the results. Avoid magic. Avoid references to shared state - especially shared mutable state



# JavaScript Monads Made Simple

[Source](https://medium.com/javascript-scene/javascript-monads-made-simple-7856be57bfe8)

* Remember, the essence of software development is composition, and monads make composition easier. Another look at Monads are:
    - Function map: `a => b`which lets you compose functions of type `a => b`
    - Functor map with context: `Functor(a) => Functor(b)`, which lets you compose functions `F(a) => F(b)`
    - Monads flatten and map with context: `Monad(Monad(a)) => Monad(b)`, which lets you compose lifting functions `a => F(b)`

* Functions help you reak down complex problems into simple problems that are easier to solve in isolation, so that you can compose them in various ways to form your application. 

* Function composition creates function pipelines that your data flows through. You put some input in the first stage of the pipeline, and some data pops out of the last stage of the pipeline, transformed. **But for that to work, each of the pipeline must be expecting the data type that the previous stage returns.

* Simple function composition
```
g: a => b
f: b => c
h = f(g(a)): a => c
```

* Functor function composition
```
g: F(a) => F(b)
f: F(b) => F(c)
h = f(g(a)): F(a) => F(c)
```

* Function composition of `a => F(b)`, `b => F(c)` with monads. If you lift a value into different type.
```
// Let's swap the F() for M() to make it clear
g: a => M(b)
f: b => M(c)
h = composeM(f, g): a => M(c)
```
* In the example above, the component function types don't line up. For `f`'s input, we wanted type `b`, but what we got was type `M(b)`(a monad of `b`). Because of that misalignment, `composeM()`needs to unwrap the `M(b)`that `g` returns so we can pass it to `f`, because `f` is expecting type `b`, not type `M(b)`. The process (often called `.bind()` or `.chain()`) is where flatten and map happen.

* It wraps the `b` from `M(b)` before passing it to the next function, which leads to this:

```
g: a => M(b) flattens to => b
f: b maps to => M(c)
h = composeM(f, g): a => M(c)
```

* Monads make the types line up lifting functions `a => M(b)`, so that you can compose them

* In the above example, the `flatten` from `M(b) => b`and the map from `b => M(c)`happens inside the `chain`form `a => M(c)`. The `chain`invocation is handled inside `composeM()`. At a higher level, you don't have to worry about it. You can just compose monad-returning functions using the same kind of API.

> Monads are needed because lots of function aren't simple mappings from `a => b`. Some functions need to deal with side effects (promises, streams), handle branching (Maybe), deal with exceptions (Either)

* Remember the essence of monads:
    * Function map: `a => b`
    * Functors map with context: `Functor(a) => Functor(b)`
    * Monads flatten and map with context: `Monad(Monad(a)) => Monad(b)`

> A monad is based on simple symmetry - A way to wrap a value into a context, and a way to unwrap the value from the context. 

* **Lift/Unit**: A type lift from some type into the moand context: `a => M(a)``
* **Flatten/Join**: Unwrappint the type from the context: `M(a) => a`
* **Map**: Map with context preserved: `M(a) => M(b)``

* Combine flatten with map, and you get chain - function composition for monad-lifting functions, aka Kleisli composition, named after Heinrich Kleisli.

* **FlatMap/Chain**: Flatten + map: `M(M(a)) => M(b)`

* The lift is the factory/constructor and / or `constructor.of()`method. In category theory, it's called "unit". All it does is lift the type into the context of the moand. It turns an `a`into a `Monad` of `a`

* The unwrapping part is also where the weird stuff like side effects, error branching, or waiting for async I/O typicall hides. In all software develpment, composition is where all the real interesting stuff happens.

* For example, with promises `.chain()`called `.then()`. Calling `promise.then(f)`won't invoke `f()` right away. Instead, it will wait for the promise to resolve, and then call `f()`. 

> You may have heard that a promise is not strictly a monad. That's because it will only unwrap the outer promise if the value is a promise to begin with. Otherwise, `.then()` behaves like `.map()`

* **Note:** But because it behaves differently for pomise values and other values, `.then()`does not strictly obey all the mathematical laws that all functors and /or monads must satisfy for all given values.

> Whenever you have a function that takes some data, hits an API, and returns a corresponsind value, and other function that takes that data, hits another API, and returns the result of a computation on that data, you'll want to compose functions of type `a => Monad(b)`. Because the API calls are asynchronous, you'll need to wrap values in something like a promise or obeservalbe. In other words, the signatures for those functions are `a -> Monad(b)`, and `b -> Monad(c)`, respectively.

```js
{
    const composePromises = (...ms) =>
        ms.reduce((f, g) => x => g(x).then(f))

    const g = n => Promise.resolve(n + 1)
    const f = n => Promise.resolve(n * 2)
    const h = composePromises(f, g)
    h(20).then(console.log) // 42
}
```
* When you hit the second function `f`, (remember `f`after `g`), the input value is a promise. It's not type `b`, it's type `Promise(b)`, but f takes type `b`, unwrapped. So what's going on? Inside `.then()`there's an unwrapping process that goes from `Promise(b) -> b`. That operation is called `join` or `flatten()`. 
