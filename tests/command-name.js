var test = require('tap').test;
var exeq = require('..');

test('command name', function(t) {

  exeq([
    'ls -l',
    'cd ..',
    'ps'
  ]).on('each', function(command, index) {
    if (index === 0) {
      t.equal(command, 'ls -l');
    } else if (index === 1) {
      t.equal(command, 'cd ..');
    } else {
      t.equal(command, 'ps');
    }
  }).on('done', function() {
    t.end();
  });

});

