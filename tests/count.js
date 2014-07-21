var test = require('tap').test;
var exeq = require('..');

test('command count', function(t) {

  exeq([
    'ls -l',
    'cd ..',
    'ps'
  ]).on('done', function(count) {
    t.equal(count, 3);
    t.end();
  });

});

