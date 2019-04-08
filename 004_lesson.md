# Abstraction & Composition

* [Source](https://medium.com/javascript-scene/abstraction-composition-cb2849d5bdd6)

* Abstraction is about removing things. Abstration in Yiddish means `absentminded`a person is running on autopilot, not actively thinking about what they are doing.

> Abstration lets us run on autopilot. All software is automation. Anything you do on a computer, you could do with paper, ink and carrier pigeons. All software is abstration.

* We remove duplication by writing a component (function, module, class, etc..) giving it a name (identity), and reusing it as many times as we like.

**Note:** The process of decomposition is the process of abstraction. 

> Software solutions should be decomposable into their component parts, and recomposable into new solutions, whichout changing the internal component implementation details.

* Abstraction in software: algorithms, data structures, modules, classes, frameworks.

> Sometimes, the elegant implementationis just a function. Not a method. Not a class. Not a framework. Just a function.

* Functions are great for abstrations because they have:

- Identity: The ability to assign a name to it and reuse it in different contexts.
- Composition: The ability to compose simple functions to form more complex functions.


**Function composition**
```js
const add = a => b => a + b
const inc = add(1)
inc(3) // 4
```

* In the case above `inc` is just the specialized version of `add`. All curried functions are abstractions.

* `map()` is a higher order function that abstract the idea of appyling a function to each element of an array.

```js
const map = f => arr => arr.map(f)
```

* This verison of `map` takes the specializing function and then returns a specialized version of itself that takes the array to be processed.

```js
const f = n => n * 2
const doubleAll = map(f)
const doubled = doubleAll([1, 2, 3])
```

* Characteristics of good abstraction:

1. Simple
2. Concise
3. Reusable
4. Independent
5. Decomposable
6. Recomposable

# JavaScript Factory Functions vs Constructor Functions vs Classes

* [Source](https://medium.com/javascript-scene/javascript-factory-functions-vs-constructor-functions-vs-classes-2f22ceddf33e)

* In JavaScript, any function can return a new object. When it's not a constructur function or class, it's called a factory function.


**Factory function**
```js
const proto = {
drive() {
  console.log('Vroom!')
}
}

function factoryCar() {
  return Object.create(proto)
}
const car3 = factoryCar()
```

**Constructor (new Keyword)**
```js
function ConstructorCar() {
  ConstructorCar.prototype.drive = function () { console.log('Vroom!')}
}

const car2 = new ConstructorCar()
```

**Class (new Keyword)**
```js
class ClassCar {
  drive() {
  console.log('Vroom!')
  }
}

const car1 = new ClassCar()
```

* In Constructors & Class the `this` keyword refers to the new object. You need to use `new` to instantiate a class & constructor.

> The cool thing about factories is that they’re not just more powerful and more flexible, they’re also the easiest way to encourage entire teams, and entire API user bases to use patterns that are simple, flexible, and safe.

```js
const person = {
  isHuman: false,
  printIntroduction: function () {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  }
};

const me = Object.create(person);

me.name = "Matthew"; // "name" is a property set on "me", but not on "person"
me.isHuman = true; // inherited properties can be overwritten

me.printIntroduction();
```
# JavaScript Factory Functions with ES6+

[Source](https://medium.com/javascript-scene/javascript-factory-functions-with-es6-4d224591a8b1)

* A factory function is any function which is not a c lass or constructor that returns a object. In JavaScript, any function can return an object. When it does so without the new keyword, it's a factory function.

```js
const user = {
userName: 'echo',
avatar: 'echo.png'
}

const key = 'avatar'
console.log(user[key]) // echo.png
```
* You can access computed property names using square bracket notation.

```js
const userName = 'echo'
const avatar = 'echo.png'

cost user = {
  userName,
  avatar,
  setUserName (userName {
  this.userName = userName
  return this
  }
}

console.log(user.setUserName('Foo').userName) // 'Foo'
```

> `this` refers to the object which the method is called on.

* If you need to create many objects, you'll want to combine the power of object literals and factory functions. With a factory function, you can create as many user objects as you want.

```js
const createUser ({userName, avatar}) => ({}
  userName,
  avatar,
  setUserName (UserName) {
  this.userName = userName
  return this
  }
)

console.log(createuser({userName: 'echo', avatar: 'echo.png'})

/*
{
  "avatar": "echo.png",
  "userName": "echo",
  "setUserName": [Function setUserName]
}
*/
```

**Note:** Arrow functions `=>` have an implicit return feature, if the function body consists of a single expression, you can omit the return keyword: `() => 'foo'`. If you want to return object literals you need to use `() => ({name: 'Dimitri'})`. The parentheses force the braces to be interpreted as an expression to be evaluated, rather than a function body block.

* We can use computed property keys. In this example `arrToObj` takes an array consisting of a key7value pair (aka a tuple) and converts it into an object.

```js
const arrToObj = ([key, value]) => ({[key]: value})
console.log(arrToObj(['name', 'Dimitri']) // {'name': 'Dimitri'}
```
* Using default parameters, for documentation of expected interface for `createUser` factory.

```js
const createUser = ({
  userName = 'Anonymous',
  avatar = 'anon.png'
} = {}) => ({
userName,
avatar
})
```

> Factories are great at cranking out objects using a nice calling API.

**Note:** A mixin is a class that contains methods for use by other classes without having to be the parent class of those other classes.

```js
const withConstructor = constructor => o => ({
  __proto__: {},
  ...o
})

const withFlying = o => {
  let isFlying = false
  return {
  ...o,
  fly() {
    isFlying = true
    return this
  },
  land() {
    isFlying = false
    return this
  },
  isFyling: () => isFlying
  }
}

const withBattery = ({capacity}) => o => {
  let percentCharged = 100
  return {
    ...o,
    draw (percent) {
      const remaining = percentCharged - percent
      percentCharged = remaining > 0 ? remaining : 0
      return this
    },
    getCharge: () => percentCharged,
    getCapacity () {
      return capacity
    }
  }
}

const createDrone = ({capacity = '3000mAh'}) => pipe(
  withFyling,
  withBaterry({capacity}),
  withConstructor(createDrone)
)({})

const myDrone = createDrone({capacity: '5500mAh'})

console.log(`
  can fly:  ${ myDrone.fly().isFlying() === true }
  can land: ${ myDrone.land().isFlying() === false }
  battery capacity: ${ myDrone.getCapacity() }
  battery status: ${ myDrone.draw(50).getCharge() }%
  battery drained: ${ myDrone.draw(75).getCharge() }%
`);
console.log(`
  constructor linked: ${ myDrone.constructor === createDrone }
`);

```

* Composition is more of a way of thinking than a particular technique in code. You can accomplish it in many ways. Function composition is the easiest way to build it up from scratch, and factory functions are a simple way to wrap a friendly API around the implementation details.

> Sometimes, the elegant implementation is just a function. Not a method. Not a class. Not a framework. Just a function. Start with the simplest implementation, and move to more complex implementations only as required.

---
### `this` keyword

[Source](https://medium.freecodecamp.org/learn-es6-the-dope-way-part-ii-arrow-functions-and-the-this-keyword-381ac7a32881)

>  ‘this’, always references the owner of the function it is in! When it is inside of an object’s method — the function’s owner is the object. Thus the ‘this’ keyword is bound to the object. Yet when it is inside of a function, either stand alone or within another method, it will always refer to the window/global object.

```js
const standAloneFunc = function(){
  alert(this);
}

standAloneFunc(); // [object Window]
```

> Unlike a regular function, an arrow function does not bind this. Instead, this is bound lexically (i.e. this keeps its meaning from its original context). Basically from where the function was called.

```js
function Counter() {
  this.num = 0;
  this.timer = setInterval(function add() {
    this.num++;
    console.log(this.num);
  }, 1000);
}
var b = new Counter();
// NaN
// NaN
// NaN
// ...
```
* In the example above the console.log was called from the `setInterval()` function which is part of the global context, it means it's owned by the global context. It doesn't matter where it will be called inside an object etc.

```js
function Counter() {
  this.num = 0;
  this.timer = setInterval(() => {
    this.num++;
    console.log(this.num);
  }, 1000);
}
var b = new Counter();
// 1
// 2
// 3
// ...
```

* In the example above the `this` is bound to the object and it's called on the object, which means `this` is bound to the current object where it was called.

### Object Composition

#### What is OOP - why does it exists?

> OOP is programming using objects/classes as an atomic unit of composition. All programming is composition.

* OOP exists to avoid problems with shared mutable state.

* Imperative programming
* Structured programming - functions (callable procedures that you pass data to and return some data)

**The OOP tries to solve the following problems:**
* The biggest problem is shared mutable state (Global variables, DOM, console.log()) - if data can be changes its mutable state. Shared mutable state leads to raced conditions.

* Avoid shared state. The whole reason why objects exists it's pretty much the same what functional programming tries to solve. Those are two approaches to identical problem.

* Memory was expensive, they wanted to reuse existing code and existing memory. They used e.g. delegation to resuse the memory as well.

* The way the OOP accomplishes this goals is called 
1) Encapsulation and 
2) Message passing. Only the object can mutate its own state and if someone else wants to do that, it have to pass in a message and asking the object to change it's state. A method dispatching an action method in redux or triggering an event passing.

> We co-locate the data and the methods. And only methods can change it's data.

* If you are not doing Encapsulation and Message passing, you are not doing OOP.

3) Polymorphism - a single interface for many potential implementations. It makes it possible to have a composite object, which represents the access to that composite objects component objects, those components can be objects of different types and they share a single interface (usbstitution, LSP)

### What is an object?

* In JavaScript is object something that has key and values. It's association between a name and some values. In JavaScript we get the encapsulation from closure.

### What is object composition?

* As assembling or composing objects to get more complex behavior! ~ Gang of Four.

* There are lots of ways to compose objects, the way you choose will impact reusability of that code. 

### What is a composite object?

* In computer science a composite data type or compound data type is any data type which can be constructed in a program using the language primitive data types or other composite types. The act of creating those composite types in knows as composition ~ Wikipedia

* Primitive type e.g. String in JS in other languages String is a composite because it's a list of characters. In JavaScript String is a primitive

```js
// Primitive
const name = 'Echo'
const avatar = 'echo.png'

// composite
const user = {
name,
avatar,
}

console.log(user) // {name: 'Echo', avatar: 'echo.png'}
```
### Why favor object composition over class inheritance?

* Any object made of other objects is composite. And creation of those composite's is composition. 

* Class inheritance is different mindset in thinking, creates is-A relationship. Meaning if we have an existing class and we want to create a new class is one of these base-classt things. E.g. you have an animal as a base class - now we want to create a dog. It's natural way of thinking, because we classify things all the time. What our animals bood streams, eat food, grow and now you have to model a Robot dog?

* Given anough time and evolution, all single-ancestors taxonomies are eventually wrong for new use-cases. 

* You start with an employee and everyone is an ancesotor, but what if a contractor comes in. A constractor is not an employee, so the whole structure breaks down. 

* **Fragile base class problem** - class inheritance is the tightest form of coupling available in object oriented design. Imagine the constructor does some side-effect, in a new class we don't want to perform that side-effect. If we change the base class all other classes that inherit will all break.

* **Gorilla/Banana problem** - the problem with OOP is that they all have this emplicit environment that they carry with them. You wanted a bananna, but you have got a Gorilla holding a bananna and the whole jungle with it. Often we want to inherit a small piece of a class, feature of that class and not everything goes with it.

* **Duplication by necessity problem** - it says that we have a new use case and we want to change our base class, we cannot change the base class instead of change the base class we copy and paste it and make new class hierarchy. 

> Instead of creating this Is-A relationships there are other types of composition that don't create these class taxonomies/hierarchies of structure instead you can think of your behaviors as separate things and thing of them as features and we can bring them together as compositon, rather then inheriting the class. 

* If you think of this behaviors as features than your application gets a lot easier to reason about. A lot of flexible, less code, less error-prone. It's not about avoiding extends/Class keyword, the techniques don#t matter it's the way you think about relations between your objects. You can extend from a composite. 

* Instead of a class:

```
class Foo{
A,
B,
C
}

// instead of

class Bar extends Foo{}
```

* You can have independent features A, B, C. We take those individual features instead of inheriting from the base class `Foo`

```js
// compsite
const bar = {
  A,
  B,
  C
}

```

* If we want to change `A` we can create a new `AltA` and change it. Nothing has to change and other things that depend on A, we just made a new version of A (AltA) and used in our composition instead of inheriting from something and going back to modify the base class.

```
const bar = {
  AltA,
  B,
  C
}
```

* Class inheritance is a form of composition. In the example below we see that we are composing the class `Bar` with `Foo`. But we are doing it in different way and it creates another relationship. 

```
class Bar extends Foo {
  D
}
```
### Three differnt kinds of Composition

* Aggregation
* Concatenation
* Delegation

#### Object Composition: Aggregation

> When an object is formed from an enumerable collection of subobjects. In other wordds, **an object which contains other objects**. Each subobject retains its own reference identity, such that it could be destructured from the aggreation, if needed. Is a collection of objects.

* An example for enumberable collection of subobjects.
```js
const objs = [
  {a: 'a', b: 'ab'},
  {b: 'b'},
  {c: 'c', b: 'cb'}
]
```

* We can add an object, we can also remove an object, or extract an object out. Aggregates don't have to expose methods, but those objects have self-contained methods.

##### Examples

* Array in JS is an Object. Arrays in all languages are composed objects, or objects formed from other primitives.
* Maps
* Sets
* Graphs
* Trees
  - DOM nodes is aggregation, is an object that might contain child DOM nodes / children)
  - UI components (React component might contain other components - nested trees, etc...)
  
