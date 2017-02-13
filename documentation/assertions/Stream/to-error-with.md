Asserts that a stream emits the 'error' event with a value [satisfying](http://unexpected.js.org/assertions/any/to-satisfy/) a spec.

```js#async:true
return expect(
  require('fs').createReadStream('nonexistent.md'),
  'to error with', new Error('foobar')
);
```

```output
expected ReadStream to error with Error('foobar')
  expected
  Error({
    message: 'ENOENT: no such file or directory, open \'nonexistent.md\'',
    errno: -2,
    code: 'ENOENT',
    syscall: 'open',
    path: 'nonexistent.md'
  })
  to satisfy Error('foobar')

  Error({
    message: 'ENOENT: no such file or directory, open \'nonexistent.md\'', // should equal 'foobar'
                                                                           // -ENOENT: no such file or directory, open 'nonexistent.md'
                                                                           // +foobar
    errno: -2,
    code: 'ENOENT',
    syscall: 'open',
    path: 'nonexistent.md'
  })
```

If the stream does not fail, the assertion will fail:

```js#async:true
return expect(
  require('fs').createReadStream('README.md'),
  'to error with', new Error('foobar')
);
```

```output
Stream was supposed to fail, but ended correctly
```
