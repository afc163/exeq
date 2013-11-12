var test = require('tap').test;
var exeq = require('..');

test('each command index', function(t) {

  var q = exeq([
    'ls -l',
    'cd ..',
    'ps'
  ]);

  var n = -1;

  q.on('each', function(command, index) {
    t.equal(typeof index, 'number');
    t.equal(n+1, index);
    n = index;
  });

  q.on('done', function() {
    t.end();
  });

  // execute the commands
  q.run();

});
