# Functional Mixins

[Source](https://medium.com/javascript-scene/functional-mixins-composing-software-ffb66d5e731c)

* Functional mixins are composable factory functions which connect together in a pipeline, each function adding some properties or behaviros like workers on an assembly line.

* Functional mixins don't depend on or require a base factory or constructor: Simply pass any arbitrary object into a mixin, and an enhanced versio nof that object will be returned

* Functional mixins features:
  * Data privacy/encapsulation
  * Inheriting private state
  * Inheriting from multiple sources
  * No diamand problem (property collision ambiguity) - last in wins
  * NO base-class requirements
  
* All modern software development is really composition. We break a large, complex problem down into smaller, simpler problems, and then compose solutions to form an application.

* The atomic units of composition are one of two things:
  * Functions
  * Data structures
  
 > Application structure is defined by the composition of those atomic units.
 
 * Favor object composition over class inheritance - The Gang of Four
 
 * **Mixins** are a form of *object composition*, where component features get mixed into a composite object so that properties of each mixin become properties of the composite object.
 
 * The term 'mixin* in OOP comes from a mixin ice cream shops. You start with a vanilla ice cream, and a bunch of separete ingredients that could be mixed in to create custom flavors for each customer. Object mixins are similar.
 
**Note:** Because JavaScript support dynamic object extension and object without classes, using object mixins is trivially easy in Javascript.

```js
const chocolate = {
	hasChocolate: () => true
}

const caramelSwirl = {
	hasCaramelSwirl: () => true
}

const pecans = {
	hasPecans: () => true
}

const iceCream = Object.assign({}, chocolate, caramelSwirl, pecans)

console.log(
  iceCream.hasChocolate() // true
)
```

## Functional Inheritance

* Functional inheritance is the process of inheriting features by applying an augmenting function to an object instance. The function supplies a closure scope which you can use to keep some data private. The augmenting function uses dynmaic object extension to extend the object instance with new properties and methods.

```js
// Base object factory
function base(spec) {
    var that = {}; // Create an empty object
    that.name = spec.name; // Add it a "name" property
    return that; // Return the object
}
// Construct a child object, inheriting from "base"
function child(spec) {
    // Create the object through the "base" constructor
    var that = base(spec); 
    that.sayHello = function() { // Augment that object
        return 'Hello, I\'m ' + that.name;
    };
    return that; // Return it
}
// Usage
var result = child({ name: 'a functional object' });
console.log(result.sayHello()); // "Hello, I'm a functional object"
```

**Note:** Because `child()` is tightly couples to `base()`, when you add `grandchild()`, and `greatGrandChild()` you'll opt into most of the common problems from class inheritance.

## Functional Mixin

* Functional mixins are composable functions which mix new properts or behaviors with properties from a given object. Functional mixins don't depend on or require a base factory or constructor. Simply pass any arbitrary object into a mixin, and it will be extended.

```js

const flying = o => {
  let isFlying = false;
  return Object.assign({}, o, {
    fly () {
      isFlying = true;
      return this;
    },
    isFlying: () => isFlying,
    land () {
      isFlying = false;
      return this;
    }
  });
};

const bird = flying({})

console.log(
	bird.fly().isFlying(), // true
  	bird.land().isFlying() // false
)
```
**Note:** when we call `flying()`we need to pass an object in to be extended. Functional mixins are designed for function composition. 

* Functional mixins can be composed with simple function composition

```js
const quacking = quack => o => Object.assign({}, o, {
	quack: () => quack
})

const quacker = quacking('Quack!')({})

const createDuck = quack => quacking(quack)(flying({}))

const duck = createDuck('Quack!')

console.log(
	quacker.quack(), // Quack!
  	duck.fly().isFlying(), // true
  	duck.fly().quack() // Quack!!
)
```
* A working version with `compose()`

```js
const createDuck = quack => pipe(
  flying,
  quacking(quack)
)({})

const duck = createDuck('Quack!')
```
## When to use Functional Mixins
> You should always use the simplest possible abstraction to solve the problem you are working on. Start with pure function. If you need an object with persistent state, try a factory function. If you need to build more complex objects, try functional mixins.

**Remark:** React users `class`is fine for lifecycle hooks because callers aren't expected to use `new`, and documented best-practice is to avoid inheriting from any components other than the React-provided base component.

* To avoid **problems** with functional mixins, you should:
  * Use the simplest practical implementation: Start on the left and move to the right only as needed: pure functions > factories > functional mixins > classes
  * Avoid the creates of `is-a` relationships between object, mixins, or data types.
  * Avoid implicit dependencies between mixins - whenever possible, functional mixins should be self-contained, and have no knowledge of other mixins. 
  * Functional mixins doesn#t mean functional programming
  
> I rely mostly on function composition to compose behaviors and application structure, and only rerely need functional mixins or stamps. I never use class inheritance unless I'm descending directly from a third-party base class such as `React.Class`. I never build my own inheritance hierarchies. - Eric Elliot.

**Note:** Class inheritance is very rarely (perhaps never) the best approach in JavaScript.

* Functional mixins are composable factory functions which add properties and behaviors to objects like stations in an assembly line. They are a great way to compose behaviors from multiple source features (has-a, uses-a, can-do), as opposed to inheriting all the features of a given class (is-a). 

* Be aware, 'functional mixins' doesn#t imply 'functional programming' - it simply means, 'mixins using functions'. 

> Start with the simplest implementation and move to more complex implementeations only as required: Functions > objects > factory functions > functional mixins > classes

# How to Redux

* [Source](https://ericelliottjs.com/premium-content/how-to-redux/)

* Why does Redux exist?
	* In the last 20 years we have got stucked with MVC.
	* We have also two way data binding - Complex 2 way data flow - Angular -> Problem: nondeterministic view render
		* The view can fire off network request and introduces more nondetermenistic view render
		* You are not fully aware of the side-effects that are happening
	* Facebook wanted to abondon MVC and do 1 way data flow. If we have some specific state we always can count on the output. 
		* The view can fire off action (these are objects, not function calls) and that object described the action type. This is the intent of the particular action and what should happen in response to particular network events. And the action goes to dispatcher and the dispatcher gives it to the store and the store decides to make changes to the state. 
		* This gives us deterministic view render, we have now isolation of all side-effects I/O, user clicks and other changes to the shared mutuble state. It isolates your side-effects from your logic that manipulates the state. You should keep the side-effects at the edges of your app
![Flux](https://cdn-images-1.medium.com/max/1600/1*MdaK2tzd5f9BqadwMvPoKg.png)

## Redux

* Redux = Flux + FP

* FP = simple, pure, composable functions

* Redux applies reducers to a stream of action objects (instead of an array). State manipulations that happens all the time within your application. It takes the stream and reduces it over a stream.

* Your reducers should always return a state, therefore you should have the `default` inside the Reducer
		
* Action object stream = Append-only op log (like on a database). It's like a transaction record, you can see the entire state of your history. You can see how your state got manipulated, you can rewind and replay your action objects = time travel debugging.

* It gives deterministic state reproduction, if a user has sent you a bug, you have a collection of all state changes, so you can how the state was updated.

* It gives immutable state history. Mutability is problematic it throws away the knowledge it hides it from you. In an immutable state history you have the complete record of what has happened. 

* You can completely eliminate the timing-dependency bug (race conditions). Because all the side-effects are isolated. 

* Easy Undo/Redo. If you app is just sequence of object, you can rewind all the actions. Because there is only 1 way to manipulate the state. 

> Reducers MUST BE the single source of trught for an app's state. They are in charge of state changes. Reducers must be pure functions, but actions can be impure function. They can read from DOM, or Date but shouldn't do any side effects.

* Pure function:
	* Given the same input, always return the same output (e.g. Reducers should not e.g. generate random ids, calling the server, trying manipulate the view directly). The reducer shouldn't know anything about except your are passing in the arguments. If you need to know the time of date, do it outside of the reducers.
	* No side effects (ANY mutation of any outside-observable state). Including objects and arrays in JavaScript. If you manipuate the value of the object or array, it's a side effect. Instead you need to return a new object or new array.
	
> "nondeterminism = parallel processing + mutable state

* If you mutate state outside of the reducers you defend the whole purpose of Redux.

![Redux](https://raw.githubusercontent.com/pluralsight/guides/master/images/79263077-e972-47c6-93dc-44e466a8e191.gif)

* Isolating side-effects. One thing responsible for all of your API-calls and network IO. It's all isolated into one place. You get an event from the view and the view will fire off that event to your store, the middleware will fire off to your action creator and say "hey we want to make an API call".

* The only way to update the store is to dispatch an action and go to the reducer so the state can be updated. The whole purpose of this is SEPARATION OF CONCERNS.

* View / Component = Dumb:
	* Zero business logic
	* Zero request dispatching
	* Limit side-effects to the DOM (only draw to the screen
* Action creator service OR Sagas/Epics = Traffic control (it's a replacement of a controler in the MVC)
	* Dispatch actions
	* Trigger async request
	* Dispatch more action when async complete
	* ONLY soure of server I/O side-effects
* Reducers = State Updates:
	* ONLY modules allowed to touch state
	* Provide actions types (constants with a string value = the way to identify the state update). The reason in larger apps, you can have a lot of stuff with the same type but can mean a lot of different things. 
	* Provide selectors to isolate store shape
	
## Unit Testing
* One of the great benefits of Redux is simplifies your testing of your application. 

* Isolate concerns to different test modules (view, reducers, i/o) 
	* You create separate tests for these modules

* Less mocking required (complex mocking is a code smell)

* If you have to do a lot of mocking it says that your application is tightly coupled together.

* Simpel tests lead to simple code

* **Component tests:** Given some value it should return some other value for component test (from raw data to HTML)

* **Network I/O tests:** Action creators / sagas / epics / middleware -> they can be mocked so you don't have to wait. 

> Actions dispatch synchronously. Requests dispatch asynchronously

# 5 Common Misconceptions About TDD & Unit Tests

1) **TDD is too Time Consuming.**
	* Fixing bugs interrups the normal flow of software developer, which causes context switching that can cost up to 10 minutes per bug. That's 20 minutes where the developer is doing nothing productive - **just trying to reboot the brain to figure out the context of the new problem**, and then recover the context of the problem they were working on prior to the interruption.
	
2) **You can't write tests unitl you know the design, & you can't know the design unit you implement the code.**
	* Developers who have not developed the test-first TDD discipline often charge into the implementation of the code before they know what the API will look like. They start implementing code before they hae even designed a function signature.
	* This is the opposite of TDD. The point of TDD is that it forces you to have a direction in mind before you start charging into the fray, and having a direction in mind leads to better designs.
	
3) **You have to write all tests before you start the code
	* 100% design-up-front is a myth in every type of engineering. Design is exploratory. We try things out, throw them away, try different things unit we reach something that we like. 
	* You don't write all the tests upfront. TDD offers another way of building up software:
		1) Write one test
		2) Watch if fail
		3) Implement the code
		4) Watch the test pass
		5) Repeat

