
## Books

* [Structure and Interpretation of Computer Programs](https://web.mit.edu/alexmv/6.037/sicp.pdf)


## Redux

* midldeware that listens for actions at the store (messaging passing how to isolate side-effect from the store) - messaging is the feature of object oriented programming.

* message passing is how you decouple side-effect from 

## Live Hacking

```js
const func = () => new Date()
```

* reading (cuuid() or newDate()) is not a side effect it' makes the function impure because it depends on the global variable or shared state!!!

* side effect is mutation outside of the function // procedure e.g. network call, console.log, something that does change something outside of the function

```js
console.clear();

// What is `this`?

const obj = {
  getThis () { return this; },
  getThis2: () => this
};

const a = { a: 'a' };

console.log(
  obj.getThis(),         // obj
  obj.getThis.call(a),   // a
  obj.getThis2(),        // undefined
  obj.getThis2.call(a)   // undefined
);

class Obj  {
  getThis2 = () => this
  getThis () { return this; }
}

const obj2 = new Obj(); // `new` binds `this` inside the constructor

console.log(
  obj2.getThis(),         // obj2
  obj2.getThis.call(a),   // a
  obj2.getThis2(),        // obj2
  obj2.getThis2.call(a)   // obj2
);

/* Factory vs Constructor

Any function that returns a new object without the `new` keyword is a factory. A constructor is a function that you invoke with the `new` keyword in order to create a new object instance.

What does `new` do?
1. Creates a new object and binds `this` inside the constructor
2. Binds `instance.__proto__` to `Constructor.prototype`
3. Binds `instance.__proto__.constructor` to `Constructor`
4. Implicitly returns the new object instance

Refactoring from class to factory is a breaking change.
* Invoking a function with `new` and invoking a function without `new` does not mean the same thing.

`instanceof` lies (never trust it)
* uses a === identity check to see if Constructor.prototype exists anywhere in the `instance` prototype chain.

Tip: Avoid `class` when it makes sense

When is it OK to use `class`?
* Note: Frameworks do inverse the control, means they call you e.g. classes in react, you don't call the class the class gets called by the framework. It's the definition of a framework, it's not about the size it's about the `inversion of control`. In comparison to a library where you call the stuff you need, you just take the functions and call them.

* Frameworks like React or Angular (because they don't force you to use the `new` keyword, so switching is not a breaking change
* Performance -- ONLY if you need your class to be a speed demon (e.g., accessed a LOT inside a hot render pipeline)

Tips for safe `class` use:
* Never force callers to use the `new` keyword
* If you need `class` for performance, export a factory and use `class` internally to avoid forcing callers to use `new`.
*/

class Foo {
}

const myFoo = new Foo();

console.log(myFoo instanceof Foo);

```
