```js
/*
Object Composition
*/
const objs = [
  { a: 'a', b: 'ab' },
  { b: 'b' },
  { c: 'c' }
];

{
  // aggregation
  // An enumerable collection of objects where each sub-object retains its own identity
  const appendToArray = (a, b) => a.concat([b])
  
  const result = objs.reduce(appendToArray, []);
  console.log(result);
}

{
  // delegation
  // An object forwards (or delegates) property access to another object.
  const delegate = (a, b) => ({
    __proto__: a,
    ...b
  });
  
  const result = objs.reduceRight(delegate, {});
  console.log(result);
}

{
  // concatenation
  // Adding to an existing object at runtime.
  const concatenate = (a, b) => ({...a, ...b})
  
  const result = objs.reduce(concatenate, {});
  console.log(result);
}

/*
What is TDD?
Test Driven Development

* Red - Write a test, whatch it fail
* Green - Write the implementation, watch it pass
* Refactor - Now that you have a working test case, it's safe to refactor

5 Questions Every Unit Test Must Answer?

1. What is the component/unit under test?
2. What functionality/behavior are we testing? (Prose)
3. Expected output?
4. Actual output?
5. How do we reproduce the test failure? (inputs, api call, etc...)

What is the RITE way?

Tests should be:

* Readable
* Isolated/Integrated Tests should be isolated from each other. In unit tests, units should be isolated from the rest of the app. Integration/functional tests - test that modules work correctly with other modules and in the context of the running.
* Thorough - Remember to test all of the likely edge cases. (Error states, malicious data (e.g., JSON-Schema) numbers, test 0, 1, very large, very small)
* Explicit - Everything you need to know to understand a test should be defined within the context of the test case. (Don't share mutable data between tests, don't rely too much on before/after hooks)
*/
```
