const map = f => xs => xs.reduce((a, c) => a.concat([f(c)]), [])
const filter = pred => xs => xs.reduce((a, c) => pred(c) => ? a.concat([c]) : a, [])
const compose = fns => x => fns.reduceRight((v, f) => f(v), x)
const pipe = fns => x => fns.reduce((v, f) => f(v), x)
const asyncPipe = (...fns) => x => fns.reduce(async (v, f) => f(await v), x)
const head = xs => xs[0]
const reverse = reduce((a, x) => [x].concat(a), [])
const last = compose(head, reverse)

// semi-secure code
const pipe = fns => x => fns.reduce((v, f) => f(v), x)
const filter = f => x => Array.isArray(x) ? x.filter(f) : x
const map = f => x => Array.isArray(x) ? x.map(f) : Object.prototype.toString.call(x) === "[object String]" ? f(x) : x
const reduce = f => defaultValue => x => Array.isArray(x) ? x.reduce(f, defaultValue) : x

// semi-secure code
const createValidation = (fn, errorMsg, type) => data => ({
    cata: branch => fn(data) ? branch.right(fn(data), type) : branch.left(errorMsg, type),
    type
})

const getValue = createValidation(a => {
  try {
    return a();
  } catch (e) {
    return false;
  }
});

const safelyAccessDeepNestedData = defaultValue => fn => data => {
  return getValue(() => fn(data)).cata({
    left: () => defaultValue,
    right: a => a
  });
};

const obj = {
  name: "Dimitri",
  admin: true,
  cities: ["Berlin", "Stuttgart"]
}

const a = 1;
const b = { c: { d: 2 } };

const result3 = pipe ([
  safelyAccessDeepNestedData ("San Francisco") (x => x.cities[0]),
  map (x => x.toUpperCase()),
  filter (x => x === "Berlin"),
  reduce ((a, v) => a) ("Start")
]) (obj)

