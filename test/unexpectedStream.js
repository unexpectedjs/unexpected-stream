/* global describe, it, setImmediate, __dirname */
const unexpected = require('unexpected');
const pathModule = require('path');
const streamModule = require('stream');
const EventEmitter = require('events').EventEmitter;
const fs = require('fs');
const zlib = require('zlib');
const { Base64Encode } = require('base64-stream');

describe('unexpected-stream', () => {
  const expect = unexpected
    .clone()
    .installPlugin(require('../lib/unexpectedStream'));

  const fooTxtPath = pathModule.resolve(__dirname, '..', 'testdata', 'foo.txt');

  expect.output.preferredWidth = 150;

  expect.addAssertion(
    '<any> to inspect as <string>',
    (expect, subject, value) => {
      expect(expect.inspect(subject).toString(), 'to equal', value);
    }
  );

  it('should identify a stream-like object with a readable property of true', () => {
    expect(
      expect.getType('Stream').identify({ on() {}, readable: true }),
      'to be true'
    );
  });

  it('should identify a stream-like object with a writable property of true', () => {
    expect(
      expect.getType('Stream').identify({ on() {}, writable: true }),
      'to be true'
    );
  });

  it('should inspect a stream as the constructor name', () => {
    const stream = new EventEmitter();
    stream.readable = true;
    expect(stream, 'to inspect as', 'EventEmitter');
  });

  if (parseInt(process.version.match(/v(\d+)\./)[1], 10) < 6) {
    // In node.js 6+ it comes out as "Constructor", which is actually better
    it('should inspect a stream as "Stream" if the constructor is anonymous', () => {
      const Constructor = () => {};
      Constructor.prototype.readable = true;
      Constructor.prototype.on = () => {};
      expect(new Constructor(), 'to inspect as', 'Stream');
    });
  }

  describe('to yield output satisfying', () => {
    it('should buffer up the output of a readable stream that outputs buffers', () =>
      expect(
        fs.createReadStream(fooTxtPath),
        'to yield output satisfying',
        Buffer.from('foobarquux\n', 'utf-8')
      ));

    it('should buffer up the output of a readable stream that outputs strings', () =>
      expect(
        fs.createReadStream(fooTxtPath, { encoding: 'utf-8' }),
        'to yield output satisfying',
        'to equal',
        'foobarquux\n'
      ));

    it('fails with a diff', () =>
      expect(
        expect(
          fs.createReadStream(fooTxtPath, { encoding: 'utf-8' }),
          'to yield output satisfying',
          'to equal',
          'blah\n'
        ),
        'to be rejected with',
        "expected ReadStream to yield output satisfying to equal 'blah\\n'\n" +
          "  expected 'foobarquux\\n' to equal 'blah\\n'\n" +
          '\n' +
          '  -foobarquux\n' +
          '  +blah'
      ));

    it('should be able to assert the output of the same stream multiple times', () => {
      const readStream = fs.createReadStream(fooTxtPath, { encoding: 'utf-8' });
      return expect.promise
        .all([
          expect(
            readStream,
            'to yield output satisfying',
            'to equal',
            'foobarquux\n'
          ),
          expect(
            readStream,
            'to yield output satisfying',
            'to equal',
            'foobarquux\n'
          )
        ])
        .then(() =>
          expect(
            readStream,
            'to yield output satisfying',
            'to equal',
            'foobarquux\n'
          )
        );
    });

    it('should convert to Buffer when a readable stream outputs both Buffer and string chunks', () => {
      const stream = new EventEmitter();
      stream.readable = true;
      setImmediate(() => {
        stream.emit('data', 'foo');
        stream.emit('data', Buffer.from('bar'));
        stream.emit('end');
      });
      return expect(
        stream,
        'to yield output satisfying',
        Buffer.from('foobar')
      );
    });
  });

  describe('to yield chunks', () => {
    it('should produce an array of the raw chunks', () => {
      const stream = new streamModule.Readable();

      let n = 0;
      stream._read = () => {
        let chunk = null;
        if (n < 4) {
          chunk = `chunk${n}`;
          n += 1;
        }
        setImmediate(() => {
          stream.push(chunk);
        });
      };
      return expect(stream, 'to yield chunks satisfying', [
        Buffer.from('chunk0', 'utf-8'),
        Buffer.from('chunk1', 'utf-8'),
        Buffer.from('chunk2', 'utf-8'),
        Buffer.from('chunk3', 'utf-8')
      ]);
    });
  });

  describe('when piped through assertion', () => {
    it('should pipe the data through the proxy stream', () =>
      expect(
        fs.createReadStream(fooTxtPath),
        'when piped through',
        new Base64Encode(),
        'to yield output satisfying to equal',
        'Zm9vYmFycXV1eAo='
      ));

    it('should pipe the data through multiple proxy streams', () =>
      expect(
        fs.createReadStream(fooTxtPath),
        'when piped through',
        [zlib.createGzip(), zlib.createGunzip()],
        'to yield output satisfying',
        Buffer.from('foobarquux\n', 'utf-8')
      ));

    describe('with a Buffer instance', () => {
      it('should succeed', () =>
        expect(
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
            0x4b,
            0xcb,
            0xcf,
            0x4f,
            0x4a,
            0x2c,
            0x2a,
            0x2c,
            0x2d,
            0xad,
            0xe0,
            0x02,
            0x00,
            0xc8,
            0x99,
            0x6f,
            0x44,
            0x0b,
            0x00,
            0x00,
            0x00
          ]),
          'when piped through',
          zlib.createGunzip(),
          'to yield output satisfying',
          Buffer.from('foobarquux\n', 'utf-8')
        ));

      it('fails with a diff', () =>
        expect(
          expect(
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
              0x4b,
              0xcb,
              0xcf,
              0x4f,
              0x4a,
              0x2c,
              0x2a,
              0x2c,
              0x2d,
              0xad,
              0xe0,
              0x02,
              0x00,
              0xc8,
              0x99,
              0x6f,
              0x44,
              0x0b,
              0x00,
              0x00,
              0x00
            ]),
            'when piped through',
            zlib.createGunzip(),
            'to yield output satisfying',
            Buffer.from('foobarqux', 'utf-8')
          ),
          'to be rejected with',
          'expected Buffer.from([0x1F, 0x8B, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0x4B, 0xCB, 0xCF, 0x4F, 0x4A, 0x2C /* 15 more */ ])\n' +
            'when piped through Gunzip to yield output satisfying Buffer.from([0x66, 0x6F, 0x6F, 0x62, 0x61, 0x72, 0x71, 0x75, 0x78])\n' +
            '  expected Gunzip to yield output satisfying Buffer.from([0x66, 0x6F, 0x6F, 0x62, 0x61, 0x72, 0x71, 0x75, 0x78])\n' +
            '    expected Buffer.from([0x66, 0x6F, 0x6F, 0x62, 0x61, 0x72, 0x71, 0x75, 0x75, 0x78, 0x0A])\n' +
            '    to equal Buffer.from([0x66, 0x6F, 0x6F, 0x62, 0x61, 0x72, 0x71, 0x75, 0x78])\n' +
            '\n' +
            '    -66 6F 6F 62 61 72 71 75 75 78 0A                 │foobarquux.│\n' +
            '    +66 6F 6F 62 61 72 71 75 78                       │foobarqux│'
        ));
    });

    describe('with a string', () => {
      it('should succeed', () =>
        expect(
          'foobarquux\n',
          'when piped through',
          new Base64Encode(),
          'to yield output satisfying to equal',
          'Zm9vYmFycXV1eAo='
        ));
    });

    describe('with an array of strings', () => {
      it('should succeed', () =>
        expect(
          ['foo', 'bar', 'quux\n'],
          'when piped through',
          new Base64Encode(),
          'to yield output satisfying to equal',
          'Zm9vYmFycXV1eAo='
        ));

      it('fails with a diff', () =>
        expect(
          expect(
            ['f', 'oo'],
            'when piped through',
            new Base64Encode(),
            'to yield output satisfying to equal',
            'blah'
          ),
          'to be rejected with',
          "expected [ 'f', 'oo' ] when piped through Base64Encode to yield output satisfying to equal 'blah'\n" +
            "  expected Base64Encode to yield output satisfying to equal 'blah'\n" +
            "    expected 'Zm9v' to equal 'blah'\n" +
            '\n' +
            '    -Zm9v\n' +
            '    +blah'
        ));
    });

    describe('with an array of Buffer instances', () => {
      it('should succeed', () =>
        expect(
          [
            Buffer.from('foo', 'utf-8'),
            Buffer.from('bar', 'utf-8'),
            Buffer.from('quux\n', 'utf-8')
          ],
          'when piped through',
          new Base64Encode(),
          'to yield output satisfying to equal',
          'Zm9vYmFycXV1eAo='
        ));
    });

    it('should provide the target stream as the fulfillment value', () =>
      expect(
        fs.createReadStream(fooTxtPath),
        'piped through',
        zlib.createGzip()
      ).then(targetStream => {
        expect(targetStream, 'to be a', require('zlib').Gzip);
      }));
  });

  describe('to error assertion', () => {
    describe('when the stream errors', () => {
      it('should provide the error as the fulfillment value', () => {
        const stream = new EventEmitter();
        const err = new Error('ugh');
        stream.readable = stream.writable = true;
        setImmediate(() => {
          stream.emit('error', err);
        });
        stream.end = () => {};
        return expect(expect(stream, 'to error'), 'to be fulfilled with', err);
      });
    });

    describe('when the stream succeeds', () => {
      it('should fail', () => {
        const stream = new EventEmitter();
        stream.readable = stream.writable = true;
        setImmediate(() => {
          stream.emit('data', 'foo');
          stream.emit('end');
        });
        return expect(
          () => expect(stream, 'to error'),
          'to error with',
          'Stream was supposed to fail, but ended correctly'
        );
      });
    });
  });

  describe('to error with', () => {
    describe('when the stream errors', () => {
      it('should succeed', () => {
        const stream = new EventEmitter();
        const err = new Error('ugh');
        stream.readable = stream.writable = true;
        setImmediate(() => {
          stream.emit('error', err);
        });
        stream.end = () => {};
        expect(stream, 'to error with', err);
      });

      it('should fail with a diff', () => {
        const stream = new EventEmitter();
        const err = new Error('ugh');
        stream.readable = stream.writable = true;
        setImmediate(() => {
          stream.emit('error', err);
        });
        stream.end = () => {};
        return expect(
          () => expect(stream, 'to error with', 'blabla'),
          'to error with',
          "expected EventEmitter to error with 'blabla'\n" +
            "  expected Error('ugh') to satisfy 'blabla'\n" +
            '\n' +
            '  -ugh\n' +
            '  +blabla'
        );
      });
    });

    describe('when the stream succeeds', () => {
      it('should fail', () => {
        const stream = new EventEmitter();
        stream.readable = stream.writable = true;
        setImmediate(() => {
          stream.emit('data', 'foo');
          stream.emit('end');
        });
        return expect(
          () => expect(stream, 'to error with', 'foo'),
          'to error with',
          'Stream was supposed to fail, but ended correctly'
        );
      });
    });
  });
});
