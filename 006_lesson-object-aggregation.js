'use strict'

// Object Composition: Aggregation

// Are just collections with objects. Each object retains it's own shape and identity
// We can add an object or extract an object out.


//Examples of Object Aggregation

// Used a lot of times to apply operations to each object in aggreation
// An Array is an object in JavaScript are complex object, object is formed from other objects or primitives
// Arrays:  [{..}, {...}, {...}] - An array is an object formed from smaller objects or primitives
// Maps
// Sets
// Graphs
// Trees: DOM nodes, an object that might contain children (Trees of agreggations of aggregations). Children might have another children
// Trees: UI components in React, might have nested child components. These things could be recursive data type


// When should we use aggregation

// Whenever you need collections of object which need to share commong operations.
// Any kind of iterable, queue, state machines, composite pattern: when you want a single item and multiple items treated with the same interface -> can be used for any kind of DOM trees etc.

// Consideration

// Aggregations make great universal abstractions, they are basically collections with lot of operations such as map(), filter(), reduce()
// If all the subobjects can't fit in memory at the same time, consider streaming data (streaming the children instead of aggregating them into one object). A stream is an array spread over time, a very good alternative for performance considerations

// What is a Reducer
// Universal transformation. All object composition can be expressed with an reducer

// instead of a.concat([c])
const collection = (a, c) => [...a, ...[c]]

const objs = [
    { a: 'a', b: 'ab' },
    { b: 'b' },
    { c: 'c', b: 'cb' }
]

const a = objs.reduce(collection, [])

// collection aggregation [ { a: 'a', b: 'ab' }, { b: 'b' }, { c: 'c', b: 'cb' } ]
console.log(
    'collection aggregation', a
)

// If you want to take an aggregation and apply to each element something, aggregation is a handy tool for that.

// Transport mechanism could be an array, stream, anything underlying it. It iterates over each item in the collection, stream, aggregation and combines it with the accumulator

// A linked list is a tree made up of pairs of values, the current value of the current node and then a link to the rest of the values. Its basically a tree structure. Linked collection of pairs!

// [value, link] -> [value, link] ...

// a = accumulator
const pair = (a, b) => [b, a]

const l = objs.reduceRight(pair, [])

// linked list aggregation [{"a":"a","b":"ab"},[{"b":"b"},[{"c":"c","b":"cb"},[]]]]
console.log(
    'linked list aggregation', JSON.stringify(l)
)