* All of the things are aggregations. Trees are aggregations of aggregations.

##### When to use

* Whenever there are collections of objects which need to share common operations. Any kind of iterable, stack, queue, state machine.

* Composite pattern: is when you want a single item and multiple items to be treated with the same interface. A single or multiple items shares the same interface. Can be used for any kind of nested UI, DOM component tree etc.

##### Considerations

* Aggregations make great unversal abstractions. Aggregations are basically collections and lot of operations you can use `map(), filter(), reduce()` etc. Makes it easier to operate on things. (Functors, Monads, etc...) 

* Some types of things that don't fit into a memory of a single aggregate. If all the subobjects can't fit in memory at the same time, consider streaming data. Consider straming the children instead of aggreting them into single object. 

> A stream is array spread out over time. A list/array spread out over time. You can start using it right away instead waiting till everything has completed.

* What is a reducer? An accumulator that takes some current value  in set or collection or whatever a transport mechanism is. It iterates over each item in the collection or stream and combines it with the accumulator. -> Universal transformation that can work with anything, all object composition can be expressed with reducers.

```js
const objs = [
  {a: 'a', b: 'ab'},
  {b: 'b'},
  {c: 'c', b: 'cb'}
]

const collection = (a, c) => a.concat([c])

objs.reduce(collection, [])
```
* Aggregation is useful if you want to apply an operation to everything in an aggregation. Everything in a collection. 

