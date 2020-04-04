Asserts that a stream emits the 'error' event with a value [satisfying](http://unexpected.js.org/assertions/any/to-satisfy/) a spec.

```js#async:true
return expect(
  require('fs').createReadStream('nonexistent.md'),
  'to error with',
  /ENOENT/
);
```

If the stream does not fail, the assertion will fail:

```js#async:true
return expect(
  require('fs').createReadStream('README.md'),
  'to error with',
  new Error('foobar')
);
```

```output
Stream was supposed to fail, but ended correctly
```
