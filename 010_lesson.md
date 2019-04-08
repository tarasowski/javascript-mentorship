```js
console.clear();

/*
Functions as procedures
vs
Describing structure -
Functions as mappings/equalities
*/

// functions as mappings
const map = f => mappable => mappable.map(f);

// function as procedure
const doubleAll = arr => {
  const newArray = [];
  for (let i = 0; i < arr.length; i++) {
    newArray[i] = arr[i] * 2;
  }
  return newArray;
};



// String to Number
//A -> B
const length = a => [...a].length

/*
Category Theory
A String
B Number
C Boolean
* An object in category theory is a set. A set is a collection of objects (e.g. Number, String, Boolean)
* Objects and arrows (called morphisms) between objects
* Identity: ID_A = A -> A
* Composition: A -> B -> C. A -> C
  - Assiativity: (f . g) . h = f . g . h = f . (g . h)
*/

/*
Object Composition

What is an object?

A composite datatype consisting of primitive data types and/or other objects.

What is object composition?

The act of composing objects (and/or primitive values) to produce a composite object. P.S. All objects are composites, so by extension, all object creation is composition.


What is class inheritance?

Creates parent/child is-a relations where the child inherits every property of the base class. Class inheritance is a form of composition, however, it leads you conceptually away from the idea of assembling smaller parts to form a larger whole, and towards the idea of creating is-a relations where the child gets everything from a single, monolithic source.

"Favor composition over class inheritance" means that you should think in terms of assembling smaller pieces rather than inheriting everything from a single monolith.


Types of object compositon:

* Aggregation
* Concatenation
* Delegation

## What is Aggregation?

An object which is made up of an enumerable collection of contained objects which each retain their own identity.

Examples:
* Graphs
* Trees
* Arrays

## Concatenation

Combining multiple objects into one such that the source objects do not retain their own identity. Instead, properties from each object are mixed-in to the new object.

Examples:
* Redux reducers can apply state changes by mixing new values into an existing state object
* Extending data structures with lose property definitions (like in a NoSQL database)

Counter examples:
* Accidental mutations of shared mutable state (mutating a delegate prototype used by other objects)


## Delegation

Forwarding (delegating) property lookup to another object.

*/

const createObject = value => ({
  __proto__: {
    constructor: createObject
  },
  toString: () => `createObject(${ value })`
});
createObject.of = createObject;

const empty = object => object.constructor.of();

const foo = createObject('foo');

console.log(empty([3]));
```