4) **Red, Green and ALWAYS Refactor?**
	* One of the great benefits of TDD is that it can hep you refactor when you need to: You only refactor when your code is unreadable, or you've bencharmarked it and discovered it's too slow, you probably don't need to refactor. 
	
> Perfect is the enemy of good. Voltaire

* Look over your code and see if there are opportunities to make it better, but don't refactor just for the sake of refactoring. Time is wasting. Move on to the next test.

5) **Everything Needs Unit Test
* Unit tests work best for pure functions - functions which:
	1. Given the same input, always return the same output
	2. Have no side-effects (don't mutate shared state, save data, talk to the network, draw things to screen, log to the console etc.)
* If you have to do a lot of mocking to create a proper unit test, maybe that code doesn't need unit tests at all.
* Your code should be modular enough that it's easy to keep I/O dependent modules at the edges of your program, leaving huge parts of the app that can be easily unit tested.

# 10 Tips for Better Redux Architecture

[Source](https://medium.com/javascript-scene/10-tips-for-better-redux-architecture-69250425af44)

1) Understand the Benefits of Redux
	* Deterministic view renders. When your view render is isolated from network I/O and state updates, you can achieve a deterministic view render, meaning: given the same state, the view will always render the same output. 
	* Deterministic state reproduction
	* The main purpose of Redux is to isolate state management from I/O side effects such as rendering the view or working whith the network. 
	* Flux Architecture does enforce strict separation and sequence, which obeys these rules every time:
		1) First, we get into a known, fixed state...
		2) Then we render the view. Nothing change the state again for this render loop.
		3) Givent he same state, the view will always render the same way
		4) Event listeners listen for user input and network request handlers. When they get them, actions are dispatched to the store.
		5) When an action is dispatched, the sate is updated to a new known state and the sequence repeats. Only dispatched actions can touch the state. It's a one-way data flow architecture for your UI:
		
