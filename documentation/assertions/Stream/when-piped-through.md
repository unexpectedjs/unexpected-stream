Pipe the output of a readable stream through a transform stream or a sequence
of transform streams, then delegate to another assertion using the last stream
as the subject.

It's intended to be used with the [to yield output satisfying](to-yield-output-satisfying/) assertion:

```js#async:true
return expect(
  require('fs').createReadStream('LICENSE'),
  'when piped through',
  require('zlib').Gzip(),
  'to yield output satisfying',
  'to have length', 792
);
```

Example with multiple transform streams:

```js#async:true
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
```

```output
expected ReadStream
when piped through [ Gzip, Gunzip ] to yield output satisfying when decoded as 'ascii' not to contain 'IMPLIED WARRANTIES'
  expected Gunzip
  to yield output satisfying when decoded as 'ascii' not to contain 'IMPLIED WARRANTIES'
    expected Buffer([0x43, 0x6F, 0x70, 0x79, 0x72, 0x69, 0x67, 0x68, 0x74, 0x20, 0x28, 0x63, 0x29, 0x20, 0x32, 0x30 /* 1478 more */ ])
    when decoded as 'ascii' not to contain 'IMPLIED WARRANTIES'

    Copyright (c) 2015, Andreas Lind
    All rights reserved.

    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions are
    met:

      * Redistributions of source code must retain the above copyright
        notice, this list of conditions and the following disclaimer.
      * Redistributions in binary form must reproduce the above copyright
        notice, this list of conditions and the following disclaimer in
        the documentation and/or other materials provided with the
        distribution.
      * Neither the name of the author nor the names of contributors may
        be used to endorse or promote products derived from this
        software without specific prior written permission.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
    IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
                           ^^^^^^^^^^^^^^^^^^
    TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
            ^^^^^^^^^^^^^^^^^^
    PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
    HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
    SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
    LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
    DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
    THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
    (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
    OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

```
