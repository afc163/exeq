var spawn = require('child_process').spawn;
var fs = require('fs');
var path = require('path');
var Q = require('q');
var platform = require('os').platform();
var eol = require('os').EOL;

function Exeq(commands) {
  this.deferred = Q.defer();
  this.commands = commands || [];
  this.cwd = '';
  this.run();
  return this.deferred.promise;
}

Exeq.prototype.run = function() {

  var that = this;

  // done!
  if (this.commands.length === 0) {
    this.deferred.resolve();
    return;
  }

  var parsed = parseCommand(this.commands.shift());

  var s = spawn(parsed.cmd, parsed.args, {
    stdio: [
      process.stdin,
      process.stdout,
      process.stderr
    ],
    cwd: this.cwd
  });

  s.on('exit', function(code) {
    // cd /path/to
    // change cwd to /path/to
    if (parsed.changeCwd) {
      that.cwd = path.resolve(that.cwd, parsed.changeCwd);
    }
    that.run();
  });

  s.on('error', function(err) {
    that.deferred.reject(err);
  });

};

module.exports = function() {
  return new Exeq(Array.prototype.slice.call(arguments));
};

function parseCommand(cmd) {
  cmd = cmd.trim();
  var command = (platform == 'win32' ? 'cmd.exe' : 'sh');
  var args = (platform == 'win32' ? ['/s', '/c'] : ['-c']);
  // change cwd for "cd /path/to"
  if (/^cd\s+/.test(cmd)) {
    var changeCwd = cmd.replace(/^cd\s+/, '');
  }
  return {
    cmd: command,
    args: args.concat([cmd]),
    changeCwd: changeCwd
  };
}
