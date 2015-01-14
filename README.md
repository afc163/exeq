# exeq

Excute shell commands in queue.

[![NPM version](https://img.shields.io/npm/v/exeq.svg?style=flat)](https://npmjs.org/package/exeq)
[![Build Status](https://img.shields.io/travis/afc163/exeq.svg?style=flat)](https://travis-ci.org/afc163/exeq)
[![NPM downloads](http://img.shields.io/npm/dm/exeq.svg?style=flat)](https://npmjs.org/package/afc163/exeq)

---

## Install

```bash
$ npm install exeq --save
```

## Usage

### exeq(array)

```js
var exeq = require('exeq');

// cd command would change spawn cwd automatically
exeq(
  'mkdir example',
  'cd example',
  'touch README.md'
);
```

```js
// promise
exeq(
  'mkdir example',
  'cd example',
  'touch README.md',
  'touch somefile',
  'rm somefile',
  'ls -l',
  'cd ..',
  'rm -rf example',
  'ls -l > output.txt'
).then(function() {
  console.log('done!');
}).catch(function(err) {
  console.log(err);
});
```

> Do not support command string with `&&` .

## Test

```bash
$ npm test
```

## License

The MIT License (MIT)
