## How to run tests on node if you are using import syntax

* For `import` I use [esm](https://github.com/standard-things/esm) which adds support for ESM (standard modules). If I need React, I use babel & babel-node (babel-cli), which adds ESM support and React JSX support.

## Can I cover only specific parts with tests in order to speed up development (partly TDD)

I use TDD and unit tests for all deterministic code.

* Unit test React with Cheerio for components (display components - don't know about the store, not container components)
* Unit test reducers and action creators
* Unit test sagas (without running the side-effects)
* Functional tests for anything with side-effects
* I apply functional tests AFTER I've written the code using TDD for deterministic parts

## Where is the best place to generate timestamps, ids?

* Let client generate data, bu the server needs to verify and validate, and be the source of truth and consensus.
* You should generate the stuff on the client side in order if the user has no stable connection your app should work.
* Use cuuid on the client side to generate identifiers.

## How to unify data model between client and server?

* Don't try to unify data model, client and server can/should have different data models, since they optimize for different things.
* Storing data in the database should be optimized for reads or writes.
* If you work in a team usually your frontend team will come up with a data model for the backend

## What is the definition of data structure and data type?

* A data type is a set of values and operations you can perform on. In JS objects and arrays are data types.
* A data structure is a composite of other data types. By composing other data types your create a data structure.

## Can you recommend how to structure data?

* Pick a data model that makes the code simple.

## Redux: You get an array from the server. This array needs to be manipulated (sorted by date) before the data gets updated in the store. Where to do array manipulations?

* Do the thing that leads to the least amount of code and complexity. 

* Do it either in action creators or in reducers. These options are both ok. If you need to perform that more than once, do it the reducers.

* Creating a new date object from an exisiting is a pure function

```js
// pure function
new Date('2019-01-12T08:05:42.615Z')
```
* Gettting the current system date from the OS is an impure function. **Pure functions are deterministic** Running twice with the same data will always give you the same result.

```js
// impure function
new Date()
```
## Why do you call an array a transport meachinsm?

* Data is arrays only look static. The reason we put data in an array is to process it to use elsewhere.

## How to test functions w/ side-effects? 

```j
const final = async (id, params, putItem) => {
  const locationId = params.locationId;
  const warehousePlan = calculateWarehousePlan(id, params);
  await putItem(id, locationId, warehousePlan);
  return {
    id,
    locationId,
    storageBins: warehousePlan
  };
};
```

* Isolate side-effects from logic so there's more pure logic to test easily.
* Don't try to unit-test side-effects, instead use functional or integration tests, and you won't need to mock,
* Use better/more functional abstraction around side-effects tomake them easier to isolate (Generators, Tasks - like lazy promises)
