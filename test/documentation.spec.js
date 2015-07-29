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

    it("assertions/Buffer/when-piped-through.md contains correct examples", function () {
        var testPromises = [];
        testPromises.push(expect.promise(function () {
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
        }));

        testPromises.push(expect.promise(function () {
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
        }).then(function () {
            return expect.promise(function () {
                expect.fail(function (output) {
                    output.error("expected:").nl();
                    output.code("return expect(").nl();
                    output.code("  new Buffer('yadda'),").nl();
                    output.code("  'when piped through',").nl();
                    output.code("  [").nl();
                    output.code("      require('zlib').Gzip(),").nl();
                    output.code("      require('zlib').Gunzip()").nl();
                    output.code("  ],").nl();
                    output.code("  'to yield output satisfying',").nl();
                    output.code("  new Buffer('yaddayadda')").nl();
                    output.code(");").nl();
                    output.error("to throw");
                });
            });
        }).caught(function (e) {
            expect(e, "to have message",
                "expected Buffer([0x79, 0x61, 0x64, 0x64, 0x61])\n" +
                "when piped through [ Gzip, Gunzip ], 'to yield output satisfying', Buffer([0x79, 0x61, 0x64, 0x64, 0x61, 0x79, 0x61, 0x64, 0x64, 0x61])\n" +
                "  expected Gunzip to yield output satisfying Buffer([0x79, 0x61, 0x64, 0x64, 0x61, 0x79, 0x61, 0x64, 0x64, 0x61])\n" +
                "    expected Buffer([0x79, 0x61, 0x64, 0x64, 0x61])\n" +
                "    to satisfy Buffer([0x79, 0x61, 0x64, 0x64, 0x61, 0x79, 0x61, 0x64, 0x64, 0x61])\n" +
                "\n" +
                "    -79 61 64 64 61                                   │yadda│\n" +
                "    +79 61 64 64 61 79 61 64 64 61                    │yaddayadda│"
            );
        }));

        return expect.promise.all(testPromises);
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

    it("assertions/Stream/when-piped-through.md contains correct examples", function () {
        var testPromises = [];
        testPromises.push(expect.promise(function () {
            return expect(
              require('fs').createReadStream('LICENSE'),
              'when piped through',
              require('zlib').Gzip(),
              'to yield output satisfying',
              'to have length', 792
            );
        }));

        testPromises.push(expect.promise(function () {
            return expect(
              require('fs').createReadStream('LICENSE'),
              'when piped through',
              [
                  require('zlib').Gzip(),
                  require('zlib').Gunzip()
              ],
              'to yield output satisfying',
              'when decoded as', 'ascii',
              'not to contain', 'IMPLIED WARRANTIES'
            );
        }).then(function () {
            return expect.promise(function () {
                expect.fail(function (output) {
                    output.error("expected:").nl();
                    output.code("return expect(").nl();
                    output.code("  require('fs').createReadStream('LICENSE'),").nl();
                    output.code("  'when piped through',").nl();
                    output.code("  [").nl();
                    output.code("      require('zlib').Gzip(),").nl();
                    output.code("      require('zlib').Gunzip()").nl();
                    output.code("  ],").nl();
                    output.code("  'to yield output satisfying',").nl();
                    output.code("  'when decoded as', 'ascii',").nl();
                    output.code("  'not to contain', 'IMPLIED WARRANTIES'").nl();
                    output.code(");").nl();
                    output.error("to throw");
                });
            });
        }).caught(function (e) {
            expect(e, "to have message",
                "expected ReadStream\n" +
                "when piped through [ Gzip, Gunzip ], 'to yield output satisfying', 'when decoded as', 'ascii', 'not to contain', 'IMPLIED WARRANTIES'\n" +
                "  expected Gunzip to yield output satisfying 'when decoded as', 'ascii', 'not to contain', 'IMPLIED WARRANTIES'\n" +
                "    expected Buffer([0x43, 0x6F, 0x70, 0x79, 0x72, 0x69, 0x67, 0x68, 0x74, 0x20, 0x28, 0x63, 0x29, 0x20, 0x32, 0x30 /* 1478 more */ ])\n" +
                "    when decoded as 'ascii' not to contain 'IMPLIED WARRANTIES'\n" +
                "\n" +
                "    Copyright (c) 2015, Andreas Lind\n" +
                "    All rights reserved.\n" +
                "\n" +
                "    Redistribution and use in source and binary forms, with or without\n" +
                "    modification, are permitted provided that the following conditions are\n" +
                "    met:\n" +
                "\n" +
                "      * Redistributions of source code must retain the above copyright\n" +
                "        notice, this list of conditions and the following disclaimer.\n" +
                "      * Redistributions in binary form must reproduce the above copyright\n" +
                "        notice, this list of conditions and the following disclaimer in\n" +
                "        the documentation and/or other materials provided with the\n" +
                "        distribution.\n" +
                "      * Neither the name of the author nor the names of contributors may\n" +
                "        be used to endorse or promote products derived from this\n" +
                "        software without specific prior written permission.\n" +
                "\n" +
                "    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS \"AS\n" +
                "    IS\" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED\n" +
                "                           ^^^^^^^^^^^^^^^^^^\n" +
                "    TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A\n" +
                "            ^^^^^^^^^^^^^^^^^^\n" +
                "    PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT\n" +
                "    HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,\n" +
                "    SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT\n" +
                "    LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,\n" +
                "    DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\n" +
                "    THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n" +
                "    (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\n" +
                "    OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n" +
                ""
            );
        }));

        return expect.promise.all(testPromises);
    });

    it("assertions/array/when-piped-through.md contains correct examples", function () {
        var testPromises = [];
        testPromises.push(expect.promise(function () {
            return expect(
              ['foo', 'bar'],
              'when piped through',
              require('zlib').Gzip(),
              'to yield output satisfying',
              'to have length', 26
            );
        }));

        testPromises.push(expect.promise(function () {
            return expect(
              [new Buffer([0x01, 0x02]), new Buffer([0x03, 0x04])],
              'when piped through',
              [
                  require('zlib').Gzip(),
                  require('zlib').Gunzip()
              ],
              'to yield output satisfying',
              new Buffer([0x01, 0x02, 0x03, 0x04, 0x05])
            );
        }).then(function () {
            return expect.promise(function () {
                expect.fail(function (output) {
                    output.error("expected:").nl();
                    output.code("return expect(").nl();
                    output.code("  [new Buffer([0x01, 0x02]), new Buffer([0x03, 0x04])],").nl();
                    output.code("  'when piped through',").nl();
                    output.code("  [").nl();
                    output.code("      require('zlib').Gzip(),").nl();
                    output.code("      require('zlib').Gunzip()").nl();
                    output.code("  ],").nl();
                    output.code("  'to yield output satisfying',").nl();
                    output.code("  new Buffer([0x01, 0x02, 0x03, 0x04, 0x05])").nl();
                    output.code(");").nl();
                    output.error("to throw");
                });
            });
        }).caught(function (e) {
            expect(e, "to have message",
                "expected [ Buffer([0x01, 0x02]), Buffer([0x03, 0x04]) ]\n" +
                "when piped through [ Gzip, Gunzip ], 'to yield output satisfying', Buffer([0x01, 0x02, 0x03, 0x04, 0x05])\n" +
                "  expected Gunzip to yield output satisfying Buffer([0x01, 0x02, 0x03, 0x04, 0x05])\n" +
                "    expected Buffer([0x01, 0x02, 0x03, 0x04]) to satisfy Buffer([0x01, 0x02, 0x03, 0x04, 0x05])\n" +
                "\n" +
                "    -01 02 03 04                                      │....│\n" +
                "    +01 02 03 04 05                                   │.....│"
            );
        }));

        return expect.promise.all(testPromises);
    });

    it("assertions/string/when-piped-through.md contains correct examples", function () {
        var testPromises = [];
        testPromises.push(expect.promise(function () {
            return expect(
              'foobarquux',
              'when piped through',
              require('zlib').Gzip(),
              'to yield output satisfying',
              'to have length', 30
            );
        }));

        testPromises.push(expect.promise(function () {
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
        }).then(function () {
            return expect.promise(function () {
                expect.fail(function (output) {
                    output.error("expected:").nl();
                    output.code("return expect(").nl();
                    output.code("  'How about that',").nl();
                    output.code("  'when piped through',").nl();
                    output.code("  [").nl();
                    output.code("      require('zlib').Gzip(),").nl();
                    output.code("      require('zlib').Gunzip()").nl();
                    output.code("  ],").nl();
                    output.code("  'to yield output satisfying',").nl();
                    output.code("  'when decoded as', 'utf-8',").nl();
                    output.code("  'not to contain', 'about'").nl();
                    output.code(");").nl();
                    output.error("to throw");
                });
            });
        }).caught(function (e) {
            expect(e, "to have message",
                "expected 'How about that'\n" +
                "when piped through [ Gzip, Gunzip ], 'to yield output satisfying', 'when decoded as', 'utf-8', 'not to contain', 'about'\n" +
                "  expected Gunzip to yield output satisfying 'when decoded as', 'utf-8', 'not to contain', 'about'\n" +
                "    expected Buffer([0x48, 0x6F, 0x77, 0x20, 0x61, 0x62, 0x6F, 0x75, 0x74, 0x20, 0x74, 0x68, 0x61, 0x74])\n" +
                "    when decoded as 'utf-8' not to contain 'about'\n" +
                "\n" +
                "    How about that\n" +
                "        ^^^^^"
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
