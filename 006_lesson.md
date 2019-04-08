```js
console.clear();
const log = x => console.log(x);

const f = n => n * 2;

// map = f => a => a
const map = f => xs => xs.reduce((a, c) => a.concat([f(c)]), []);

// filter = p => fa => fa
const filter = p => xs => xs.reduce((newArr, item) => p(item) ? newArr.concat([item]) : newArr, [])

const isEven = n => n % 2 === 0;
const arr = [1,2,3,4];

console.log(
  filter(isEven)(arr)
);

/*
What is a promise?

An object representing a possible future value, or error.

Why?

Promises can help us compose asynchronous processes without nesting logic, like you would need to using callback functions.

Promises are for composing functions.

f: a -> Promise(b)
g:              b -> Promise(c)
h: asyncPipe(f, g)
*/
{
  // asyncPipe = (...fns) => x => Promise(y)
  const asyncPipe = (...fns) => x => fns.reduce(async (y, f) => f(await y), x)

  const f = n => Promise.resolve(n + 1);
  const g = n => Promise.resolve(n * 2);

  const h = asyncPipe(f, g);
  h(20).then(log);
  
  // error handling
  // .catch() vs .then(success, err)
  // advice: favor .catch()
  // Don't throw from a .catch()
  // foo.then(f, e2).then(g).catch(handle);
}

{
  const wait = time => new Promise(
  res => setTimeout(() => res(), time)
);

wait(200)
  // onFulfilled() can return a new promise, `x`
  .then(() => new Promise(res => res('foo')))
  // the next promise will assume the state of `x`
  .then(a => a)
  // Above we returned the unwrapped value of `x`
  // so `.then()` above returns a fulfilled promise
  // with that value:
  .then(b => console.log(b)) // 'foo'
  // Note that `null` is a valid promise value:
  .then(() => null)
  .then(c => console.log(c)) // null
  // The following error is not reported yet:
  .then(() => {throw new Error('foo');})
  // Instead, the returned promise is rejected
  // with the error as the reason:
  .then(
    // Nothing is logged here due to the error above:
    d => console.log(`d: ${ d }`),
    // Now we handle the error (rejection reason)
    e => console.log(e)) // [Error: foo]
  // With the previous exception handled, we can continue:
  .then(f => console.log(`f: ${ f }`)) // f: undefined
  // The following doesn't log. e was already handled,
  // so this handler doesn't get called:
  .catch(e => console.log(e))
  .then(() => { throw new Error('bar'); })
  // When a promise is rejected, success handlers get skipped.
  // Nothing logs here because of the 'bar' exception:
  .then(g => console.log(`g: ${ g }`))
  .catch(h => console.log(h)) // [Error: bar]
;
}


/*
What is `this`?
*/

const a = {a: 'a'};
const obj = {
  getThis () { return this; },
  getThis2: () => this
};

console.log(
obj.getThis(),       // obj
obj.getThis.call(a), // x undefined, actually a
obj.getThis2(),      // undefined
obj.getThis2.call(a) // x a, actually undefined
)

class Obj {
  getThis () { return this; }
  getThis2 = () => this // arrow functions NEVER have their own `this`
  // always delegate to the lexical scope's `this`
};

const obj2 = new Obj();

console.log(
obj2.getThis(),       // obj2
obj2.getThis.call(a), // a
obj2.getThis2(),      // obj2
obj2.getThis2.call(a) // obj2
)

console.log(typeof Obj) // 'function'

