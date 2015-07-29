Asserts that a stream produces output chunks [satisfying](http://unexpected.js.org/assertions/any/to-satisfy/) a spec.

The output will be concatenated to either a single Buffer or string, depending on what the stream outputs.

```js#async:true
return expect(
  require('fs').createReadStream('README.md'),
  'to yield chunks satisfying',
  [
    expect.it('when decoded as', 'ascii', 'to contain', 'stream plugin')
  ]
);
```
