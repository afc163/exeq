var test = require('tap').test;
var exeq = require('..');

test('command count', function(t) {

  var q = exeq([
    'ls -l',
    'cd ..',
    'ps'
  ]);

  q.on('done', function(count) {
    t.equal(count, 3);
    t.end();
  });

  // execute the commands
  q.run();

});

