module.exports = {
  name: 'unexpected-stream',
  version: require('../package.json').version,
  installInto(expect) {
    expect.addType({
      name: 'Stream',
      base: 'object',
      inspect(obj, depth, output, inspect) {
        output.text(
          (obj.constructor && obj.constructor.name) || 'Stream',
          'jsFunctionName'
        );
      },
      identify(obj) {
        return (
          obj &&
          typeof obj.on === 'function' &&
          (obj._readableState ||
            typeof obj.readable === 'boolean' ||
            typeof obj.writable === 'boolean')
        );
      },
    });

    expect.addAssertion(
      '<Stream|string|Buffer|array> [when] piped through <array|Stream> <assertion?>',
      (expect, subject, value) => {
        expect.errorMode = 'nested';

        return expect.promise((resolve, reject) => {
          const pipeThroughStreams = Array.isArray(value) ? value : [value];
          expect(pipeThroughStreams, 'not to be empty');
          const subjectType = expect.findTypeOf(subject);
          let currentStream;
          if (subjectType.is('Stream')) {
            currentStream = subject;
            subject.on('error', reject);
          }

          const returnValue = expect.shift(
            pipeThroughStreams[pipeThroughStreams.length - 1]
          );

          pipeThroughStreams.forEach((pipeThroughStream) => {
            pipeThroughStream.on('error', reject);
            currentStream = currentStream
              ? currentStream.pipe(pipeThroughStream)
              : pipeThroughStream;
          });

          if (!subjectType.is('Stream')) {
            // string, Buffer, or array
            try {
              (Array.isArray(subject) ? subject : [subject]).forEach(
                (chunk) => {
                  pipeThroughStreams[0].write(chunk);
                }
              );
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
        chunkPromise = expect.promise((resolve, reject) => {
          expect(stream, 'to have property', 'readable', true);
          const chunks = [];
          stream
            .on('data', (chunk) => {
              chunks.push(chunk);
            })
            .on('end', () => {
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
        '<Stream> to yield (output|chunks|objects) satisfying <assertion>',
      ],
      function (expect, subject, assertionOrSatisfySpec) {
        expect.errorMode = 'nested';

        const extraArgs = Array.prototype.slice.call(arguments, 2);

        const mustConcat = expect.alternations[0] === 'output';

        return expect
          .promise((resolve, reject) => {
            getChunkPromise(subject).then((chunks) => {
              let result;
              if (mustConcat) {
                if (
                  chunks.length > 0 &&
                  chunks.every((chunk) => typeof chunk === 'string')
                ) {
                  result = chunks.join('');
                } else {
                  // chunks or objects (object mode)
                  result = Buffer.concat(
                    chunks.map((chunk) => {
                      if (typeof chunk === 'string') {
                        if (Buffer.from) {
                          return Buffer.from(chunk, 'utf-8');
                        } else {
                          // eslint-disable-next-line node/no-deprecated-api
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
          .then((result) =>
            expect.apply(
              expect,
              [result, 'to satisfy assertion'].concat(extraArgs)
            )
          );
      }
    );

    expect.addAssertion('<Stream> to error', (expect, subject) =>
      getChunkPromise(subject).then(
        () => {
          expect.fail(
            new Error('Stream was supposed to fail, but ended correctly')
          );
        },
        (err) => err
      )
    );

    expect.addAssertion(
      '<Stream> to error with <any>',
      (expect, subject, value) => {
        expect.errorMode = 'nested';
        return expect(subject, 'to error').then((err) =>
          expect(err, 'to satisfy', value)
        );
      }
    );
  },
};
