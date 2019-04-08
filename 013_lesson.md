```js
console.clear();

/*
Functors

A functor data type is a data type you can map over.

What is map?
A higher order operation which takes a function from a => b and applies it to data inside some computational context.

Functor laws
* Identity law: x.map(x => x) = x
* Composition law: x.map(g).map(f) = x.map(x => f(g(x)))

Fractions

Map often iterates for things like collections, trees, etc., but map isn't about iteration. It's about applying the function the way it makes sense for each particular context. (e.g., waiting for a promise to resolve, branching for errors, etc.)
*/

{
  // Identity law
  const x = [20];
  const a = x.map(x => x);
  const b = x;
  console.log('', a, b);
}

{
  // Composition
  const g = n => n + 1;
  const f = n => n * 2;
  const x = [20];
  
  const a = x.map(g).map(f)
  const b = x.map(x => f(g(x)))
  console.log('', a, b);
}

{
  const x = Promise.resolve(20);
  const a = x.then(x => x);
  const b = x;
  
  //Promise.all([a, b]).then(([a, b]) => console.log(a, b));
}

{
  // Composition
  const g = n => n + 1;
  const f = n => n * 2;
  const x = Promise.resolve(20);
  
  const a = x.then(g).then(f)
  const b = x.then(x => f(g(x)))
  //Promise.all([a, b]).then(([a, b]) => console.log(a, b));
}

// Identity Functor

const Identity = x => ({
  map: f => Identity(f(x)),
  toString: () => `Identity(${x})`
});

{
  
  // Identity law
  const x = Identity(20);
  const a = x.map(x => x);
  const b = x;
  console.log(a.toString(), b.toString());
}

{
  // Composition
  
  const g = n => n + 1;
  const f = n => n * 2;
  const x = Identity(20);
  
  const a = x.map(g).map(f)
  const b = x.map(x => f(g(x)))
  console.log(a.toString(), b.toString());
}

console.clear();
/*
Category Theory

What is a category
A collection of objects and arrows between objects.

Identity: for all objects A in category C. Id_A: A -> A
Composition: for all a -> b -> c. a -> c
Associativity of composition: (f . g) . h = f . g . h = f . (g . h)
*/

