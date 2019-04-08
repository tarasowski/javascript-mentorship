# Cost of Skipping TDD 

[Source](https://medium.com/javascript-scene/the-outrageous-cost-of-skipping-tdd-code-reviews-57887064c412)

* It takes 30% longer to build-out projetc with TDD
* TDD reduces production bug density 40%-80%
* Fixing a production bug costs 100x more than fixing a bug at design time
* Each context switch can cost up to 20 minutes of developer productivity
* An interrruped task takes about twice as long to complete and contains twice as many errors as an uninterrupted task. (see [Maker's Schedule, Manager's Schedule](http://www.paulgraham.com/makersschedule.html))

# 5 Questions Every Unit Test Must Answer

[Source](https://medium.com/javascript-scene/what-every-unit-test-needs-f6cd34d9836d)

* Your tests are your first and best line of defense agains software defects
* Your tests are more important than linting & static analysis (cannot find the problems with your logic)
* **Tests are important as implementation itself**
* Writing test first gives you a clearer perspective on the ideal API design
* Test descriptions enshrine in code every implemented feature requirement
* When a test fails, that test failure report is often your first and best clue about exactly what went wrong
* What's in a good test failure bug report?
  1) What were you testing?
  2) What should it do?
  3) What was the output (actual behavior)?
  4) What was the expected output (expected behavior)?

* Start with a string. What should the feature do? `'compose() should return a function.'`
* Now we are passing the information into a test runner `test('Compose function output type.', assert => {})`

> If the only available assertion in every test suite was `equal()`, almost every test suite in the world would be better for it. Because `equal()` by nature answers the two most important questions every unit test must answer: 1) What is the actual output?, 2) What is expected output?

* Now you need to add the actual and expected behavior for testing

```js
const actual = typeof compose() // the actual value must be produces by exercising some of the component's public API
const expected = 'function'
```

* Here is the final result

```js
import test from 'tape';
import compose from '../source/compose';

test('Compose function output type', assert => {
  const actual = typeof compose();
  const expected = 'function';

  assert.equal(actual, expected,
    'compose() should return a function.');

  assert.end();
});
```

* A Unit Test Template

```js
import test from 'tape';

// For each unit test you write, answer these questions:

test('What component aspect are you testing?', assert => {
  const actual = 'What is the actual output?';
  const expected = 'What is the expected output?';

  assert.equal(actual, expected,
    'What should the feature do?');

  assert.end();
});

```

# JavaScript Factory Function vs. Constructor Functions vs. Classes

```js
// class
class CarClass {
	drive() {
    console.log('Vroom!')
    }
}

const car1 = new CarClass()
car1.drive() // Vroom!

// constructor
function ConstructorCar() {
}

ConstructorCar.prototype.drive = function() {
	console.log('Vroom!')
}

const car2 = new ConstructorCar()
car2.drive() // Vroom!


// factory

const proto = {
	drive() {
    	console.log('Vroom!')
    }
}

function factoryCar() {
	return Object.create(proto)
}

const car3 = factoryCar()
car3.drive() // Vroom!
```

* **Note:** The Object.create() method creates a new object, using an existing object as the prototype of the newly created object. [Source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

> In JavaScript, any function can return a new object. When it's not a constructor function or class, it's called a factory function.

* The main drawback of constructors and class is the caller is tightly couples to the constructor implementation. If you ever need the additional flexibility of the factory, the refactor is a breaking change.

> In JavaScript switching from a constructor or class to a factory is a breaking change.

* The main drawback of using class  is that it leads user to create problematic class hierarchies using the `extend` keyword. Calss hierarchies lead to a bunch of well-known problems in object oriented design, including the fragile base calss problem, the gorilla banana problem, the duplication by necesseity problem. 

* Factories are much more flexible than either consturctor functions or classes. You can return any arbitrary object and use any arbitrary prototype. 
  * No refactories worries, you would never have a need to convert from a factory to a constructor.
  * No `new`keyword. No ambiguity about using `new`.
  * Standard `this`behavior, `this`behaves as it normally would, so you can use it to access the parent object. Be aware that `this`doesn't refer to a the new object inside the factory.
  
# How to Use Classes and Sleep at Night
  
[Source](https://medium.com/@dan_abramov/how-to-use-classes-and-sleep-at-night-9af8de78ccb4)
  
* Classes encourage inheritance but you should prefer composition
  
* Classes make inheritance not transparent
  
* **Resist making classes your public API.** You can always hide your classes behind the factory functions.
  
* **Don't inherit more than once.** Instead of creating a class hierarchy, consider creating several factory functions. They may call each other in chain, tweaking the behavior of each other. 

* **Don't make super calls from methods.** Better turn your calsses into factory functions and keep the relationships between them very explicit (input -> output). When your only tools are parameters and return values, it's easier to discover the right balance of repsonsiblities. 

* **Don't expect people to use your classes.** Even if you choose to provide your classes as a public API, prefer duck typing when accepting inputs.
  
# TDD the RITE Way

[Source](https://medium.com/javascript-scene/tdd-the-rite-way-53c9b46f45e3)

* Here is another video from Dan Abramov how to do TDD [Video](https://egghead.io/lessons/react-redux-writing-a-counter-reducer-with-tests)

* TDD the RITE Way means
	* Readable: 
		1) What component being tested 'double() should return x'
		2) What behavior of the component is being tested (test setup / givens)?
		3) What are the actual results?
		4) What are expected results?
		5) How can actual results be reproduced.
	* Isolated OR Integrated
	* Thorough
	* Explicit
	
