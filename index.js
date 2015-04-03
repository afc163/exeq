var spawn = require('child_process').spawn;
var path = require('path');
var Promise = require('native-or-bluebird');
var platform = require('os').platform();

function Exeq(commands) {
  this.commands = commands || [];
  this.cwd = '';
  this.results = [];
  return new Promise(this.run.bind(this));
}

Exeq.prototype.run = function(resolve, reject) {

  var that = this;
  var stdout = new Buffer('');
  var stderr = new Buffer('');

  // done!
  if (this.commands.length === 0) {
    resolve(this.results);
    return;
  }

  var cmdString = this.commands.shift();
  var parsed = parseCommand(cmdString);
  var s = spawn(parsed.cmd, parsed.args, {
    cwd: this.cwd
  });

  s.stdout.pipe(process.stdout);
  s.stdout.on('data', function(data) {
    stdout += data.toString();
  });

  s.stderr.pipe(process.stderr);
  s.stderr.on('data', function(data) {
    stderr += data.toString();
  });

  s.on('close', function(code) {
    if (code) {
      return reject({
        code: code,
        stderr: stderr.toString()
      });
    }

    that.results.push({
      cmd: cmdString,
      stdout: stdout.toString()
    });

    // cd /path/to
    // change cwd to /path/to
    if (parsed.changeCwd) {
      that.cwd = path.resolve(that.cwd, parsed.changeCwd);
    }
    that.run(resolve, reject);
  });
};

module.exports = function() {
  var cmds = [], args = Array.prototype.slice.call(arguments);
  args.forEach(function(arg) {
    if (Array.isArray(arg)) {
      cmds = cmds.concat(arg);
    } else {
      cmds.push(arg);
    }
  });
  return new Exeq(cmds);
};

function parseCommand(cmd) {
  cmd = cmd.trim();
  var command = (platform === 'win32' ? 'cmd.exe' : 'sh');
  var args = (platform === 'win32' ? ['/s', '/c'] : ['-c']);
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
