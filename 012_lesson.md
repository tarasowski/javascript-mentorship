1. Why is Either.fromNullabel() is not a real null check
  - Because you only check once for a null or undefined value. When the data enters your app. For instance, the data comes from a db call and you need to map over specific value. Do you all the null checks before you map over, that means after that you don't have to do any other null checks since you can be sure that there is some value. You simply put the value inside the box and map over, when there is a null, the map operations gets skipped and you move to the Left(x) side of the type. 

```js
console.clear();

/*
R eadable
I solated/Integrated in integration and functional tests
T horough (for numbers, test zero, overflows/underflows, etc...)
E xplicit test should be self-contained - you should be able to read and understand the test by looking at nothing but the test
*/

/*
Rejection app reducer
addQuestion action creator
getScore selector
Reducer

state shape:
[
  { question: 'Can I have a raise?', askee: 'Boss', status: 'Rejected' },
  ...
]
*/
```
### Question: Error handling in JS. Q1. When to return null? Q2. When to throw? Q3. How to handle undefined?

1. You should probably NEVER return `null`. Return a promise, or an empty array (you can safely map over empty arrays because the map function simply won't be called), etc...
2. Pure functions CAN'T throw because throwing is a side-effect. Instead of throwing, try rejecting a promise, returning an empty array, dispatching an error message, etc... pure functions can return an object that represents an error case. It's usually OK to throw inside a promise, because it will automatically return a rejected promise.
3. undefined usually represents an error case, if it does, use the same strategies as above. Sometimes, undefined can be replaced with a default value that makes sense. If it can, use a default.

### Question: How to handle multiple try / catch 

* Use asyncPipe, and use the promise error handling instead of try/catch:

```js
const mapSomething = ({ mapData, ...rest }) => Promise.resolve({ ...rest, mapData: map(fn) });

const fetchData = async ({ mapData, ...rest }) => ({ ...rest, mapData, dbData: await fetch(url, mapData) });

const asyncPipe = (...fns) => x => fns.reduce(async (v, f) => f(await v), x);

const myPipeline = ({ mapData }) => asyncPipe(
  mapSomething({ mapData })
    .catch(handleMapError),
  fetchData
)({ mapData });

myPipeline(pipeData)
  .then(dispatchSolution)
  .catch(handleRemainingErrors);
  
 ```
 * Checkout this gist, there is an example how to do it [Promise Pipeline](https://gist.github.com/tarasowski/b3ff7f13ca50159fd941ac81906bce13)
 
 ### Question: How to build up an object via function composition from multiple database calls?
 
 * We can take and return an object which each function in the pipeline is expecting. Each function in an async pipeline needs to return a promise.

```js
const mapSomething = ({ mapData, ...rest }) => Promise.resolve({ ...rest, mapData: map(fn) });

const fetchData = async ({ mapData, ...rest }) => ({ ...rest, mapData, dbData: await fetch(url, mapData) });

const asyncPipe = (...fns) => x => fns.reduce(async (v, f) => f(await v), x);

const myPipeline = ({ mapData }) => asyncPipe(
  mapSomething({ mapData }),
  fetchData
)({ mapData });
```