* Keep the code in your test to a minimum. You shoul dbe able to handle setup and teardom using factory functions. For example testing reducers: use a factory function to create the initial state for the test. That way the setuup logic doesn't add much clutter to the test itself.

```js
const defaultState = {
	user: {
		name: 'Anonymous'
	},
	asks: []
}

const getExpectedState = (
	props = {}
) => ({...defaultState, ...props})

const testRejection = action => user => msg =>
	expect(rejectionReducer(getExpectedState(), action))
		.toEqual(getExpectedState(user))

testRejection({type: 'NEW_USER'})
	({name: 'George'})('should return state with a new user')
```
* There are 3 major kinds of tests, all equally important. Functional/E2E tests, integration tests, and unit tests.
	* Unit tests must test isolated components
	* Functional/E2E & integration
	* All tests must be isolated from other tests. Test should have no shared mutable state
	
* Isolated components means that we're testing a unit of code (think module) in isolation from other parts of the system. You test them at the black box interface level. Each component is treated like a self-contained mini-program. 

* Instead of testing the whole program as we do with functional/E2E tests, we test units in isolation from the rest of the program, and in isolation from other loosely coupled modules. 

* To satisfy RITE way requireemnts, unit tests must:
	1) Run fast in order to provide developer realtime feedback as they code.
	2) Be deterministic: Given the same component with the same input, the test should always produce the same result. 

> The black box has only one-way communication: Something goes in (generally arguments), and something comes out (generally a return value). Your tests should not care what happens in between.

* For components with side-effects, it's usually better to forget about unit tests, and instead rely on functional or integration tests. 

* Why? Because if you try to test code which is tightly coupled to non-deterministic process, two things happen:

1) **Tests are no longer deterministic** meaning that tests can break even when the code works properly. Unit tests should never break for those reasons.
2) **Unit testing code with side-effects requires mocking.** Attempting to isolate tightly coupled code from non-deterministic processes requires lots of mocking. Mocking is code smell.

* If you find that you have to mock a lot of things to test a little thing, that could be an indication that your application is too tightly coupled. You should be able to separate things like network/database/API communication from the logic that processes the data returned from the network/database/API. 

* The part of the code that processes that data can and likey should be implemented using deterministic processes & pure functions. **Isolate side effects from business rules and domain logic**

* **Functional Tests Must be Integrated** The idea of functional tests is that they make sure that the whole app works when all the components are working together. That means that you need all the parts of the app running, from database to UI, with all of the required services hooked up and live.

* Because the integrated app will incur penalties from network latencies, and real delays, functional tests tend to be too-slow to provide realtime test feedback to developers as they code. For that reason, keep functional tests and unit tests separate, and run them independed of each other. Functional tests typically require a deplyoment of the app to testing servers during automated continuous integration tests.

* Your unit test should contain everything you need to know to reproduce the results. Avoid magic. Avoid references to shared state - especially shared mutable state between unit tests. Instead, use factory functions.

> I've seen too many suites using `beforeEach()`and `afterEach()`accidentally mutate shared state between tests, only to cause problems when the order of test execution gets rearranged, or when tests are run in parallel in order to save time.

# Object Composition

[Source](https://ericelliottjs.com/premium-content/object-composition/)

## Why is OOP - why does it exists?

* Programming using objects or classes as the atomic unit of composition. 

* Any data that can be obserbed by other parts of the program is basically shared mutable state. AVOID IT!!!
	* Global Variables
	* Console programs that puts stuff into the console and programs that wait for stuff from a console
	* DOM that gets some stuff enjected and other programs that waiting for changes in the DOM
	
* Message passing was the main feature of OOP. Only the object can mutate it's state, if you need to mutate it's state you need to send a message to that object and the object is the only who can mutate it's state.

* Encapsulation was anther main feature of OOP. 

* Polymorphism - a single interface can represent many different kinds of potential implementations. Makes a possible to have a composite object which represents access to that composite object component objects. 

* What is an object?
	* name/values - names associated with a value. In JS we get encapsulation through a closure.

* **Object composition** is assembling object to get more complex behavior.

* **A composite object** is a container for primitive data types.

* Class inheritance - Is-A relationship (Animals -> Dog -> Chiauau). Given enough time and evolution all single-ancestor class taxonomies are eventually wrong for new use-cases.

* Fragile base class problem - calss inheritance is the tightest from a coupling. If you change the base class all instances will change. 

## Object composition: Aggregation

* An object that contains subobjects. it's collection of objects. 
* The subobject retain their identity, means we can add or remove the objects
* Examples: Arrays, Maps, Sets, Graphs, Trees (DOM nodes) -> all are aggregations 
* Whenever you need collection of object which need to share common operations use aggregation. 
