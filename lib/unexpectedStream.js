module.exports = {
  name: 'unexpected-stream',
  version: require('../package.json').version,
  installInto: function(expect) {
    expect.addType({
      name: 'Stream',
      base: 'object',
      inspect: function(obj, depth, output, inspect) {
        output.text(
          (obj.constructor && obj.constructor.name) || 'Stream',
          'jsFunctionName'
        );
      },
      identify: function(obj) {
        return (
          obj &&
          typeof obj.on === 'function' &&
          (obj._readableState ||
            typeof obj.readable === 'boolean' ||
            typeof obj.writable === 'boolean')
        );
      }
    });

    expect.addAssertion(
      '<Stream|string|Buffer|array> [when] piped through <array|Stream> <assertion?>',
      function(expect, subject, value) {
        expect.errorMode = 'nested';

        return expect.promise(function(resolve, reject) {
          var pipeThroughStreams = Array.isArray(value) ? value : [value];
          expect(pipeThroughStreams, 'not to be empty');
          var subjectType = expect.findTypeOf(subject);
          var currentStream;
          if (subjectType.is('Stream')) {
            currentStream = subject;
            subject.on('error', reject);
          }

          var returnValue = expect.shift(
            pipeThroughStreams[pipeThroughStreams.length - 1]
          );

          pipeThroughStreams.forEach(function(pipeThroughStream) {
            pipeThroughStream.on('error', reject);
            currentStream = currentStream
              ? currentStream.pipe(pipeThroughStream)
              : pipeThroughStream;
          });

          if (!subjectType.is('Stream')) {
            // string, Buffer, or array
            try {
              (Array.isArray(subject) ? subject : [subject]).forEach(function(
                chunk
              ) {
                pipeThroughStreams[0].write(chunk);
              });
              pipeThroughStreams[0].end();
            } catch (e) {
              return reject(e);
            }
          }
          return resolve(returnValue);
        });
      }
    );

    const chunkPromiseByStream = new WeakMap();
    function getChunkPromise(stream) {
      let chunkPromise = chunkPromiseByStream.get(stream);
      if (!chunkPromise) {
        chunkPromise = expect.promise(function(resolve, reject) {
          expect(stream, 'to have property', 'readable', true);
          const chunks = [];
          stream
            .on('data', function(chunk) {
              chunks.push(chunk);
            })
            .on('end', function() {
              resolve(chunks);
            })
            .on('error', reject);
        });
        chunkPromiseByStream.set(stream, chunkPromise);
      }
      return chunkPromise;
    }

    expect.addAssertion(
      [
        '<Stream> to yield (output|chunks|objects) satisfying <any+>',
        '<Stream> to yield (output|chunks|objects) satisfying <assertion>'
      ],
      function(expect, subject, assertionOrSatisfySpec) {
        expect.errorMode = 'nested';

        var extraArgs = Array.prototype.slice.call(arguments, 2);

        var mustConcat = expect.alternations[0] === 'output';

        return expect
          .promise(function(resolve, reject) {
            getChunkPromise(subject).then(function(chunks) {
              var result;
              if (mustConcat) {
                if (
                  chunks.length > 0 &&
                  chunks.every(function(chunk) {
                    return typeof chunk === 'string';
                  })
                ) {
                  result = chunks.join('');
                } else {
                  // chunks or objects (object mode)
                  result = Buffer.concat(
                    chunks.map(function(chunk) {
                      if (typeof chunk === 'string') {
                        if (Buffer.from) {
                          return Buffer.from(chunk, 'utf-8');
                        } else {
                          return new Buffer(chunk, 'utf-8');
                        }
                      } else {
                        return chunk;
                      }
                    })
                  );
                }
              } else {
                result = chunks;
              }
              resolve(result);
            }, reject);
          })
          .then(function(result) {
            return expect.apply(
              expect,
              [result, 'to satisfy assertion'].concat(extraArgs)
            );
          });
      }
    );

    expect.addAssertion('<Stream> to error', function(expect, subject) {
      return getChunkPromise(subject).then(
        function() {
          expect.fail(
            new Error('Stream was supposed to fail, but ended correctly')
          );
        },
        function(err) {
          return err;
        }
      );
    });

    expect.addAssertion('<Stream> to error with <any>', function(
      expect,
      subject,
      value
    ) {
      expect.errorMode = 'nested';
      return expect(subject, 'to error').then(function(err) {
        return expect(err, 'to satisfy', value);
      });
    });
  }
};