![Flux](https://cdn-images-1.medium.com/max/800/1*2FrT8oMXswVWiVEfBCXlAQ.png)
	* With the flux architecture, the view listeners for user input, translates those into action objects, which gets dispatched to the store. The store updates the application state and notifies the view to render again. Of course, the view is rarely the only source of input and events, but that's no problem Additional event listeners dispatch action objects, just like the view.

![Flux + Server](https://cdn-images-1.medium.com/max/800/1*MdaK2tzd5f9BqadwMvPoKg.png)

	* **Important:** State updates in Flux are transactional. Instead of simply calling an update method on the state, or directly manipulating a value, action objects get dispatched to the store.  An action object is a trasaction record. You can thin of it like a bank transaction - a record of the change to be made. When you make a deposit to your bank, your balance from 5 minutes ago doesn't get wiped out. Instead, a new balance is appended to the transaction history. Action objects add a transaction history to your applcation state. 
	
2) Some Apps Don't Need Redux
	* User workflows are simple
	* User don't collaborate
	* You don't need to manage server side events (SSE) or websockets
	* You fetch data from a single data source per view

3) You Need Redux, If
	* Users workflows are complex
	* Your app has a large variaty of user workflows (consider both regular users and admins)
	* Users can collaborate
	* You're using web sockets or SSE
	* You're loading data from multiple endpoints to build a single view

