Write an array of Buffers or strings to a transform stream or a sequence of transform streams,
then delegate to another assertion using the last stream as the subject.

Use this assertion when a certain behavior is only achievable when the input
is chunked in a certain way.

It's intended to be used with the [to yield output satisfying](to-yield-output-satisfying/) assertion:

```js#async:true
return expect(
  ['foo', 'bar'],
  'when piped through',
  require('zlib').Gzip(),
  'to yield output satisfying',
  'to have length', 26
);
```

Example with multiple transform streams:

```js#async:true
return expect(
  [new Buffer([0x01, 0x02]), new Buffer([0x03, 0x04])],
  'when piped through',
  [
      require('zlib').Gzip(),
      require('zlib').Gunzip()
  ],
  'to yield output satisfying',
  new Buffer([0x01, 0x02, 0x03, 0x04, 0x05])
);
```

```output
expected [ Buffer([0x01, 0x02]), Buffer([0x03, 0x04]) ]
when piped through [ Gzip, Gunzip ] to yield output satisfying Buffer([0x01, 0x02, 0x03, 0x04, 0x05])
  expected Gunzip to yield output satisfying Buffer([0x01, 0x02, 0x03, 0x04, 0x05])
    expected Buffer([0x01, 0x02, 0x03, 0x04])
    to equal Buffer([0x01, 0x02, 0x03, 0x04, 0x05])

    -01 02 03 04                                      │....│
    +01 02 03 04 05                                   │.....│
```

If you don't provide an assertion to delegate to, the target stream will be provided
as the fulfillment value of the promise:

```js
var zlib = require('zlib');
return expect('foobar', 'piped through', zlib.Gzip()).then(function (targetStream) {
    return expect(targetStream, 'to be a', zlib.Gzip);
});
```
