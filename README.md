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

### exeq()

```js
var exeq = require('exeq');

// cd command would change spawn cwd automatically
exeq(
  'mkdir example',
  'cd example',
  'touch README.md'
);
```

### Promise `2.0.0+`

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

### stdout & stderr

```js
exeq(
  'echo 123',
  'echo 456',
  'echo 789'
).then(function(results) {
  console.log(results[0].stdout); // '123'
  console.log(results[1].stdout); // '456'
  console.log(results[2].stdout); // '789'
});
```

```js
exeq(
  'not-existed-command'
).then(function(results) {
}).catch(function(err) {
  console.log(err); // { code: '127', stderr: ' ... ' }
});
```

## Test

```bash
$ npm test
```

## License

The MIT License (MIT)
