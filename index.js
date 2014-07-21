var spawn = require('win-spawn');
var fs = require('fs');
var path = require('path');
var Events = require('arale').Events;

function Exeq(commands) {
  this.commands = commands || [];
  this.cwd = '';
  this.index = 0;
  var that = this;

  process.nextTick(function() {
    that.run();
  });
}

Events.mixTo(Exeq);

Exeq.prototype.run = function() {

  var that = this;

  // done!
  if (this.commands.length === 0) {
    this.trigger('done', this.index);
    return;
  }

  var cmdString = this.commands.shift(),
      cmd = cmdString,
      cwd,
      output;

  var index = cmd.indexOf('>');
  if (index > -1) {
    output = cmd.substring(index + 1).replace(/(^\s+|\s+$)/g, '');
    output && (output = fs.openSync(path.resolve(output), 'w'));
    cmd = cmd.substring(0, index).trim().split(/\s+/);
  } else {
    cmd = cmd.trim().split(/\s+/);
  }

  // avoid whitespace in folder
  // like C:/Program Files
  var parsed = parseCommand(cmd);

  var s = spawn(parsed.cmd, parsed.arguments, {
    stdio: [
      process.stdin,
      output ? output : process.stdout,
      process.stderr
    ],
    cwd: this.cwd
  });

  s.on('close', function() {
    // cd /path/to
    // change cwd to /path/to
    if (parsed.cmd === 'cd') {
      that.cwd = path.resolve(that.cwd, cmdString.replace(/^cd\s+/, ''));
    }
    that.trigger('each', cmdString, that.index++);
    that.run();
  })

};

module.exports = function(commands) {
  return new Exeq(commands);
};

// ps aux
//   ==> { cmd: 'ps', arguments: ['aux']}
// /User/Li Lei/tools --help
//   ==> { cmd: '/User/Li Lei/tools', arguments: ['--help']}
function parseCommand(cmdArray) {
  var i = 0;
  var cmd = cmdArray[i];
  var result = '';
  var index;
  while (cmdArray[i]) {
    var stats = fs.existsSync(cmd) && fs.lstatSync(cmd);
    if (stats && (stats.isFile() || stats.isSymbolicLink())) {
      result = cmd;
      index = i;
    }
    i += 1;
    cmd += ' ' + cmdArray[i];
  }

  if (result) {
    return {
      cmd: result,
      arguments: cmdArray.slice(index + 1)
    };
  }

  return {
    cmd: cmdArray[0],
    arguments: cmdArray.slice(1)
  };
}

// exports for test
module.exports.parseCommand = parseCommand;
