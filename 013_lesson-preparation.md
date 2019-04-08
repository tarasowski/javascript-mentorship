# 10 Tips for Better Redux Architecture

[Source](https://medium.com/javascript-scene/10-tips-for-better-redux-architecture-69250425af44)

* Transient state. A system is said to be in a transient state when a process variable or variables have been changed and the system has not yet reached a steady state.The time taken for the circuit to change from one steady state to another steady state is called the transient time. ~ Wikipedia

## 1. Understanding the benefits of redux

Two important goals 
* Deterministic View Renders
* Deterministic State Reproduction

> Determinism is important for application testability and diagnosing and fixing bugs. If your app views and state are nondeterministic, it's impossible to know whether or not the views and state will always be valid. **You might even say that nondeterminism is a bug in itself**

The summary of Flux architecture:
1. First, get into a known, fixed state (that's why redux has initial state that we define in reducer)
2. Then we render thew view. Nothing can change the state again for this render loop.
3. Given the same state, the view always render the same way.
4. Event listeners listen for user input and network request handlers. When they get them, actions are dispatched to the store.
5. When an action is dispatched, the state is updated to a new known state and the sequuence repeats. Only dispatched actions can touch the state.

> Importantly, state updates in Flux are transactional. Instead of simply calling an update method on the state, or directly manipulating a value, action object get despatched to the store. **An action object is a transaction record.**

## 2. Some apps don't need redux

If your:
* User workflows are complex
* Your app has a large variety of user workflows (consider both regular users and administrators)
* Users can collaborate
* You're using web sockets or SSE
* You're loading data from multiple endpoints to build a single view

Redux might be a good fit for you.o

## 3. Understanding reducers

* In functional programming, the common utility `reduce()` or `fold()`is used to apply a reducer function to each value in a list of values in order to accumulate a single output value. 

```js
const initialState = 0
const reducer = (state = initialState, data) => state + data
cosnt total = [0, 1, 2, 3].reduce(reducer)
```

## 4. Reducers must be pure function

1. Given the same input, always returns the same output
2. Has no side-effects

> Importantly in JS, all non-primitive objects are passed into function as references. In other words, if you pass in an object, and then directly mutate a property on that object, the object changes outside the function as well. Reducers should return a new object instead. you can do it with `Object.assign({}, state, {thingToChange})`

## 5. Reducers must be a single source of truth

* All state in your app should have a single source of truth, meaning that the state is stored in a single place, and anywhere else that state is needed should access the state by reference to its single source of truth.

In other words, without the single source of truth principle, you potentially lose:

* Deterministic view render
* Deterministic state reproduction
* Easy und/redo
* Time travel debugging
* Easy testability

## Some other important things

* Use constants for actions types: `CHAT::CHANGE_MESSAGE`. Keep all the action types for a reducer gathered in one place at the top of the file.
* Use action creators to decouple action logic from dispatch callers: A good place to handle impure logic without repeating it everywhere you need to use the action creator.

```js
export const addChat = ({
  id = cuid(),
  msg = '',
  user = 'Anonymous',
  timeStamp = Date.now()
} = {}) => ({
  type: ADD_CHAT,
  payload: {id, msg, user, timeStap}
})
```
> If you store your sonstants, reducer, and action creators all in the same file, you'll reduce boilerplace required when you import them from separate locations.


