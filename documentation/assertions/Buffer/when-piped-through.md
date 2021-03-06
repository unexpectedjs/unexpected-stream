Write a Buffer to a transform stream or a sequence of transform streams,
then delegate to another assertion using the last stream as the subject.

It's intended to be used with the [to yield output satisfying](to-yield-output-satisfying/) assertion:

```js#async:true
return expect(
  Buffer.from([
    0x1f,
    0x8b,
    0x08,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x03,
    0x63,
    0x60,
    0x04,
    0x00,
    0x69,
    0x22,
    0xde,
    0x36,
    0x02,
    0x00,
    0x00,
    0x00,
  ]),
  'when piped through',
  require('zlib').Gunzip(),
  'to yield output satisfying',
  Buffer.from([0x00, 0x01])
);
```

Example with multiple transform streams:

```js#async:true
return expect(
  Buffer.from('yadda'),
  'when piped through',
  [require('zlib').Gzip(), require('zlib').Gunzip()],
  'to yield output satisfying',
  Buffer.from('yaddayadda')
);
```

```output
expected Buffer.from([0x79, 0x61, 0x64, 0x64, 0x61])
when piped through [ Gzip, Gunzip ] to yield output satisfying Buffer.from([0x79, 0x61, 0x64, 0x64, 0x61, 0x79, 0x61, 0x64, 0x64, 0x61])
  expected Gunzip
  to yield output satisfying Buffer.from([0x79, 0x61, 0x64, 0x64, 0x61, 0x79, 0x61, 0x64, 0x64, 0x61])
    expected Buffer.from([0x79, 0x61, 0x64, 0x64, 0x61])
    to equal Buffer.from([0x79, 0x61, 0x64, 0x64, 0x61, 0x79, 0x61, 0x64, 0x64, 0x61])

    -79 61 64 64 61                                   │yadda│
    +79 61 64 64 61 79 61 64 64 61                    │yaddayadda│
```
