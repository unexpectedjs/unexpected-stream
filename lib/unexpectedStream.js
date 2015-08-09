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

        expect.addAssertion(['Stream', 'string', 'Buffer', 'array'], 'when piped through', function (expect, subject, value) {
            this.errorMode = 'nested';

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

        expect.addAssertion('Stream', 'to yield (output|chunks|objects) satisfying', function (expect, subject) {
            this.errorMode = 'nested';

            var extraArgs = Array.prototype.slice.call(arguments, 2),
                mustConcat = this.alternations[0] === 'output';

            expect(subject, 'to have property', 'readable', true);

            return expect.promise(function (resolve, reject) {
                var chunks = [];
                subject.on('data', function (chunk) {
                    chunks.push(chunk);
                }).on('end', function () {
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
                }).on('error', reject);
            }).then(function (result) {
                return expect.apply(expect, [result, 'to satisfy assertion'].concat(extraArgs));
            });
        });
    }
};