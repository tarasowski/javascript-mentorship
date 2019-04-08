```js
console.clear()

/*
Factory vs Constructor?

Constructor uses `new`
Factory function returns an object without `new`

What does `new` do?

1. Instantiates the object and binds `this` in the constructor
2. Binds instance.__proto__ to Constructor.prototype
3. Binds instance.__proto__.constructor to Constructor
4. Implicitly returns `this`

Refactoring from class to a factory is a breaking change. What breaks?

1. If you try to invoke an arrow factory with `new` keyword, you'll get an error. Why? Arrow functions can't bind `this`, so can't be constructors.
2. `instanceof` lies. `instanceof` uses an identity (`===`) check against the prototype chain.

*/

const Foo = function () {
  const instance = {
    __proto__: {
      constructor: Foo,
      typeClasses: ['Foo', 'Bar', 'Baz']
    },
  };
  instance.foo = 'foo';
  return instance;
};


const myFoo = new Foo();
const myFoo2 = Foo();

console.log(myFoo instanceof Foo);

const pool = []

/*
Class inheritance vs object composition

A composite object is an object made up of other objects and primitive types. Object composition is the act of creating a composite object. Building an object up from multiple smaller parts.

Class inheritance - inherits all properties from a base class.

* Fragile base class problem - A change to the base class could break many descended classes.
* Gorilla banana problem - You wanted the banana but what you got was the gorilla holding the banana and the entire jungle.
* Duplication by necessity - Sometimes, you just want the banana, so you copy and paste just the banana. Sometimes you need a different base-class implementation, but you can't afford to break descendents, so you copy and paste the base-class, and now you have two SLIGHTLY different base classes to chose from, which are unexpectedly divergent.


Why should you EVER use a class?
1. Performance micro-optimization 
2. Invesion of control (React, don't call us we call you) 

How do you use them safely?

* Export a factory instead of a class, but internally, you can still use the class if you need it.


*/
```
