Asserts that a stream produces output chunks [satisfying](http://unexpected.js.org/assertions/any/to-satisfy/) a spec.

The chunks are made available as an array with entries corresponding to the `data` events emitted by the stream.

```js#async:true
return expect(
  require('fs').createReadStream('README.md'),
  'to yield chunks satisfying',
  [
    expect.it('when decoded as', 'ascii', 'to contain', 'stream plugin')
  ]
);
```
