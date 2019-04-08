const objs = [
  { a: 'a' },
  { b: 'b' },
  { c: 'c' }
];

const link = (a, v) => [v, a];

const linkedList = objs.reduceRight(link, []);

console.log(linkedList);

/*
<Provider>
  <Layout>
    <MyComponent>
  </Layout>
</Provider>

const pageHOC = compose(
  withProvider,
  withLayout
)(MyComponent);
*/

const call = (fn, ...args) => ({
  fn,
  args
});

function* handleFetch () {
  try {
  const user = yield call(fetch('/user'));
  yield put(setUser(user));
  } catch(err) {
    yield put(reportError(err));
  }
}
