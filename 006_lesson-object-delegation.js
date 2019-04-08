'use strict'

'use strict'

// What is delegation?

// When an object delegates to another object. We have a prototype based objects in JavaScript. It means each object has a prototype, when the property is not found on the that object, it looks to the prototype, if not found that it looks the prototype chain.
// Delegation is built-in into JavaScript. 

// Examples

// All of the built-in type of JS have prototype that have prototype that can be delegated to. [].map() deletages to Array.prototype.map()
// obj.hasOwnProperty() deltages to Object.prototype.hasOwnProperty etc.

// When to use

// 1. Conserve memory
// 2. Dynamically update many instances - use dynamic delegates

// Considerations

// Commonly used ot imitate class inheritance in JavaScript. Be carefuly not to model 'is-a' relationship
// Props from delegates are non-enumerable (Object.keys() won't see them)
// Delegation saves memory at the cost of lookup performance (probably not a problem anymore)
// Differentiate between instance state and shared state - because shared mutable state is usually a bug.
// ES classes can't create dynamic delegates

const delegate = (a, b) => Object.assign(Object.create(a), b)

const objs = [
    { a: 'a' },
    { b: 'b' },
    { c: 'c' }
]

// we use the reduceRight to build it backwards if we just use reduce it would put c at the end it would delegate to b and it would delegate to c.
const d = objs.reduceRight(delegate, {})

console.log(
    d
)
// we only see here {a: 'a'} the rest of the object is on the delegation chain, you have to expand into a prototpe, you just walk the prototype chain.
// now we have an object a, that has a prototype of b that has a prototype of c.
