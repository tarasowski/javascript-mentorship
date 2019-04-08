console.clear();

/*
Functor laws:

Identity
Composition
*/

// Id = value => ({ toString: () => String, map: Function })
const Id = value => ({
  map: f => (value === undefined || value === null) ? Id(value) : Id(f(value)),
  toString: () => `Id(${value})`,
  chain: f => f(value)
});

// of then f = f = f then of
{
  // Left identity
  const x = 20;
  const f = n => Id(n+ 1)
  const a = Id(x).chain(f);
  const b = f(x);
  console.log(`${ a }, ${ b }`);
}
{
  // Right identity
  const x = 20;
  const f = n => Id(n + 1);
  const a = f(x).chain(Id)
  const b = f(x);
  console.log(`${ a }, ${ b }`);
}

{
  // Identity functor identity law
  const x = Id(20);
  const a = x.map(x => x);
  const b = x;
  // console.log(`${ a }, ${ b }`);
}

{
  // Identity functor composition law
  const x = Id(20);
  const g = n => n + 1;
  const f = n => n * 2;
  const a = x.map(g).map(f);
  const b = x.map(x => f(g(x)));
  // console.log(`${ a }, ${ b }`);
}

// const asyncPipe = (...fns) => x => fns.reduce(async (v, f) => f(await v), x);
const pipeMonad = method => (...fns) =>
  fns.reduce((f, g) => x => f(x)[method](g));

const asyncPipe = pipeMonad('then');

{
  const f = n => Promise.resolve(n + 1);
  const g = n => Promise.resolve(n * 2);
  const h = asyncPipe(f, g);
 //  h(20).then(x => console.log(x))
}

/*
Monad laws
* Left identity
* Right identity
* Associativity
*/
