var test = require('tap').test;
var exeq = require('..');

test('catch error', function(t) {

  exeq('not-existed-cmd').then(function(results) {
  }).catch(function(err) {
    t.equal(err.code, 127);
    t.ok(err.stderr.indexOf('command not found') > -1);
  }).finally(function() {
    t.end();
  });

});


