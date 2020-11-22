### v4.0.0 (2019-05-21)

#### Pull requests

- [#17](https://github.com/unexpectedjs/unexpected-stream/pull/17) Upgrade nyc to version 14.0.0 ([depfu[bot]](mailto:depfu[bot]@users.noreply.github.com))

#### Commits to master

- [Drop node.js 9, add 10 and 12](https://github.com/unexpectedjs/unexpected-stream/commit/5a215f2efcc8a186db97c748bc73e8c132ef56b9) ([Andreas Lind](mailto:andreaslindpetersen@gmail.com))
- [Drop node.js 6 support so we can use the new eslint-plugin-node \(semver-major\)](https://github.com/unexpectedjs/unexpected-stream/commit/2c074f5df25013058de285cb8df4944c52b2d02f) ([Andreas Lind](mailto:andreaslindpetersen@gmail.com))
- [Tests & docs: Stop relying on the exact output of a gzip stream](https://github.com/unexpectedjs/unexpected-stream/commit/38c9fdde42576d3cbc290adbe0c4664cbf01653d) ([Andreas Lind](mailto:andreaslindpetersen@gmail.com))
- [Update unexpected to ^11.5.0, adjust expected error messages involving Buffers](https://github.com/unexpectedjs/unexpected-stream/commit/ebd74d9588b98ca9b5578c249577f9683722039b) ([Andreas Lind](mailto:andreaslindpetersen@gmail.com))
- [Disable node\/no-deprecated-api rule in a construct that uses the new API if available](https://github.com/unexpectedjs/unexpected-stream/commit/0ce63de08945b1b692cec3cc4e19e5ca23f1928d) ([Andreas Lind](mailto:andreaslindpetersen@gmail.com))
- [+8 more](https://github.com/unexpectedjs/unexpected-stream/compare/v3.1.0...v4.0.0)

### v3.1.0 (2019-03-03)

#### Pull requests

- [#16](https://github.com/unexpectedjs/unexpected-stream/pull/16) Upgrade mocha to version 6.0.0 ([depfu[bot]](mailto:depfu[bot]@users.noreply.github.com))
- [#15](https://github.com/unexpectedjs/unexpected-stream/pull/15) Upgrade unexpected-documentation-site-generator to version 6.0.0 ([depfu[bot]](mailto:depfu[bot]@users.noreply.github.com))
- [#12](https://github.com/unexpectedjs/unexpected-stream/pull/12) Upgrade unexpected-markdown to version 2.0.0 ([depfu[bot]](mailto:depfu[bot]@users.noreply.github.com))
- [#10](https://github.com/unexpectedjs/unexpected-stream/pull/10) Upgrade unexpected-documentation-site-generator to version 5.0.0 ([depfu[bot]](mailto:depfu[bot]@users.noreply.github.com))

#### Commits to master

- [Update unexpected for 11 and pull up the peer dep.](https://github.com/unexpectedjs/unexpected-stream/commit/79749d1735bbc3d36c616ec8a503b5f5bbe7866a) ([Alex J Burke](mailto:alex@alexjeffburke.com))
- [Update unexpected-markdown to version 3.0.0](https://github.com/unexpectedjs/unexpected-stream/commit/45b0ffde0ed95ecdedeac25ede7db641264a2973) ([depfu[bot]](mailto:depfu[bot]@users.noreply.github.com))
- [Use Buffer.from instead of new Buffer, avoiding a node.js deprecation warning](https://github.com/unexpectedjs/unexpected-stream/commit/39b6dc796c4fbff786fa1cafaccfd792e289c798) ([Andreas Lind](mailto:andreaslindpetersen@gmail.com))
- [bootstrap-unexpected-markdown: Override preferredWidth after cloning, that really ought to work](https://github.com/unexpectedjs/unexpected-stream/commit/29f3521ddba086979cba0ce3ee2532ba4bf921eb) ([Andreas Lind](mailto:andreaslindpetersen@gmail.com))
- [bootstrap-unexpected-markdown: Clone before installing plugin](https://github.com/unexpectedjs/unexpected-stream/commit/0958de5cacbf843758300933a172953ebcc43e1b) ([Andreas Lind](mailto:andreaslindpetersen@gmail.com))
- [+9 more](https://github.com/unexpectedjs/unexpected-stream/compare/v3.0.0...v3.1.0)

### v3.0.0 (2018-06-24)

- [Drop node.js 4 support \(semver-major\)](https://github.com/unexpectedjs/unexpected-stream/commit/c703a60e8ac511300f28f3e32abbb1ec8658683e) ([Andreas Lind](mailto:andreaslindpetersen@gmail.com))
- [.npmrc: Explicitly disable package-lock](https://github.com/unexpectedjs/unexpected-stream/commit/03e24a34a4424da72b5ef3d47129e88db968b475) ([Andreas Lind](mailto:andreaslindpetersen@gmail.com))
- [Update eslint-config-onelint to ^4.0.0](https://github.com/unexpectedjs/unexpected-stream/commit/db4afa8cca5374a80b5a52a17c029e08c89135dc) ([Andreas Lind](mailto:andreaslindpetersen@gmail.com))
- [Upgrade eslint to version 5.0.0](https://github.com/unexpectedjs/unexpected-stream/commit/5d381f3bdb5b5f56e5fdecb2a414237ae7f8e363) ([depfu[bot]](mailto:depfu[bot]@users.noreply.github.com))
- [Ditch weirdo tests that trip up the new mocha](https://github.com/unexpectedjs/unexpected-stream/commit/b080e9cec9c15fb2277efb8ee96b4f63ccfcf9de) ([Andreas Lind](mailto:andreaslindpetersen@gmail.com))
- [+14 more](https://github.com/unexpectedjs/unexpected-stream/compare/v2.1.0...v3.0.0)

### v2.1.0 (2017-02-13)

- [Add 'to error' and 'to error with' assertions.](https://github.com/unexpectedjs/unexpected-stream/commit/5835f2669ad5a28fe4b26aeba32f5acd2da21302) ([Andreas Lind](mailto:andreas@one.com))
- [update eslint \(2.13.1\) and eslint-config-onelint \(1.2.0\)](https://github.com/unexpectedjs/unexpected-stream/commit/011f5ac6f9df0a993fe91fd79691f3d9367d2c55) ([Gustav Nikolaj Olsen](mailto:gno@one.com))
- [README: Fix unexpected.js.org link.](https://github.com/unexpectedjs/unexpected-stream/commit/0a448571c400bfc02470770a8995bdbbcdad38ab) ([Andreas Lind](mailto:andreas@one.com))

### v2.0.4 (2016-05-29)

- [Propagate error events correctly.](https://github.com/unexpectedjs/unexpected-stream/commit/3e4ca5210aa1942a4041608ee27aeb2b456279f8) ([Andreas Lind](mailto:andreas@one.com))
- [Fail with the correct error when stream.write or stream.end throws.](https://github.com/unexpectedjs/unexpected-stream/commit/dc19f1f96484f8ad407b9e4a7fcfc26c27b42121) ([Andreas Lind](mailto:andreas@one.com))
- [eslint: force es5 parser mode](https://github.com/unexpectedjs/unexpected-stream/commit/8f9724d38c0436de597daacecb1ee0f569884c5a) ([Gustav Nikolaj Olsen](mailto:gno@one.com))
- [add editorconfig](https://github.com/unexpectedjs/unexpected-stream/commit/dd9fe6d1bd6f3a3659f26080170dd1f422a6f4f3) ([Gustav Nikolaj Olsen](mailto:gno@one.com))
- [replace jshint with eslint](https://github.com/unexpectedjs/unexpected-stream/commit/aa99342051f340f4ec1aecfacae2c772f8fbe027) ([Gustav Nikolaj Olsen](mailto:gno@one.com))

### v2.0.3 (2016-03-26)

#### Pull requests

- [#1](https://github.com/unexpectedjs/unexpected-stream/pull/1) Upgrade unexpected-documentation-site-generator ([Sune Simonsen](mailto:sune@we-knowhow.dk))

#### Commits to master

- [Fix inspection of streams whose constructor is an anonymous function.](https://github.com/unexpectedjs/unexpected-stream/commit/0facfdf41501c1d3abc6a307fe3ed8a6a356c759) ([Andreas Lind](mailto:andreas@one.com))
- [100% coverage.](https://github.com/unexpectedjs/unexpected-stream/commit/ed04fe5b69b119aa3935a46c6edfe08a9476703e) ([Andreas Lind](mailto:andreas@one.com))
- [Update unexpected-documentation-site-generator to 4.0.0.](https://github.com/unexpectedjs/unexpected-stream/commit/47fa864ffe424a9d39bd01c099ac7daf7231b2aa) ([Andreas Lind](mailto:andreas@one.com))
- [Update to-yield-chunks-satisfying.md](https://github.com/unexpectedjs/unexpected-stream/commit/991e86961c3750432a24ac2c0285ccfff921c489) ([Andreas Lind](mailto:andreas@one.com))
- [Fixed failing test.](https://github.com/unexpectedjs/unexpected-stream/commit/b5404f100b413f99939a4b9ba85211f655987ad0) ([Andreas Lind](mailto:andreas@one.com))

### v2.0.2 (2015-10-10)

- [when piped through: Declare the &lt;assertion&gt; variant after the &lt;any+&gt; variant to fix the output.](https://github.com/unexpectedjs/unexpected-stream/commit/9586c856fdc4274ccf342bb5cac31b51d07138a2) ([Andreas Lind](mailto:andreas@one.com))
- [Update unexpected to 10.0.1.](https://github.com/unexpectedjs/unexpected-stream/commit/cce3e8672c9e77a11aabc59c339cc859523adcef) ([Andreas Lind](mailto:andreas@one.com))

### v2.0.1 (2015-10-09)

- [When piped through: Don't break for streams that start emitting chunks in the same tick.](https://github.com/unexpectedjs/unexpected-stream/commit/fca3f28fd9b6e1315e274b26d7779844ca42a9b5) ([Andreas Lind](mailto:andreas@one.com))

### v2.0.0 (2015-10-08)

- [Documentation: Adapted the output to the current state of feature\/v10 in Unexpected.](https://github.com/unexpectedjs/unexpected-stream/commit/e495ca9e17fa688e79a5bf74b3efd884bff5a56e) ([Andreas Lind](mailto:andreas@one.com))
- [Use the &lt;assertion&gt; type.](https://github.com/unexpectedjs/unexpected-stream/commit/4fb7f96cf5c4bcf3c21bb273cf63733ca90a0120) ([Andreas Lind](mailto:andreas@one.com))
- [Use a fixed width for the output snippets on the documentation site.](https://github.com/unexpectedjs/unexpected-stream/commit/b9f5b5277310ab76f63e20da077bda684d7a4aae) ([Andreas Lind](mailto:andreas@one.com))
- [Update unexpected-documentation-site-generator to 3.1.0.](https://github.com/unexpectedjs/unexpected-stream/commit/7ed8872b47163c24a313bb3b3ccb2d6824b92eeb) ([Andreas Lind](mailto:andreas@one.com))
- [package.json: Fixed copy\/paste error in keywords.](https://github.com/unexpectedjs/unexpected-stream/commit/09624512252b22c3382d5ad2c4e2116899721a40) ([Andreas Lind](mailto:andreas@one.com))
- [+6 more](https://github.com/unexpectedjs/unexpected-stream/compare/v1.3.0...v2.0.0)

### v1.3.0 (2015-09-23)

- [Update unexpected and unexpected-documentation-site-generator to the latest versions.](https://github.com/unexpectedjs/unexpected-stream/commit/73dff3c63ea3716effe86410139a53c92eb8fcd8) ([Andreas Lind](mailto:andreas@one.com))
- [to yield output satisfying: Buffer up the chunks so that the assertion can run on the same subject multiple times.](https://github.com/unexpectedjs/unexpected-stream/commit/faaa094e5e1d5dff75e5cd6684d3ea1787a3911f) ([Andreas Lind](mailto:andreas@one.com))
- [Update unexpected to 9.9.0.](https://github.com/unexpectedjs/unexpected-stream/commit/2e1d0c465d029578e451dd8697e255e8e2cf3cf7) ([Andreas Lind](mailto:andreas@one.com))
- [Include the version number in the plugin spec.](https://github.com/unexpectedjs/unexpected-stream/commit/6e6ea87f33648e61ee4f4c0bb67b74cdcfb2bc36) ([Andreas Lind](mailto:andreas@one.com))

### v1.2.1 (2015-07-30)

- [Make the unexpected-documentation-site-generator a dev dep and update it to 2.6.2.](https://github.com/unexpectedjs/unexpected-stream/commit/ce52be8efdf1b6b9bb512e832a872e529c0d598b) ([Andreas Lind](mailto:andreas@one.com))
- [Update documentation tests.](https://github.com/unexpectedjs/unexpected-stream/commit/c4a1c6c116fa912df0117c65b12c31a86a208382) ([Andreas Lind](mailto:andreas@one.com))
- [Updated example in documentation.](https://github.com/unexpectedjs/unexpected-stream/commit/518a566d31d6326e1ef80e7101bafa40df0b01db) ([Andreas Lind](mailto:andreas@one.com))
- [Added more docs.](https://github.com/unexpectedjs/unexpected-stream/commit/f85a4dc69928e96c2bac408807ee400b210d8543) ([Andreas Lind](mailto:andreas@one.com))
- [Added brief introduction to documentation front page.](https://github.com/unexpectedjs/unexpected-stream/commit/a5b988c6c90bddd220988f08bd6f02ec402c7a93) ([Andreas Lind](mailto:andreas@one.com))
- [+5 more](https://github.com/unexpectedjs/unexpected-stream/compare/v1.2.0...v1.2.1)

### v1.2.0 (2015-07-04)

- [Update unexpected to 9.0.0 and accept the 9-series as a peer dependency.](https://github.com/unexpectedjs/unexpected-stream/commit/829937d379b7a830a37f390bb5cfb97cb9d3947b) ([Andreas Lind](mailto:andreas@one.com))
- [Test the output of a failing 'to yield output satisfying' assertion.](https://github.com/unexpectedjs/unexpected-stream/commit/821c7a8579a52338d1dfa2f6bbfd5901d85d5c12) ([Andreas Lind](mailto:andreas@one.com))
- [Update unexpected to 8.5.0.](https://github.com/unexpectedjs/unexpected-stream/commit/c95bfdebd2c65975b1343115d91523a775d744e6) ([Andreas Lind](mailto:andreas@one.com))
- [Update unexpected and unexpected-promise.](https://github.com/unexpectedjs/unexpected-stream/commit/5c4e3f35b42407be31d73aaef08a01cb1afa4f0c) ([Andreas Lind](mailto:andreas@one.com))

### v1.1.2 (2015-06-10)

- [package.json: Fixed dependency syntax.](https://github.com/unexpectedjs/unexpected-stream/commit/9e79d8f0edfcec704c351b22655e77e75f0cc85a) ([Andreas Lind](mailto:andreas@one.com))

### v1.1.1 (2015-06-09)

- [package.json: Add a peerDependencies section specifying unexpected 7 | 8.](https://github.com/unexpectedjs/unexpected-stream/commit/56df03fb7ca97d6b98b4af630989ee52979f8649) ([Andreas Lind](mailto:andreas@one.com))

### v1.1.0 (2015-05-04)

- [Specify an error mode of 'nested'.](https://github.com/unexpectedjs/unexpected-stream/commit/59c043088f7c834467f69ce3bcba6541a23d8cc1) ([Andreas Lind](mailto:andreas@one.com))
- [README: Use SVG badges.](https://github.com/unexpectedjs/unexpected-stream/commit/69154ea120b8bec64ba659f75ffc4f0d860d9c84) ([Andreas Lind](mailto:andreas@one.com))
- [README, build status badge: Only monitor the status of the master branch.](https://github.com/unexpectedjs/unexpected-stream/commit/e8a2401926390f6e259e9e35a4e9e8ed087e4883) ([Andreas Lind](mailto:andreas@one.com))
- [Added README image.](https://github.com/unexpectedjs/unexpected-stream/commit/ef1e43d4dde751d5c748051331d3a8eadd1eae85) ([Andreas Lind](mailto:andreas@one.com))

### v1.0.0
- [Initial commit, 1.0.0.](https://github.com/unexpectedjs/unexpected-stream/commit/cffde507f27bd293aa99629a7649a6370fc33a04) ([Andreas Lind](mailto:andreas@one.com))

