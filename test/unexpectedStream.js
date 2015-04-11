/*global describe, it, setImmediate, __dirname*/
var unexpected = require('unexpected'),
    pathModule = require('path'),
    streamModule = require('stream'),
    fs = require('fs'),
    zlib = require('zlib');

describe('unexpected-stream', function () {
    var expect = unexpected.clone().installPlugin(require('../lib/unexpectedStream')),
        fooTxtPath = pathModule.resolve(__dirname, '..', 'testdata', 'foo.txt');

    describe('to yield output', function () {
        it('should buffer up the output of a readable stream that outputs buffers', function () {
            return expect(fs.createReadStream(fooTxtPath), 'to yield output satisfying', new Buffer('foobarquux\n', 'utf-8'));
        });

        it('should buffer up the output of a readable stream that outputs strings', function () {
            return expect(fs.createReadStream(fooTxtPath, {encoding: 'utf-8'}), 'to yield output satisfying', 'to equal', 'foobarquux\n');
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
    });
});
