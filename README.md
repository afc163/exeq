# exeq

Excute shell commands synchronously.

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
exeq([
  'mkdir example',
  'cd example',
  'touch README.md'
]);
```

```js
// each & done events
exeq([
  'mkdir example',
  'cd example',
  'touch README.md',
  'touch somefile',
  'rm somefile',
  'ls -l',
  'cd ..',
  'rm -rf example',
  'ls -l > output.txt'
]).on('each', function(command, index) {
  // After each command executed
  console.log('No.' + index + ' Executed: ' + command);
  console.log();
}).on('done', function(count) {
  console.log('---');
  console.log(count + ' commands done!');
});
```

> Do not support command string with `&&` .

## Test

```bash
$ npm test
```

## License

The MIT License (MIT)
