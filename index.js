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
  this.results = [];
  this.run();
  return this.deferred.promise;
}

Exeq.prototype.run = function() {

  var that = this;
  var stdout = new Buffer('');
  var stderr = new Buffer('');

  // done!
  if (this.commands.length === 0) {
    this.deferred.resolve(this.results);
    return;
  }

  var cmdString = this.commands.shift();
  var parsed = parseCommand(cmdString);
  var s = spawn(parsed.cmd, parsed.args, {
    cwd: this.cwd
  });

  s.stdout.pipe(process.stdout);
  s.stdout.on('data', function(data) {
    stdout = data.toString();
  });

  s.stderr.pipe(process.stderr);
  s.stderr.on('data', function(data) {
    stderr = data.toString();
  });

  s.on('close', function(code) {
    if (code) {
      return that.deferred.reject({
        code: code,
        stderr: stderr.toString()
      });
    } else {
      that.results.push({
        cmd: cmdString,
        stdout: stdout.toString()
      });
    }
    // cd /path/to
    // change cwd to /path/to
    if (parsed.changeCwd) {
      that.cwd = path.resolve(that.cwd, parsed.changeCwd);
    }
    that.run();
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
