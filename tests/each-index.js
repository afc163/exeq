var test = require('tap').test;
var exeq = require('..');

test('each command index', function(t) {

  var n = -1;

  exeq([
    'ls -l',
    'cd ..',
    'ps'
  ]).on('each', function(command, index) {
    t.equal(typeof index, 'number');
    t.equal(n+1, index);
    n = index;
  }).on('done', function() {
    t.end();
  });

});
