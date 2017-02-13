Asserts that a stream emits the 'error' event.

```js#async:true
return expect(require('fs').createReadStream('nonexistent.md'), 'to error');
```

The error instance will be provided as the fulfillment value:

```js#async:true
return expect(require('fs').createReadStream('nonexistent.md'), 'to error')
    .then(function (err) {
        expect(err.message, 'to contain', 'foo');
    });
```

```output
expected 'ENOENT: no such file or directory, open \'nonexistent.md\''
to contain 'foo'

ENOENT: no such file or directory, open 'nonexistent.md'
```

If the stream does not fail, the assertion will fail:

```js#async:true
return expect(require('fs').createReadStream('README.md'), 'to error');
```

```output
Stream was supposed to fail, but ended correctly
```
