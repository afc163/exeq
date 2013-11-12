# exeq

Excute shell commands synchronously.

[![Build Status](https://travis-ci.org/afc163/exeq.png)](https://travis-ci.org/afc163/exeq)
[![NPM version](https://badge.fury.io/js/exeq.png)](http://badge.fury.io/js/exeq)
[![David Status](https://david-dm.org/afc163/exeq.png)](https://david-dm.org/afc163/exeq) 

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
var q = exeq([
  'mkdir example',
  'cd example',
  'touch README.md',
  'touch somefile',
  'rm somefile',
  'ls -l',
  'cd ..',
  'rm -rf example',
  'ls -l'
]);

q.on('each', function(command, index) {
  // After each command executed
  console.log('No.' + index + ' Executed: ' + command);
});

q.on('done', function(count) {
  console.log('---');
  console.log(count + ' commands done!');
});

// execute the commands
q.run();
```

> Do not support command string with `&&` .

## Test

```bash
$ npm test
```

## License

MIT
