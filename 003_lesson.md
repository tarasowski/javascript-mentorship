```js
console.clear()

const g = n => n + 1;
const f = n => n * 2;

// compose = (...args) => x => y
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
// pipe
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

// trace = label => value => value (logs label: value)
const trace = label => value => {
  console.log(`${label}: ${value}`)
  return value;
}

// f . g = f(g(x))
const h = compose(f, g);
const hp = pipe(
  g,
  trace('after g'),
  f,
  trace('after f')
);

hp(20);

// abstraction
/*
When have taken decomposition too far?

Abstraction goes two ways.

"Simplicity is about subtracting the obvious and adding the meaningful." ~ John Maeda "The Laws of Simplicity"

Generalization - finds repeated patterns (the obvious) and hides them behind an abstraction.

Specialization - Provide only _what is different_ (the meaningful) for the particular concrete use-case.

Good examples:

[].map() - hides iteration, hides building the new array, hides the fact that you're dealing with an array in the first place.
[].reduce() - hides iteration, hides data structure - can work on streams, etc...

data structure abstractions that work with streams, arrays, trees, graphs, etc...

Good abstractions are _easy_ to specialize for our particular context.

Abstraction goes two ways, -- abstracting to lower level, more generic primitives, AND specializing those abstractions to form easier to use higher-level composites.
*/

```
