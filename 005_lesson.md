# Unit Testing Redux Reducers

```js
const ADD_VALUE = 'ADD_VALUE'

const summingReducer = (state = 0, action = {}) => {
    const { type, payload } = action

    switch (type) {
        case ADD_VALUE:
            return state + payload.value
        default: return state
    }
}

const actions = [
    { type: 'ADD_VALUE', payload: { value: 1 } },
    { type: 'ADD_VALUE', payload: { value: 1 } },
    { type: 'ADD_VALUE', payload: { value: 1 } },
]

const test = actions.reduce(summingReducer, 0)
console.log(
    test
)
```



```js
/*
Curried function
A function with multiple arguments which takes arguments _one at a time_ by returning a series of functions which each take the next argument until the application is complete.

Partial application
All curried functions return partial applications, but not all partial applications are the result of curried functions.

A function which takes multiple paramaters which has already been applied to some (but not yet all) of its arguments.
*/

// Partial application without curry
const add = (a, b) => (c, d) => a + b + c + d;

// halfAdded is the partial application
// a partial application is simply a partially
// applied function.
const halfAdded = add(1, 2);


/*
Point-free
The definition of a function without reference to its arguments.
*/

// compose
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x)

// pipe
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)

const g = n => n + 1;
const f = n => n * 2;

const h = compose(f, g);

console.log(h(20));

/*
Function composition
A function applied to the return value of another function.
f(g(x))
*/

/*
Higher order function
Take a function, return a function, or both.

Examples:
Curried functions
Map, filter, reduce, etc.

Why?
* Allow higher-lever abstractions (how to build: step-by-step)
* Allow more declarative code (what to build: describes structure/relationships between things)
* Declarative code - easier to change implementation details, including things like the underlying data structures and transport mechanisms

Abstract away from concrete data structures and data types.

*/


/* 
Client-performance killers:
* Network access
* Disk access (saving/loading local data)
* Renders (16ms window for blocking operations in a render)
*/

/*
What is reduce?
Higher order function that can combine multiple items into one item.

* folds/sums/products

reduce/reduceRight reduceLeft/reduceRight, foldL/foldR

Reducer signature:
(a, c) => a
*/

// map = f => foldable => Any
const map = f => data => data.reduce((a, c) => a.concat([f(c)]), []);

const arr = [1, 2, 3];
const double = x => x * 2;
const doubleMap = map(double);

console.log(
  doubleMap(arr) // [2,4,6]
)


// asyncPipe
const asyncPipe = (...fns) => x => fns.reduce(async (y, f) => f(await y), x);

{
  const f = n => Promise.resolve(n + 1);
  const g = n => Promise.resolve(n * 2);
  const h = asyncPipe(f, g);
  
  h(20).then(x => console.log(x));
}
```
