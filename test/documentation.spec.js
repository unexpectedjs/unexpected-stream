/*global unexpected*/
// THIS FILE IS AUTOGENERATED! DO NOT CHANGE IT MANUALLY.
// It is built based on the examples in the documentation folder
// when the documentation site gets build by running "make site-build".
it.skipIf = function (condition) {
    (condition ? it.skip : it).apply(it, Array.prototype.slice.call(arguments, 1));
};

describe("documentation tests", function () {
    var isBrowser = typeof weknowhow !== 'undefined';
    var isPhantom = typeof mochaPhantomJS !== 'undefined';
    var expect;
    beforeEach(function () {
        expect = unexpected.clone();
        expect.output.preferredWidth = 80;

    });

    it("assertions/Stream/to-yield-chunks-satisfying.md contains correct examples", function () {
        var testPromises = [];
        testPromises.push(expect.promise(function () {
            return expect(
              require('fs').createReadStream('README.md'),
              'to yield chunks satisfying',
              [
                expect.it('when decoded as', 'ascii', 'to contain', 'stream plugin')
              ]
            );
        }));
        return expect.promise.all(testPromises);
    });

    it("assertions/Stream/to-yield-output-satisfying.md contains correct examples", function () {
        var testPromises = [];
        testPromises.push(expect.promise(function () {
            return expect(
              require('fs').createReadStream('README.md', { encoding: 'utf-8' }),
              'to yield output satisfying',
              /Node\.js stream plugin/
            );
        }));
        return expect.promise.all(testPromises);
    });

    it("index.md contains correct examples", function () {
        var testPromises = [];
        testPromises.push(expect.promise(function () {
            var zlib = require('zlib');
            return expect(
              ['abc', 'def'],
              'when piped through',
              new zlib.Gzip(),
              'to yield output satisfying',
              Buffer([0x04, 0x08])
            );
        }).then(function () {
            return expect.promise(function () {
                expect.fail(function (output) {
                    output.error("expected:").nl();
                    output.code("var zlib = require('zlib');").nl();
                    output.code("return expect(").nl();
                    output.code("  ['abc', 'def'],").nl();
                    output.code("  'when piped through',").nl();
                    output.code("  new zlib.Gzip(),").nl();
                    output.code("  'to yield output satisfying',").nl();
                    output.code("  Buffer([0x04, 0x08])").nl();
                    output.code(");").nl();
                    output.error("to throw");
                });
            });
        }).caught(function (e) {
            expect(e, "to have message",
                "expected [ 'abc', 'def' ] when piped through Gzip, 'to yield output satisfying', Buffer([0x04, 0x08])\n" +
                "  expected Gzip to yield output satisfying Buffer([0x04, 0x08])\n" +
                "    expected Buffer([0x1F, 0x8B, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0x4B, 0x4C, 0x4A, 0x4E, 0x49, 0x4D /* 10 more */ ])\n" +
                "    to satisfy Buffer([0x04, 0x08])\n" +
                "\n" +
                "    -1F 8B 08 00 00 00 00 00 00 03 4B 4C 4A 4E 49 4D  │..........KLJNIM│\n" +
                "    -03 00 EF 39 8E 4B 06 00 00 00                    │...9.K....│\n" +
                "    +04 08                                            │..│"
            );
        }));


        testPromises.push(expect.promise(function () {
            return expect(
              require('fs').createReadStream('README.md', { encoding: 'utf-8' }),
              'to yield output satisfying',
              /Node\.js stream plugin/
            );
        }));
        return expect.promise.all(testPromises);
    });
});
