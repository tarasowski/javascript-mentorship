# Functors & Categories

[Source](https://medium.com/javascript-scene/functors-categories-61e031bac53f)

* A functor data type is something you can map over. It's a container which has an interface which can be used to apply a function to the values inside it.

* Functor type are typically represented as an object with a `.map()` method that maps from inputs to outputs while preserving structure.

* Preserving structure means that the return value is the same type of functor

* An array is a good example of a functor, but many other kind of objects can be mapped over as well, including promises, streams, trees, objects

* JavaScript built in array and promise objects act like functors

* For collections / complex data structures (arrays, streams) `.map()` typically iterates over the collection and applies the given function to each value in the collection, but not all functors iterate. **Functors are about applying a function in a specific context.

**Note:** Promises use the name `.then()`instead of `.map()`. You can usually think of `.then()`as an asynchronous `.map()`method, except when you have a nested promise, **in which case it automatically unwraps the outer promise.**. For values that are not promises `.then()` acts like an async `.map()`. For values that are promises themselves, `.then()` acts like the `.chain()` method from monads (also calles `.bind()` or `.flatMap()`)

* Functor Laws:
	- Identity: x => x if you pass it into a `f.map()` where `f` is any functor, the rsult shold be equivalent to `f`
	- Composition: Functor must obey the composition law: F.map(x => f(g(x))) is equivalent to F.map(g).map(f)

**Note:** Function composition is the application of one function to the result of another.

* Foundation of Category Theory:
	- A category is a collection of objects and arrows between objects (where "object" can mean literally anything)
	- Arrows are known as morphisms. Morphisms can be thought of and represented in code as functions
	- For any group of connected object, a -> b -> c, there must be a composition which goes directly from a -> c
	- All arrows can be represented as compositions (even if it's just a composition with the object's identity arrow). All object in a category have identtiy arrows.

* Composition is associative. Basically that means that when you#re composing multiple functions (morphism), you don't need parenthesis:
	- h . (g . f) = (h . g) . f = h . g . f

```js
const F = [1, 2, 3]
```

```js
F.map(x => f(g(x)))
// is equivalent to
F.map(g).map(f)
```
## Endofunctor

* An endofunctor is a functor that maps for a category back to the same category.

* A functor can map from category to category: `X -> Y`

* An endofunctor maps from a category to the same category: `X -> X` -> A monad is an endofunctor

```js
const Identity = value => ({
map: fn => Identity(fn(value))
})

// As you can see it satisfies the functor laws:

// Identity law

const u = Identity(2)
u.map(x => x).map(x => (console.log(x), x)) // 2

const f = n => n + 1
const g = n => n * 2

// Composition law

const r1 = u.map(x => f(g(x)))
const r2 = u.map(g).map(f)

r1.map(x => (console.log(x), x)) // 5
r2.map(x => (console.log(x), x)) // 5
```
* Now you can map over any data type just like you can map over an array.

```js
// Fold function to get the value out of the Functor

const Identity = value => ({
	map: fn => Identity(fn(value)),
	fold: () => value
})
```

```js
// Full version

const Identity = value => ({
map: fn => Identity(fn(value)),
valueof: () => value,
toString: () => `Identity(${value})`,
[Symbol.iterator]: function* () {yield value},
constructor: Identity
})

Object.assign(Identity, {
	toString: () => 'Identity',
	is: x => typeof x.map === 'function'
})

```
* Functors are things we can map over. More specifically, a functor is a mapping form category to category. A functor can even map from a category back to the same category (endofunctor).

* A category is collection of objects, with arrows between objects. Arrows represent morphisms (aka functions, aka compositions). Each object in a category has an identity morphism (x => x). For any chain of objects `A -> B -> C`there must exist a composition `A -> C`. 

* Functors are great higher-order abstractions that allows you to create a variety of generic functions that will work for any data type.

* Abstraction hide things. Abstraction are good to create re-usable / generic solutions that can be applied to an instance of the specific problem


