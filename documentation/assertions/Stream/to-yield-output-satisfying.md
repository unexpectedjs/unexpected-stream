Asserts that a stream produces output [satisfying](http://unexpected.js.org/assertions/any/to-satisfy/) a spec.

The output will be concatenated to either a single Buffer or string, depending on what the stream outputs.

```js#async:true
return expect(
  require('fs').createReadStream('README.md', { encoding: 'utf-8' }),
  'to yield output satisfying',
  /Node\.js stream plugin/
);
```
