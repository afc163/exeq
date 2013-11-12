var test = require('tap').test;
var exeq = require('..');

test('basic use', function(t) {

  t.equal(typeof exeq, 'function');

  var q = exeq();

  t.equal(typeof q, 'object');
  t.equal(typeof q.run, 'function');

  t.end();

});

