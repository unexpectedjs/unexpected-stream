/*global describe, it, setImmediate, __dirname*/
var unexpected = require('unexpected'),
    pathModule = require('path'),
    streamModule = require('stream'),
    fs = require('fs'),
    zlib = require('zlib');

describe('unexpected-stream', function () {
    var expect = unexpected.clone().installPlugin(require('../lib/unexpectedStream')),
        fooTxtPath = pathModule.resolve(__dirname, '..', 'testdata', 'foo.txt');

    expect.output.preferredWidth = 150;

    describe('to yield output satisfying', function () {
        it('should buffer up the output of a readable stream that outputs buffers', function () {
            return expect(fs.createReadStream(fooTxtPath), 'to yield output satisfying', new Buffer('foobarquux\n', 'utf-8'));
        });

        it('should buffer up the output of a readable stream that outputs strings', function () {
            return expect(fs.createReadStream(fooTxtPath, {encoding: 'utf-8'}), 'to yield output satisfying', 'to equal', 'foobarquux\n');
        });

        it('fails with a diff', function () {
            return expect(
                expect(fs.createReadStream(fooTxtPath, {encoding: 'utf-8'}), 'to yield output satisfying', 'to equal', 'blah\n'),
                'to be rejected with',
                    "expected ReadStream to yield output satisfying 'to equal', 'blah\\n'\n" +
                    "  expected 'foobarquux\\n' to equal 'blah\\n'\n" +
                    "\n" +
                    "  -foobarquux\n" +
                    "  +blah"
            );
        });

        it('should be able to assert the output of the same stream multiple times', function () {
            var readStream = fs.createReadStream(fooTxtPath, {encoding: 'utf-8'});
            return expect.promise.all([
                expect(readStream, 'to yield output satisfying', 'to equal', 'foobarquux\n'),
                expect(readStream, 'to yield output satisfying', 'to equal', 'foobarquux\n')
            ]).then(function () {
                return expect(readStream, 'to yield output satisfying', 'to equal', 'foobarquux\n');
            });
        });
    });

    describe('to yield chunks', function () {
        it('should produce an array of the raw chunks', function () {
            var stream = new streamModule.Readable(),
                n = 0;
            stream._read = function () {
                var chunk = null;
                if (n < 4) {
                    chunk = 'chunk' + n;
                    n += 1;
                }
                setImmediate(function () {
                    stream.push(chunk);
                });
            };
            return expect(stream, 'to yield chunks satisfying', [
                new Buffer('chunk0', 'utf-8'),
                new Buffer('chunk1', 'utf-8'),
                new Buffer('chunk2', 'utf-8'),
                new Buffer('chunk3', 'utf-8')
            ]);
        });
    });

    describe('when piped through assertion', function () {
        it('should pipe the data through the proxy stream', function () {
            return expect(
                fs.createReadStream(fooTxtPath),
                'when piped through',
                zlib.createGzip(),
                'to yield output satisfying',
                new Buffer([0x1F, 0x8B, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0x4B, 0xCB, 0xCF, 0x4F, 0x4A, 0x2C, 0x2A, 0x2C, 0x2D, 0xAD, 0xE0, 0x02, 0x00, 0xC8, 0x99, 0x6F, 0x44, 0x0B, 0x00, 0x00, 0x00])
            );
        });

        it('should pipe the data through multiple proxy streams', function () {
            return expect(
                fs.createReadStream(fooTxtPath),
                'when piped through',
                [zlib.createGzip(), zlib.createGunzip()],
                'to yield output satisfying',
                new Buffer('foobarquux\n', 'utf-8')
            );
        });

        describe('with a Buffer instance', function () {
            it('should succeed', function () {
                return expect(
                    new Buffer('foobarquux\n', 'utf-8'),
                    'when piped through',
                    zlib.createGzip(),
                    'to yield output satisfying',
                    new Buffer([0x1F, 0x8B, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0x4B, 0xCB, 0xCF, 0x4F, 0x4A, 0x2C, 0x2A, 0x2C, 0x2D, 0xAD, 0xE0, 0x02, 0x00, 0xC8, 0x99, 0x6F, 0x44, 0x0B, 0x00, 0x00, 0x00])
                );
            });

            it('fails with a diff', function () {
                return expect(
                    expect(
                        new Buffer('foobarqux', 'utf-8'),
                        'when piped through',
                        zlib.createGzip(),
                        'to yield output satisfying',
                        new Buffer([0x1F, 0x8B, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0x4B, 0xCB, 0xCF, 0x4F, 0x4A, 0x2C, 0x2A, 0x2C, 0x2D, 0xAD, 0xE0, 0x02, 0x00, 0xC8, 0x99, 0x6F, 0x44, 0x0B, 0x00, 0x00, 0x00])

                    ),
                    'to be rejected with',
                        "expected Buffer([0x66, 0x6F, 0x6F, 0x62, 0x61, 0x72, 0x71, 0x75, 0x78])\n" +
                        "when piped through Gzip, 'to yield output satisfying', Buffer([0x1F, 0x8B, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0x4B, 0xCB, 0xCF, 0x4F, 0x4A, 0x2C /* 15 more */ ])\n" +
                        "  expected Gzip\n" +
                        "  to yield output satisfying Buffer([0x1F, 0x8B, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0x4B, 0xCB, 0xCF, 0x4F, 0x4A, 0x2C /* 15 more */ ])\n" +
                        "    expected Buffer([0x1F, 0x8B, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0x4B, 0xCB, 0xCF, 0x4F, 0x4A, 0x2C /* 13 more */ ])\n" +
                        "    to satisfy Buffer([0x1F, 0x8B, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0x4B, 0xCB, 0xCF, 0x4F, 0x4A, 0x2C /* 15 more */ ])\n" +
                        "\n" +
                        "     1F 8B 08 00 00 00 00 00 00 03 4B CB CF 4F 4A 2C  │..........K..OJ,│\n" +
                        "    -2A 2C AD 00 00 FA 8C B8 C4 09 00 00 00           │*,...........│\n" +
                        "    +2A 2C 2D AD E0 02 00 C8 99 6F 44 0B 00 00 00     │*,-......oD....│"
                );
            });
        });

        describe('with a string', function () {
            it('should succeed', function () {
                return expect(
                    'foobarquux\n',
                    'when piped through',
                    zlib.createGzip(),
                    'to yield output satisfying',
                    new Buffer([0x1F, 0x8B, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0x4B, 0xCB, 0xCF, 0x4F, 0x4A, 0x2C, 0x2A, 0x2C, 0x2D, 0xAD, 0xE0, 0x02, 0x00, 0xC8, 0x99, 0x6F, 0x44, 0x0B, 0x00, 0x00, 0x00])
                );
            });
        });

        describe('with an array of strings', function () {
            it('should succeed', function () {
                return expect(
                    [ 'foo', 'bar', 'quux\n' ],
                    'when piped through',
                    zlib.createGzip(),
                    'to yield output satisfying',
                    new Buffer([0x1F, 0x8B, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0x4B, 0xCB, 0xCF, 0x4F, 0x4A, 0x2C, 0x2A, 0x2C, 0x2D, 0xAD, 0xE0, 0x02, 0x00, 0xC8, 0x99, 0x6F, 0x44, 0x0B, 0x00, 0x00, 0x00])
                );
            });

            it('fails with a diff', function () {
                return expect(
                    expect(
                        [ 'f', 'oo' ],
                        'when piped through',
                        zlib.createGzip(),
                        'to yield output satisfying',
                        new Buffer([0x03, 0x4B, 0xCB, 0xCF, 0x4F, 0x4A, 0x2C])

                    ),
                    'to be rejected with',
                        "expected [ 'f', 'oo' ] when piped through Gzip, 'to yield output satisfying', Buffer([0x03, 0x4B, 0xCB, 0xCF, 0x4F, 0x4A, 0x2C])\n" +
                        "  expected Gzip to yield output satisfying Buffer([0x03, 0x4B, 0xCB, 0xCF, 0x4F, 0x4A, 0x2C])\n" +
                        "    expected Buffer([0x1F, 0x8B, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0x4B, 0xCB, 0xCF, 0x07, 0x00, 0x21 /* 7 more */ ])\n" +
                        "    to satisfy Buffer([0x03, 0x4B, 0xCB, 0xCF, 0x4F, 0x4A, 0x2C])\n" +
                        "\n" +
                        "    -1F 8B 08 00 00 00 00 00 00 03 4B CB CF 07 00 21  │..........K....!│\n" +
                        "    -65 73 8C 03 00 00 00                             │es.....│\n" +
                        "    +03 4B CB CF 4F 4A 2C                             │.K..OJ,│"
                );
            });
        });

        describe('with an array of Buffer instances', function () {
            it('should succeed', function () {
                return expect(
                    [ new Buffer('foo', 'utf-8'), new Buffer('bar', 'utf-8'), new Buffer('quux\n', 'utf-8') ],
                    'when piped through',
                    zlib.createGzip(),
                    'to yield output satisfying',
                    new Buffer([0x1F, 0x8B, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0x4B, 0xCB, 0xCF, 0x4F, 0x4A, 0x2C, 0x2A, 0x2C, 0x2D, 0xAD, 0xE0, 0x02, 0x00, 0xC8, 0x99, 0x6F, 0x44, 0x0B, 0x00, 0x00, 0x00])
                );
            });
        });
    });
});
