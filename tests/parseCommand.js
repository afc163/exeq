var test = require('tap').test;
var parseCommand = require('..').parseCommand;

test('parse commands', function(t) {

  t.equal(typeof parseCommand, 'function');

  var parsed = parseCommand('cd /path/to'.split(/\s+/));
  t.equal(parsed.cmd, 'cd');
  t.deepEqual(parsed.arguments, ['/path/to']);

  parsed = parseCommand('spm help init'.split(/\s+/));
  t.equal(parsed.cmd, 'spm');
  t.deepEqual(parsed.arguments, ['help', 'init']);

  parsed = parseCommand('with whitespace/tools -h'.split(/\s+/));
  t.equal(parsed.cmd, 'with whitespace/tools');
  t.deepEqual(parsed.arguments, ['-h']);

  t.end();

});
