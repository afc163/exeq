var test = require('tap').test;
var exeq = require('..');

test('cd change cwd', function(t) {

  var q = exeq([
    'cd /usr/bin',
    'cd ..',
    'cd /usr/bin'
  ]);

  q.on('each', function(command, index) {
    if (index === 0) {
      t.equal(this.cwd, '/usr/bin');
    } else if (index === 1) {
      t.equal(this.cwd, '/usr');
    } else {
      t.equal(this.cwd, '/usr/bin');
    }
  });

  q.on('done', function() {
    t.end();
  });

  // execute the commands
  q.run();

});

