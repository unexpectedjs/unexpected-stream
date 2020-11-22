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
var base64Stream = require('base64-stream');

return expect(
  ['Zm9vYm', 'FyCg=='],
  'when piped through',
  new base64Stream.Base64Decode(),
  'to yield output satisfying',
  Buffer.from([0x66, 0x6f, 0x6f])
);
```

```output
expected [ 'Zm9vYm', 'FyCg==' ]
when piped through Base64Decode to yield output satisfying Buffer.from([0x66, 0x6F, 0x6F])
  expected Base64Decode to yield output satisfying Buffer.from([0x66, 0x6F, 0x6F])
    expected Buffer.from([0x66, 0x6F, 0x6F, 0x62, 0x61, 0x72, 0x0A])
    to equal Buffer.from([0x66, 0x6F, 0x6F])

    -66 6F 6F 62 61 72 0A                             │foobar.│
    +66 6F 6F                                         │foo│
```

```js#async:true
return expect(
  require('fs').createReadStream('README.md', { encoding: 'utf-8' }),
  'to yield output satisfying',
  /Node\.js stream plugin/
);
```

## Releases

[Changelog](https://github.com/unexpectedjs/unexpected-stream/blob/master/CHANGELOG.md)

## License

Unexpected-stream is licensed under a standard 3-clause BSD license -- see
the `LICENSE` file for details.
