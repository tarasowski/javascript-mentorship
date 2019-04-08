'use strict'

// Object Composition: Concatention

// Is the most common type of object compositon or inheritance in JS.
// It's an alternative to class inheritance (not the only way to structure applications)
// If you think about object, not as just thing that encapsulate state and have polymorphism. In JS we treat data and functions in the same way.

// We can treat the object as bags of data -> in JS

// What is Concatentation?

// When an object is formed by adding new properties to an existing object. In many cases we mutate the original object, we mutate in order to stay immutable 

// Examples of Concatentation

// Anything that takes a state and add a property to a state
// Functional mixins are building an object by concatinating the object and pass that object to the next mixin

// When to use?

// Any time it would be useful to progressively assemble data structures at runtime, e.g. merging JSON objects, hydrating applicaiton state from multiple sources, creating updates to immutable state (by merging previous state with new data)

// Considerations

// Think in terms concatenating data more than concatenating behaviors. 
// A better use case for concatenation is to concatenate data then assembling behaviors (functional mixins). 
// An application state is like a database and operations are more like transactions to my state. 
// Tend to think of this to compile data together. Usually better for data than behaviors.
// Avoid hard implicit dependencies on each other such as in the example of Task() (functional mixin). 

// concatenate reducer

const concatenate = (a, o) => ({ ...a, ...o })

const objs = [
    { a: 'a' }, // still retain its own identity that we always can back out = aggregation
    { b: 'b' },
    { c: 'c' },
]

const c = objs.reduce(concatenate, {})


console.log(
    c
)
// { a: 'a', b: 'b', c: 'c' } // they don't reatin their own identity, it's like a soup, you mixed everything into one object (container)

// They key difference between aggreagtion and concatenation. In aggregation we can still get an object get out, in concatenation it's like a soup, you cannot get the original objects back out.
