var test = require('tap').test;
var exeq = require('..');
var fs = require('fs');
var path = require('path');

test('create files & remove it', function(t) {

  exeq([
    'touch index.html',
    'mkdir folder',
    'rm -rf folder index.html'
  ]).on('each', function(command, index) {
    if (index === 0) {
      t.ok(fs.existsSync('index.html'));
    } else if (index === 1) {
      t.ok(fs.existsSync('folder'));
    } else {
      t.notOk(fs.existsSync('index.html'));
      t.notOk(fs.existsSync('folder'));
    }
  }).on('done', function() {
    t.end();
  });

});
