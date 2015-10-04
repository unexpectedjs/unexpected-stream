Write a Buffer to a transform stream or a sequence of transform streams,
then delegate to another assertion using the last stream as the subject.

It's intended to be used with the [to yield output satisfying](to-yield-output-satisfying/) assertion:

```js#async:true
return expect(
  new Buffer([0x00, 0x01]),
  'when piped through',
  require('zlib').Gzip(),
  'to yield output satisfying',
  new Buffer([
    0x1F, 0x8B, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0x63, 0x60, 0x04, 0x00, 0x69, 0x22,
    0xDE, 0x36, 0x02, 0x00, 0x00, 0x00
  ])
);
```

Example with multiple transform streams:

```js#async:true
return expect(
  new Buffer('yadda'),
  'when piped through',
  [
      require('zlib').Gzip(),
      require('zlib').Gunzip()
  ],
  'to yield output satisfying',
  new Buffer('yaddayadda')
);
```

```output
expected Buffer([0x79, 0x61, 0x64, 0x64, 0x61])
when piped through [ Gzip, Gunzip ] to yield output satisfying Buffer([0x79, 0x61, 0x64, 0x64, 0x61, 0x79, 0x61, 0x64, 0x64, 0x61])
  expected Gunzip
  to yield output satisfying Buffer([0x79, 0x61, 0x64, 0x64, 0x61, 0x79, 0x61, 0x64, 0x64, 0x61])
    expected Buffer([0x79, 0x61, 0x64, 0x64, 0x61])
    to equal Buffer([0x79, 0x61, 0x64, 0x64, 0x61, 0x79, 0x61, 0x64, 0x64, 0x61])

    -79 61 64 64 61                                   │yadda│
    +79 61 64 64 61 79 61 64 64 61                    │yaddayadda│
```
