unexpected-stream
=================

Node.js stream plugin for the [Unexpected](https://unexpectedjs.github.io/) assertion library (version 7+ required).

[![NPM version](https://badge.fury.io/js/unexpected-stream.png)](http://badge.fury.io/js/unexpected-stream)
[![Build Status](https://travis-ci.org/unexpectedjs/unexpected-stream.png)](https://travis-ci.org/unexpectedjs/unexpected-stream)
[![Coverage Status](https://coveralls.io/repos/unexpectedjs/unexpected-stream/badge.png)](https://coveralls.io/r/unexpectedjs/unexpected-stream)
[![Dependency Status](https://david-dm.org/unexpectedjs/unexpected-stream.png)](https://david-dm.org/unexpectedjs/unexpected-stream)

![Unexpected stream](http://www.lolzhumor.com/wp-content/uploads/2013/04/sOnmv1G.png)

```js
it('should produce the correct output', function () {
    return expect(myStream, 'to yield output satisfying', new Buffer([0x01, 0x02, 0x03));
});

it('should produce output that matches a regexp when decoded', function () {
    return expect(myStream, 'to yield output satisfying', 'when decoded as', 'utf-8', /foo.*bar/);
});

it('should produce the correct output after being piped through a proxy stream', function () {
    return expect(myStream, 'when piped through', new zlib.Gunzip(), 'to yield output satisfying', new Buffer('abcdef'));
});
```

License
-------

Unexpected-stream is licensed under a standard 3-clause BSD license -- see
the `LICENSE` file for details.