> A linked list is just a tree made of a list of values. The current value of the current node and then a link to the rest of the values. It's basically a tree structure where is has [value, next] -> [value, next] -> [value, next]

```js
// value [value, link] -> [value, link]
const pair = (a, b) => [b, a]

const l = objs.reduceRight(pair, [])

```

#### Object Composition: Concatentation

* We can treat our objects just as bags of data key/value pairs and we can treat those during the runtime and modify the shape of the data during the runtime. 

> When an object is formed by adding new properties to an existing object. 

* In a lot of cases we mutate the original object, we mutate in order to stay immutable. 

##### Examples

* jQuery plugins extend jQuery by cancatenating new methods to jQuery.fn. They add new features by concatenating to the object jQuery.fn (is a delegate)

* State reducers (Redux) anything that takes some state and stacks that property on that state an object.

* Functional mixins

##### When to use?

* The most common form of object composition and inheritance

> Any time it would be useful to progressively assemble data structures at runtime, e.g., merging JSON objects, hydrating application state from multiple sources, creating updates to immutable state (by merging previous state with new data, ) etc...

##### Considerations

* Think about concatenating data more than concatenating behaviors. 

* We have some data that represents our application, we need to update the data. That's the best use case for concatentation. The application state is like a database a separate thing of operation, and operations is more like transactions to the state. Compiling data together.

