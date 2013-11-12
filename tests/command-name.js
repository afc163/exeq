var test = require('tap').test;
var exeq = require('..');

test('command name', function(t) {

  var q = exeq([
    'ls -l',
    'cd ..',
    'ps'
  ]);

  q.on('each', function(command, index) {
    if (index === 0) {
      t.equal(command, 'ls -l');
    } else if (index === 1) {
      t.equal(command, 'cd ..');
    } else {
      t.equal(command, 'ps');
    }
  });

  q.on('done', function() {
    t.end();
  });

  // execute the commands
  q.run();

});

