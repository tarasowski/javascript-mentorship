# Mocking is Code Smell

[Source](https://medium.com/javascript-scene/mocking-is-a-code-smell-944a70c90a6a)

* TDD should lead to better design. The process of learning effective TDD is the process of learning how to build more modular applications.

* More complex code is often accompanied by more cluttered code. 

* "A code smell is a surface indication that usually corresponds to a deeper problem in the system" ~Martin Fowler

* Some code exists primarily to facilitate I/O, in which case ther eis little to do other than test I/O, and reducing mocks might mean your unit test coverage would be close to 0.

* If there is no logic in your code (just pipes and pure composition), 0% unit test coverage might be acceptable, assuming your integration or functional test coverage is close to 100%.

* However, if there is logic (conditinal expressions, assignment to variables, explicit function calls to units, you probably do need unit test coverage.

* A mock is a test double that stands in for real implementation code runding the unit testing process.

* All test doubles stands in for real code that the test subject is tightly coupled to, therefore, all test doubles are indication of coupling.

* Unit tests test individual units (modules, function, classes) in isolation from the rest of the program.

* Integration tests, which test integrations between two or more units.

* Functional tests, which test the application fromt he point of view of the user, including complete user interaction workflows.

* In general, units are tested using only the public interface of the unit. This is referred to as black box testing.

* Black box testing leads to less brittle tests, because the implementation details of a unit tend to change more over time than the public API of the unit.

* If you use white box testing, where tests are aware of implementation details, any change to the implementation details could break the test.

* Coupling is the degree to which a unit of code (module, function, class etc...) depends upon other units of code. The the coupling, the harder it is to maintain or extend the application.

* **What causes tight coupling?**
  * Mutation vs. immutability
    - Immutability: pure function don't mutate exisiting values. They return new ones, instead:
  * Side-Effects vs. purity/isolated side-effects
    - No side effects: The only observable effect of a pure function is its return value, so there's no chance fo rit to interfere with the opreation of other functions that may be observing external state such as the screen, the DOM, the console, the network, or the disk.
  * Responsibility overload vs. Do one thing
    - Do one thing: pure function do one thing: map some input to some corresponding output, avoiding the responsiblity overload that tends to plague object and class-based code.
  * Procedural instructions vs. describing structure
    - Structure, not instructions: Pure functions describe structural relationships between data, not instructions for the computer to follow, so two different sets of conflicting instructions running the at the same time can't step on each other's toes and cause problems.
  * Imperative composition vs. declarative composition

* Mocking is required if our decomposition strategy has failed.

* Decomposition: The essense of all software development is the process of breaking a lrage problem down into smaller, independet pieces (decomposition) and composing the solutions together to form an application that solves the large problem (composition).

> Mocking is required when the units used to break the large problem down into smaller parts depend on each other. Mocking is required when our supposed atomic units of composition are not really atomic, and our decomposition strategy has failed to decompose the larger problem into smaller, independent problems. 

* When decomposition succeeds, it's possible to use a generic composition utility to compose the pieces back together.
  * Function composition (compose)
  * Component composition (composing higher order components with function composition)
  * State store/model composition (combineReducers Redux)
  * Object of factory composition (mixins or functional mixins)
  * Process composition (transducers)
  * Promise or monaidc composition (asyncPipe(), Kleisli composition)
  
### When you use generic composition utilities, each element of the composition can be unit tested in isolation without mocking the other.

```js
console.clear()

const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x)


const g = n => n + 1
const f = n => n * 2

//Imperative composition
const doStuffBadly = x => {
	   const afterG = g(x)
    const afterF = f(afterG)
    return afterF
}

//Declarative composition
const doStuffBetter = compose(f, g)

console.log(
	doStuffBadly(20), // 42
  	doStuffBetter(20) // 42
)
```

* Function composition is the process of applying a function to the return value of another function. You create a pipeline of functions, then pass a value to the pipeline, and the value will go through each function like a stage in an assembly line.

* Imperative style means that we're commanding the computer to do something step-by-step.

* Declarative style means we're telling the computer the relationship between things. It's a description of structure using equational reasoning. `doStuffBetter` is the piped composition of `g` and `f`. 

**Note:** Assuming `f`and `g` have their own unit tests, and `compose()`hast its own unit tests, there is not new logic here to unit test. In order for this style to work correctly, the units we compose need to be decoupled.

### How do we remove coupling?

* To remove it we need to understand where the coupling comes from:

	 * Class inheritance (coupling is multiplied by each layer of inheritance)
	 * Global variables
	 * Other mutable global state (DOM, shared storage, network)
	 * Module imports with side-effects
	 * Implicit dependencies from composition e.g. `const widgetFactory = compose(eventEmitter, widgetFactory)` where `widgetFactory`depends on `eventEmitter`
	 * Dependency injection containers
	 * Dependency injection parameters
	 * Mutable parameters

* Loose coupling:
	* Module imports without side-effects
	* Message passing/pubsub
	* Immutable parameters

* Now how to remove coupling?
	* Use pure functions: as the atomic unit of composition, as opposed to classes, imperative procedures, or mutating functions.
	* Isolate side-effects: from the rest of your program logic. That means don#t mix logic with I/O (including network I/O, rendering UI, logging)
	* Remove dependet logic: from imperative compositions so that they can become declarative compositions which don't need their own unit tests. If there's no logic there's nothing meaningful to unit test.
	
* **That means that the code you use to set up network requests and request handlers won't need unit tests. Use integration tests for those, instead.

### Use pure functions

* Pure functions can't directly mutate global variables, the arguments passed into them, the network, the disk, or the screen. All they can do is return a value.

> If you're passsed an array or an object, and you want to return a changed version of that object, you can't just make the changes to the object and return it. You have to create a new copy of the object with the required changed. You can do that with the [array accessor methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype) **not the mutation methods**, `Object.assign({}, toCopy, toCopy)` or the array or object spread syntax.

```js
//Not pure
const singInUser = user => user.isSignedIn = true

const foo = {
	name: 'Foo',
  	isSignedIn: false
}

console.log(
	signInUser(foo),
  	foo, // {name: 'Foo', isSignedIn: true}
)

// Pure
const signInUserPure = user => ({...user, isSignedIn: true})

console.log(
	signInUserPure(foo), // {name: 'Foo', isSignedIn: true}
  	foo, // // {name: 'Foo', isSignedIn: false}
)
```

* **Note:** Creating a new object instead of reusing the existing ones, the side-effect of that is that we can detect changes to object by using an identity comparison (`===` check), so we don't have to traverse through the entire object to discover if anything has changed.

* Pure functions can be momoized, meaning that you don't have to build the whole object again if you've seen the same inputs before. For computationally expensive processes which don't require unbounded memory, this may be a great optimization strategy. Also because they have no side-effects, it's safe to distribute complex computations over large clusters of processors.

### Use pub/sub

* In the pub/sub pattern, units don't directly call each other. Instead, they publish messages that other units (subscribers) can listen to. Publishers don't know what (if any) units will subscribe, and subscribers don't know what (if any) publishers will publish.

* Pub/sub is backed into the DOM. Any component in your application can listen to events dispatched from DOM elements, such as mouse clicks. 

* Pub/sub is also baked into Redux. You dispatch an action object with a special key, `type`which various reducers can listen for and respond to. 

* **Isolate logic from I/O**

* Sometimes you can use modan compositions (like promises) to eliminate dpendent logic from your composition. For example the following function contains logic that you can't unit test without mocking all of the async functions:

```js
async function uploadFiles({user, folder, files}) {
  const dbUser = await readUser(user);
  const folderInfo = await getFolderInfo(folder);
  if (await haveWriteAccess({dbUser, folderInfo})) {
    return uploadToFolder({dbUser, folderInfo, files });
  } else {
    throw new Error("No write access to that folder");
  }
}
```

* Refactor this to use promise composition via `asyncPipe()`:

```js
const asyncPipe = (...fns) => x => (
  fns.reduce(async (y, f) => f(await y), x)
);
const uploadFiles = asyncPipe(
  readUser,
  getFolderInfo,
  haveWriteAccess,
  uploadToFolder
);
uploadFiles({user, folder, files})
  .then(log)
;
```
* The conditional logic is easily removed because promises have conditional branching built-in. The idea is that logic and I/O don't mix well, so we want to remove the logic from the I/O dependent code.

* **Important:** Each fo these function takes and resolves with the same data type. We could create a `pipelineData`type for this composition which is just an object containing the following keys: `{user, folder, files, dbUser?, folderInfo?,}`. **This creates a structure sharing depencency between the components!!!**, but you can use more generic version of these functions in other places and specialize them for this pipeline with thin wrapping functions.

* With those conditions met, it's trivial to test each of these functions in isolation form each other without mocking the other functions. Since we've extracted all of the logic out of the pipeline, there's nothing meaningful left to unit test in this file. All that's left to thest are the integrations.

* Use object that represent future computations. The strategy used by redux-sage is to use objects that represent future computations. The idea is similar to returning a monad. Monads are capable of composing function with the chain operation, but you can manually chain functions using imperative-style code, instead.

```js
// sugar for console.log we'll use later
const log = msg => console.log(msg);
const call = (fn, ...args) => ({ fn, args });
const put = (msg) => ({ msg });
// imported from I/O API
const sendMessage = msg => Promise.resolve('some response');
// imported from state handler/Reducer
const handleResponse = response => ({
  type: 'RECEIVED_RESPONSE',
  payload: response
});
const handleError = err => ({
  type: 'IO_ERROR',
  payload: err
});

function* sendMessageSaga (msg) {
  try {
    const response = yield call(sendMessage, msg);
    yield put(handleResponse(response));
  } catch (err) {
    yield put(handleError(err));
  }
}

const iter = sendMessageSaga('Hello, world!');
// Returns an object representing the status and value:
const step1 = iter.next();
log(step1);
/* =>
{
  done: false,
  value: {
    fn: sendMessage
    args: ["Hello, world!"]
  }
}
*/
```

> Code smells are warning signs, not laws. Mocks are not evil. 

> I've seen developers create elaborate fakes and mocks of things like express, the session middleware, log handlers, realtime network protocols. I've faced hard mocking questions myself, but the correct answer is simple: This file doesn't need unit tests.

* Mocking is great for integration tests, because integration tests test collaborative integrations between units, it's perfectly OK to face servers, network protocols, network messages, and so on in order to reproduce all the various conditions you'll encounter during communication with other units, potentially distributed across clusters of CPUs or separate machines on a nework. 