* Better for data than behaviors. 

```js
// concatenate recuder
const concatenate = (a, o) => ({...a, ...o})

const objs = [
  {a: 'a'},
    {b: 'b'},
    {c: 'c'}
]


console.log(objs.reduce(concatenate, {}))
```

* The key difference between aggregation and concatination. With aggregation we can still get the whole `{a: 'a'}` backout, in concatenation it gets mixed together like a soup, we can not extract the original object. 


#### Object Composition: Delegation

* What is delegation?

> Is when an object forwards or delegates to another object.

* In JavaScript we have prototype based object, it means in JS, each object has a prototype. When a prop is not found on the object, it look on the prototype. The prototype chain. Delegation is built on top of object delegation in JavaScript. 

##### Examples

* All of JS built-in types have a prototype that can be delegated to `[].map()` delegates to `Array.prototype.map()` `obj.hasOwnProperty()` delegates to `Object.prototype.hasOwnProperty()`

* jQuery plugins have a jQuery.fn has a prototype is a delegate prototype. 

##### When should we use?

* To conserve memory, every time there are a lot of instances of objects. 
* Dynamically update many instances. Anytime there are many instances of an object and you want update them all.

##### Considerations?

* Is commonly used to imitate the class inheritance in JavaScript. 

* Be careful not to model "Is-A" relationships.

* Props from delegates are non-enumarable (Object.keys() won't see them). If you want to be props enumerable, then delegation is not the right solution. 

* Delegation saves memory at the cost of lookup performance. 

* Differentiate between instance state and shared (delegate) state - shared mutable state is **usually** a bug. 

* ES6 classes can't create dynamic delegates (Babel seems to work, but don't rely on that)

