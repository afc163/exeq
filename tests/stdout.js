var test = require('tap').test;
var exeq = require('..');

test('stdout', function(t) {

  var q = exeq([
    'man',
    'grep'
  ]);

  var n = -1;

  q.on('each', function(command, stdout, index) {
    if (index === 0) {
      t.equal(stdout, 'What manual page do you want?\n');
    } else {
      t.equal(stdout.slice(0, 11), 'usage: grep');
    }
  });

  q.on('done', function() {
    t.end();
  });

  // execute the commands
  q.run();

});

