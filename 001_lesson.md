# Introduction to Functional Programming

[Source](https://medium.com/javascript-scene/a-functional-programmers-introduction-to-javascript-composing-software-d670d14ede30)

* Expression is a chunk of code that evaluates to a value `7 + 5``
* The value of an expressions can be given a name `const sum`. The expression is evaluated first and the resulting value is assigned to the name.
* By default use `const` keyword. A variable declared with the `const` cannot be re-assigned
* Object can easily be composed together:

```js
const a = 'a'
const oA = {a}
const b = 'b'
const oB = {b}

const c {...oA, ....oB} // c = {a: 'a', b: 'b'}
``` 

**Note:** Those dots are the object spread operators. It iterates over the properties of oA and assigns them to the new object, then does the same for oB,overriding any keys that already exist on the new object. 

> Mutation an object rather than creating a new object is usually a bug. 

* A signature consists of 3 parts:
1. An optional function name
2. A list of parameter types in parenthesis
3. The type of the return value

```ts
// signature dummy
functionName(param1: Type, param2: Type) => Type
// real example
double(x: n) => Number
```

* A function can have default parameter values `const f = (n = 0) => n`

```js
const createUser = ({
	name = 'Anonymous',
  	avatar = '/avatar-face.jpg'
}) => ({
	name,
  	avatar
})

const george = createUser({name: 'George', avatar: 'face.jpg'})
``` 

* Rest and Spread Operators

```js
const aTail = (head, ...tail) => tail
aTail(1, 2, 3) // [2, 3]
``` 

**Note:** Rest gathers individual element into an array. Spread does the opposite!

```js
const shiftToLast = (head, ...tail) => [...tail, head]
shiftToLast(1, 2, 3) // [2, 3, 1]
``` 

> Function composition is central to functional programming.

# Composing Software: An Introduction

[Source](https://medium.com/javascript-scene/composing-software-an-introduction-27b72500d6ea)

> Composition of simple parts forms a solution for a complex problem. 

* If you call two methods in a sequence, you're composing using `this` as input data.

> If you are chaining, you are composing!

```js
const g = n => n + 1
const f = n => n * 2
const doStuffBetter = x => f(g(x))
doStuffBetter(20)
``` 

* Instead of `console.log()` use `trace()``

```js
const trace = label => value => {
    console.log(`${label}: ${value}`)
    return value
}

const doStuff = x => {
    const afterG = g(x)
    trace('after g')(afterG)
    const afterF = f(afterG)
    trace('after f')(afterF)
    return afterF
}

doStuff(20); // =>
/*
"after g: 21"
"after f: 42"
*/

``` 

* The example above can be written with the `pipe()` function. Which is a better way to do function composition

```js
const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x)
```
* If you use `pipe()` you don't need intermediary variables. Writing funciton without mention of the arguments is called **point free style**. To do it you call a function that returns the new function, rather than declaring the function explicitly.

```js
const simpleValue = value => value
const multiplyByTwo = value => value * 2
const multiplyByThree = value => value * 3

const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x)

const doStuff = pipe(simpleValue, multiplyByTwo, multiplyByThree)
console.log('comes from doStuff', doStuff(20))
``` 

* Using pipe helps us better to remember things, since human memory is limited, we need to use as few arguments as possible.

> Uncle Bob (Robert C. Martin), in the Clean Code book, explains that an ideal argument’s number for a function is zero (niladic function). Followed by one (monadic function) and closely by two arguments (dyadic function). Functions with three arguments (triadic function) should be avoided if possible. More than three arguments (polyadic function) are only for very specific cases and then shouldn’t be used anyway. [Source](https://www.matheus.ro/2018/01/29/clean-code-avoid-many-arguments-functions/)

* Any time you build any non-primitive data structure, you are performing some kind of object composition.

> “Favor object composition over class inheritance”. means that you should form composite objects from small component parts, rather than inheriting all properties from an ancestor in a class hierarchy.

* The most common form of object composition in JavaScript is known as **object concatenation** (aka mixin composition). It works like ice cream. You start with an object (like vanilla ice cream), and then mix in the features you want.

* In the example below we are building composites with class inheritance:

```js
class Foo {
    constructor() {
        this.a = 'a'
    }
}
class Bar extends Foo {
    constructor() {
        super(options)
        this.b = 'b'
    }
}

const myBar = new Bar() // {a: 'a', b: 'b'}
``` 

* In the example below we are building composites with mixin composition

```js
const a = {
    a: 'a'
}
const b = {
    b: 'b'
}
const c = {...a, ...b} // {a: 'a', b: 'b'}
``` 

> No matter how you write software, you should compose it well.

* Spread operator example:

```js
const numbers = [1, 2, 3]

const adder = (value1, value2, value3) => value1 + value2 + value3

console.log(adder('getting back the values: ', ...numbers))
``` 

# Function Composition

[Source](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-function-composition-20dfb109a1a0)

* Using an example with `trace()` in order isolate side effects, since the function `trace()` returns another function. So side-effects!

```js
const toSlug = pipe(
  trace('input'),
  split(' '),
  map(toLowerCase),
  trace('after map'),
  join('-'),
  encodeURIComponent
);

console.log(toSlug('JS Cheerleader'));
// '== input:  JS Cheerleader'
// '== after map:  js,cheerleader'
// 'js-cheerleader'
``` 
# Notes from the Live Session
```js
console.clear();

// Functions

//  input -> [ f(x) = 2x ] -> output

// double = n => Number
const double = n => n * 2;

// add = a => b => Number
/* What is a curried function?
A curried function is a function that takes multiple parameters one at a time by producing a series of functions which take exactly one parameter each, and returning the completed application from the last function.
*/
const add = a => b => a + b;

// partial application
/*
A function which has already been applied to some of its parameters (but not yet all of them).
*/

// inc = n => Number (add 1 to any number)
/* point-free style
A function that is defined without reference to its arguments.

No =>
No function keyword
No Function() constructor tricks.
*/
const inc = add(1);
const inc10 = add(10);
const inc100 = add(100);

/*
What is a closure?
*/

console.log(
  inc(2), // 3
  inc(4), // 5
  inc10(10), // 20
  inc100(10), // 110
  inc(6) // 7
);

const counter = (value = 0) => ({
  inc: () => value++,
  valueOf: () => value
});

const count1 = counter();

console.log(
  +count1.inc(),
  +count1.inc(),
  +count1.inc(),
);


/*
Shared mutable state is the root of all evil.

shared mutable state + concurrency = non-determinism

For business logic, favor pure functions.
*/

/*
What is a pure function?

Given the same input, will always return the same output.

No side-effects.

What are side-effects?

Any mutation of externally observable state, other than the function's return value.

* I/O
  - database/server/network/console/screen/disk
* Mutating any mutable arguments

* Throwing errors/exceptions
  - instead of throwing errors, you could return a monad
    e.g., a promise.
*/
```
