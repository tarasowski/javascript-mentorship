const {compose, lensProp, view, set} = require('ramda')
// Lenses
// https://medium.com/javascript-scene/lenses-b85976cb0534

// A lens is a composable pair of pure getter and setter functions which focus on a particular field inside an object
// They obey a set of axioms known as the lens laws. 

// Why Lenses?
// State shape dependecies are a common source of coupling software.
// Many components may depend on the shape of some shared state, 
// so if you have to change the shape of that state, you have to change logic in multiple places
// lenses asslo you to abstract state shape behind getters and setters. 
// **Instead of littering your codebase with code that dives deep into the shape of an object, import a lens**
//
// This follows the principle that a small change in requirements should require only a small change in the system
//
// Lens Laws
// The lens laws are algebraic axioms which ensure that the lens is well behaved.
// 1. view(lens, set(lens, a, store) = a -> if you set a value into the store, and immediately view the value through the lens, you get the value that was set.
// 2. set(lens, b, set(lens, a, store)) = set(lens, b, store) -> if you set a lens value to a and then immediately set the lens value to b, it's the same as if you'd just set the value to b. 
// 3. set(lens, view(lens, store), store) = store -> If you get the lens value from the store, and then immediately set that value back into the store the value is unchanged. 
//
//const view = (lens, store) => lens.view(store)
//const set = (lens, value, store) => lens.set(value, store)

//const lensProp = prop => ({
//  view: store => store[prop],
//  set: (value, store) => ({
//    ...store,
//    [prop]: value
//  })
//})

// An example store object. An object you acces with a lens 
// is often called the "store" object:
const fooStore = {
  a: 'foo',
  b: 'bar'
}

const aLens = lensProp('a')
const bLens = lensProp('b')

const a = view(aLens, fooStore)
const b = view(bLens, fooStore)
console.log(a, b)

const bazStore = set(aLens, 'baz', fooStore)
console.log(view(aLens, bazStore))

// Lews laws

const store = fooStore

{
  const lens = lensProp('a')
  const value = 'baz'

  const a = value
  const b = view(lens, set(lens, value, store))
  
  console.log(a, b) // baz baz
}

{
  const lens = lensProp('a')

  const a = 'bar'
  const b = 'baz'

  const r1 = set(lens, b, set(lens, a, store))
  const r2 = set(lens, b, store)

  console.log(r1, r2)

}

{
  const lens = lensProp('a')

  const r1 = set(lens, view(lens, store), store)
  const r2 = store

  console.log(r1, r2)

}

// Composing Lenses

const lensProps = ['foo', 'bar', 1]
const lenses = lensProps.map(lensProp)
const truth = compose(...lenses)

const obj = {
  foo: {
    bar: [false, true]
  }
}

console.log(
  view(truth, obj)
)

// Over
const over = (lens, f, store) => set(lens, f(view(lens, store)), store)
const uppercase = x => x.toUpperCase()

console.log(
  over(aLens, uppercase, store)
)

// Setters obey the functor laws
// Identity
{
  const id = x => x
  const lens = aLens
  const a = over(lens, id, store)
  const b = store

  console.log(a, b)
}

// Composition laws

const cOver = lens => f => store =>
  set(lens, f(view(lens, store)), store)

{
  const store = {
    a: 20
  }

  const lens = aLens
  const g = n => n + 1
  const f = n => n * 2

  const a = compose(
    cOver(lens)(f),
    cOver(lens)(g)
  )

  const b = cOver(lens)( compose(f,g))

  console.log(
    a(store),
    b(store)
  )
}

// Generators

function* foo() {
  yield 'a'
  yield 'b'
  yield 'c'
}

const [...values] = foo()
console.log(values)

function* crossBridge() {
  const reply = yield 'What is your favorite color?'
  console.log(reply)
  return reply !== 'yellow' 
    ? 'Wrong!' 
    : 'You may pass'
}

{
  const iter = crossBridge()
  const q = iter.next().value // yields a questions
  console.log(q)
  const a = iter.next('blue').value // passes blue back to reply -> reassigns the variable
  console.log(a)
}

{
  const iter = crossBridge()
  const q = iter.next().value
  console.log(q)
  const a = iter.next('yellow').value
  console.log(a)
}

const isPromise = obj => Boolean(obj) && typeof obj.then === 'function'

const next = (iter, callback, prev = undefined) => {
  const item = iter.next(prev)
  const value = item.value
  if (item.done) return callback(prev)
  if (isPromise(value)) {
    value.then(val => {
      setImmediate(() => next(iter, callback, val))
    })
  } else {
    setImmediate(() => next(iter, callback, value))
  }
}


const gensync = (fn) =>
  (...args) => new Promise(resolve =>
    next(fn(...args), val => resolve(val)))

const fetchSomething = () => new Promise((resolve) =>
  setTimeout(() => resolve('future value'), 500))

const asyncFunc = gensync(function* () {
  const result = yield fetchSomething()
  yield result + 2
})

asyncFunc('param1', 'param2', 'param3')
  .then(val => console.log(val))


