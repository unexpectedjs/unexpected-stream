---
template: default.ejs
theme: dark
title: unexpected-stream
repository: https://github.com/unexpectedjs/unexpected-stream
---

# Unexpected-stream

Node.js stream plugin for the [Unexpected](https://unexpected.js.org/) assertion library (version 7+ required).

![Unexpected stream](logoImage.png)

[![NPM version](https://badge.fury.io/js/unexpected-stream.svg)](http://badge.fury.io/js/unexpected-stream)
[![Build Status](https://travis-ci.org/unexpectedjs/unexpected-stream.svg?branch=master)](https://travis-ci.org/unexpectedjs/unexpected-stream)
[![Coverage Status](https://coveralls.io/repos/unexpectedjs/unexpected-stream/badge.svg)](https://coveralls.io/r/unexpectedjs/unexpected-stream)
[![Dependency Status](https://david-dm.org/unexpectedjs/unexpected-stream.svg)](https://david-dm.org/unexpectedjs/unexpected-stream)

```js#async:true
return expect(
  ['abc', 'def'],
  'when piped through',
  require('zlib').Gzip(),
  'to yield output satisfying',
  Buffer([0x04, 0x08])
);
```

```output
expected [ 'abc', 'def' ]
when piped through Gzip to yield output satisfying Buffer([0x04, 0x08])
  expected Gzip to yield output satisfying Buffer([0x04, 0x08])
    expected Buffer([0x1F, 0x8B, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0x4B, 0x4C, 0x4A, 0x4E, 0x49, 0x4D /* 10 more */ ])
    to equal Buffer([0x04, 0x08])

    -1F 8B 08 00 00 00 00 00 00 03 4B 4C 4A 4E 49 4D  │..........KLJNIM│
    -03 00 EF 39 8E 4B 06 00 00 00                    │...9.K....│
    +04 08                                            │..│
```

```js#async:true
return expect(
  require('fs').createReadStream('README.md', { encoding: 'utf-8' }),
  'to yield output satisfying',
  /Node\.js stream plugin/
);
```

License
-------

Unexpected-stream is licensed under a standard 3-clause BSD license -- see
the `LICENSE` file for details.