4) Understand Reducers
	* Redux = Flux + Functional Programming
	* The primary building block of Redux state managemetn is the reducer function. Inf unctional programming, the common utility `reduce()`or `fold()` is used to apply a reducer function to each value in a list of values in order to accumulate a single output value. 
	
5) Reducers Must Be Pure Functions
	* In order to achieve deterministic state reproduction, reducers must be pure fuctions. No exceptions.
		1) Gien the same input, always returns the same output.
		2) Has no side-effects.
	* Reducers should always return a new object. You can do that with `Object.assign({}, state, {thigToChagne} )
	* The same rule applies to arrays. You can't just `.push()` new items to an array in a reducer, because `.push()` is a mutating operation. 
	
```js
const ADD_CHAT = 'CHAT::ADD_CHAT';

const defaultState = {
  chatLog: [],
  currentChat: {
    id: 0,
    msg: '',
    user: 'Anonymous',
    timeStamp: 1472322852680
  }
};

const chatReducer = (state = defaultState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_CHAT:
      return Object.assign({}, state, {
        chatLog: state.chatLog.concat(payload)
      });
    default: return state;
  }
};
```

5) Reducers Must be the Single Source of Truth
	* All state in your app should have a single source of truth, meaning that the state is stored in a single place, and anywhere else that state is needed should access to the state by reference to its single source of truth.
	* When you store any state in a Redux store, any access to that state should be made through Redux. 

6) Use Constants for Action Types
	* Keeping all the action types for a reducer gathered in one place at the top of the file can also help you:
		1) Keep names consistent
		2) Quickly understand the reducer API
		3) See what's changed in pull requests
		
7) User Action Creators to Decouple Action Logic from Dispatch Callers
	* Where is a good place to handle impure logic like that without repeating it everywhere you need to use the action? In an action creator. Action creators have other benefits, as well:
		* Keep action type constantcs encapsulated in your reducer file so you don't have to import them anywhere else. 
		* **Make some calculations on inputs prior to dispatching the action.**
		* Reduce boilerplate

```js
// Action creators can be impure.
export const addChat = ({
  // cuid is safer than random uuids/v4 GUIDs
  // see usecuid.org
  id = cuid(),
  msg = '',
  user = 'Anonymous',
  timeStamp = Date.now()
} = {}) => ({
  type: ADD_CHAT,
  payload: { id, msg, user, timeStamp }
});
```
* **Note:** As you can see above, we're using cuid to generate random ids for each chat message, and `Date.now()`to generate the timeStamp. Both of those are impure operations which are not safe to run in the reducer - but it's perfectly OK to run them in action creators. 

> If you store your constants, reducers, and action creators all in the same file, you'll reduce boilerplate required when you import them from separate locations. 

8) Use ES6 Parameter Defaults for Signature Documentation

9) Use Selectors for Calculated State and Decoupling
	* If your data structure of your state needs to be changed at any time. You should use selectors in order not to change the render components. 
	* For every reducer you should create a selector that simply exports all the varaibles you need to construct the view. Usually you fix your data structure in your selectors and there is no need to change the view component if some data struture has changed.
	* If you put all your calculated state in selectors, you:
		1) Reduce the complexity of your reducers & components
		2) Decouple the rest of your app from your state shape
		3) Objey the single source of truth principle, even within your reducer.
		
10) Use TDD: Write Test First

# What are Redux Selectors?

* [Source](https://www.saltycrane.com/blog/2017/05/what-are-redux-selectors-why-use-them/)

* Why? 
	* One reason is to avoid duplicated data in Redux. Redux state can be thought of like a database and selectros like SELECT queries to get useful data from the database. 

* Why not perform the data transformations in the component?
	* Performing data transformations in the component makes them more coupled to the Redux state and less generic/reusable. It makes sense to keep selectors near reducers because they operate on the same state. If the state schema changes, it is easier to update the selectors than to update the components. 

* Performance
	* mapStateToProps gets called a lot so performing expensive calculations there is not good. This is where the the `reselect` library comes in. Selectors created with reselect's `createSelector` will memoize to avoid unnecessary recalculations. Note if performance is not an issue `createSelector` is not needed. 
	

