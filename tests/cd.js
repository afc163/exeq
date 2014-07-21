var test = require('tap').test;
var exeq = require('..');

test('cd change cwd', function(t) {

  exeq([
    'cd /usr/bin',
    'cd ..',
    'cd /usr/bin'
  ]).on('each', function(command, index) {
    if (this.index === 0) {
      t.equal(this.cwd, '/usr/bin');
    } else if (index === 1) {
      t.equal(this.cwd, '/usr');
    } else {
      t.equal(this.cwd, '/usr/bin');
    }
  }).on('done', function() {
    t.end();
  });

});

