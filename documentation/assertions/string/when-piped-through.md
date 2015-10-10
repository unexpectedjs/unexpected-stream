Write a string to a transform stream or a sequence of transform streams,
then delegate to another assertion using the last stream as the subject.

It's intended to be used with the [to yield output satisfying](to-yield-output-satisfying/) assertion:

```js#async:true
return expect(
  'foobarquux',
  'when piped through',
  require('zlib').Gzip(),
  'to yield output satisfying',
  'to have length', 30
);
```

Example with multiple transform streams:

```js#async:true
return expect(
  'How about that',
  'when piped through',
  [
      require('zlib').Gzip(),
      require('zlib').Gunzip()
  ],
  'to yield output satisfying',
  'when decoded as', 'utf-8',
  'not to contain', 'about'
);
```

```output
expected 'How about that'
when piped through [ Gzip, Gunzip ] to yield output satisfying when decoded as 'utf-8' not to contain 'about'
  expected Gunzip
  to yield output satisfying when decoded as 'utf-8' not to contain 'about'
    expected Buffer([0x48, 0x6F, 0x77, 0x20, 0x61, 0x62, 0x6F, 0x75, 0x74, 0x20, 0x74, 0x68, 0x61, 0x74])
    when decoded as 'utf-8' not to contain 'about'

    How about that
        ^^^^^
```