```js
const delegate = (a, b) => Object.assign(Object.create(a), b)

const objs = [
  {a: 'a', b: 'ab'},
  {b: 'b'},
  {c: 'c', b: 'cb'}
]

const d = objs.reduceRight(delegate, {})

console.log(d)
```
---
[Source](https://medium.com/javascript-scene/master-the-javascript-interview-what-s-the-difference-between-class-prototypal-inheritance-e4cd0a7562e9)

* **Class inheritance:** a class is alike a blueprint - a description of the object to be created. Classes inherit from classes and create subclass relationships: hierarchical class taxonomies. Instances are typically instantiated via constructor functions with the `new`keyword. Classes as you may know them from languages like Java don#t technically exist in JavaScript. Constructor function are used, instead.

* **Prototypical Inheritance:** A prototype is a working object instance. Objects inherit directly for other objects. Instances are typically instantiated via factory functions, object literals, or `Object.create()`

```js
// Composition Example
const distortion = { distortion: 1 };
const volume = { volume: 1 };
const cabinet = { cabinet: 'maple' };
const lowCut = { lowCut: 1 };
const inputLevel = { inputLevel: 1 };

const GuitarAmp = (options) => {
  return Object.assign({}, distortion, volume, cabinet, options);
};

const BassAmp = (options) => {
  return Object.assign({}, lowCut, volume, cabinet, options);
};

const ChannelStrip = (options) => {
  return Object.assign({}, inputLevel, lowCut, volume, options);
};
```
* There are three different kinds of prototypal OO.

1) **Concatenative inheritance:** The process of inheriting features directly from one object to another by copying the source properties. `Object.assign(target, ...sources)`. In JavaScript, source prototypes are commonly referred to as mixins.

2) **Prototype delegation:** In JavaScript, an object may have a link to a prototype for delegation. If a property is not found on the object, the lookup is delegated to the delegate prototype, which may have a link to its own delegate prototype, and so on up the chain until you arrive at `Object.prototype`, which is the root delegate. 

3) **Functional inheritance:** In JavaScript, any function can create an object. When that function is not a constructor ( or `class`), it's called a factory function. Functional inheritance works by producing an object from a factory, and extending the produced object by assigning properties to it directly (using concatenative inheritance). 

---
[Source](https://medium.com/@dan_abramov/how-to-use-classes-and-sleep-at-night-9af8de78ccb4)

* **Don't inherit more than once:** Inhertiance can be handy as a shortcut, and inheriting once is um-kay, but don't go deeper. When the requirements change, refactoring a clas hierarchy is so hard that it turns into a WTF sandwich with traces of outdated requirements. Instead of creating a class hierarchy, consider creating several factory functions. They may call each other in chain, tweaking the behavior of each other. 

* **Learn functional programming.** It will help you not think in classes, so you won’t be compelled to use them even though you know their pitfalls.

---
### `this` keyword

#### 1 Default Binding

* When calling a function in a standard way shown above, `this` will refer to the Global Object

```js
function foo() {
this.a = 'foo'
console.log(this)
}
foo() // global object
```

##### 2 Implicit Binding

* Id the function is contained within an object then that object will be referenced by `this`

```js
function bar() {
  console.log(this)
}

const foo = {
  a: 'foo',
  b: bar
}

foo.b() // {a: 'foo', b: [Function: bar]}
```

##### 3 Explicit Binding

* `bind, apply, call`are all functions that can be used to explicitly set the value of `this`. `this` inside the function is the object that is passed in as the argument

```js
function bar() {
  console.log(this)
}

const foo = {
  a: 'foo'
}

bar.bind(foo)() // {a: 'foo'}
bar.call(foo) // {a: 'foo'}
bar.apply(foo) // {a: 'foo'}
```

##### 4 New Binding

* When an instance of an object is created using the new keyword, `this`is always set to that same instance.

```js
function bar() {
  this.a = 'a'
  this.log = function () { console.log(this) }
}

const bar = new foo()
bar.log() // {a: 'a', log: [Function]}
```

##### Arrow Functions

* If the function is an arrow function, it ignores all the rules above and receives the `this` value of its surrounding scope at the time it's created. 

```js
const obj = {
    value: 'abc',
    createArrowFn: function() {
        return () => console.log(this);
    }
};
const arrowFn = obj.createArrowFn();
arrowFn(); // -> { value: 'abc', createArrowFn: ƒ }
```

* Going back to the 3rd rule, when we call `obj.createArrowFn()`, this inside createArrowFn will be obj, as we’re calling it with dot notation. `obj` therefore gets bound to `this` in `arrowFn`. If we were to create an arrow function in the global scope, this would be window.
