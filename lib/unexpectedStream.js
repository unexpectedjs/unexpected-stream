module.exports = {
    name: 'unexpected-stream',
    version: require('../package.json').version,
    installInto: function (expect) {
        expect.addType({
            name: 'Stream',
            base: 'object',
            inspect: function (obj, depth, output, inspect) {
                return output.text(obj.constructor.name, 'jsFunctionName');
            },
            identify: function (obj) {
                return obj && typeof obj.on === 'function' && (obj._readableState || typeof obj.readable === 'boolean' || typeof obj.writable === 'boolean');
            }
        });

        expect.addAssertion('<Stream|string|Buffer|array> when piped through <array|Stream> <assertion>', function (expect, subject, value) {
            expect.errorMode = 'nested';

            var extraArgs = Array.prototype.slice.call(arguments, 3);
            return expect.promise(function (resolve, reject) {
                var pipeThroughStreams = Array.isArray(value) ? value : [ value ];
                var subjectType = expect.findTypeOf(subject);
                var result;
                if (subjectType.is('Stream')) {
                    result = subject;
                    subject.on('error', reject);
                } else {
                    // string, Buffer, or array
                    (Array.isArray(subject) ? subject : [ subject ]).forEach(function (chunk) {
                        pipeThroughStreams[0].write(chunk);
                    });
                    pipeThroughStreams[0].end();
                }

                pipeThroughStreams.forEach(function (pipeThroughStream) {
                    pipeThroughStream.on('error', reject);
                    result = result ? result.pipe(pipeThroughStream) : pipeThroughStream;
                });

                return resolve(expect.apply(expect, [result, 'to satisfy assertion'].concat(extraArgs)));
            });
        });

        expect.addAssertion('<Stream> to yield (output|chunks|objects) satisfying <any+>', function (expect, subject) {
            expect.errorMode = 'nested';

            var extraArgs = Array.prototype.slice.call(arguments, 2),
                mustConcat = expect.alternations[0] === 'output';

            return expect.promise(function (resolve, reject) {
                if (!subject._unexpectedStreamChunksPromise) {
                    subject._unexpectedStreamChunksPromise = expect.promise(function (resolve, reject) {
                        expect(subject, 'to have property', 'readable', true);
                        var chunks = [];
                        subject.on('data', function (chunk) {
                            chunks.push(chunk);
                        }).on('end', function () {
                            resolve(chunks);
                        }).on('error', reject);
                    });
                }
                subject._unexpectedStreamChunksPromise.then(function (chunks) {
                    var result;
                    if (mustConcat) {
                        if (chunks.length > 0 && chunks.every(function (chunk) { return typeof chunk === 'string'; })) {
                            result = chunks.join('');
                        } else {
                            // chunks or objects (object mode)
                            result = Buffer.concat(chunks.map(function (chunk) {
                                if (typeof chunk === 'string') {
                                    return new Buffer(chunk, 'utf-8');
                                } else {
                                    return chunk;
                                }
                            }));
                        }
                    } else {
                        result = chunks;
                    }
                    resolve(result);
                });
            }).then(function (result) {
                return expect.apply(expect, [result, 'to satisfy assertion'].concat(extraArgs));
            });
        });
    }
};
