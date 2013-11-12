var spawn = require('win-spawn');
var fs = require('fs');
var path = require('path');
var Events = require('arale').Events;

function Exeq(commands) {
  this.commands = commands || [];
  this.cwd = '';
  this.index = 0;
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
      output,
      out,
      cwd;

  var index = cmd.indexOf('>');
  if (index > -1) {
    output = cmd.substring(index + 1).replace(/(^\s+|\s+$)/g, '');
    cmd = cmd.substring(0, index).split(/\s+/);
  } else {
    cmd = cmd.split(/\s+/);
  }

  if (output) {
    out = fs.openSync(path.resolve(output), 'w');
  }

  spawn(cmd[0], cmd.slice(1), {
    stdio: [
      process.stdin,
      out ? out : process.stdout,
      process.stderr
    ],
    cwd: this.cwd
  }).on('close', function() {

    // cd /path/to
    // change cwd to /path/to
    if (cmd[0] === 'cd' && cmd[1]) {
      that.cwd = path.resolve(that.cwd, cmd[1]);
    }

    that.trigger('each', cmdString, that.index++);
    that.run();
  });

};

module.exports = function(commands) {
  return new Exeq(commands);
};