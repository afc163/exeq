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

  var s = spawn(cmd[0], cmd.slice(1), {
    stdio: [
      process.stdin,
      output,
      output
    ],
    cwd: this.cwd
  });

  s.on('close', function() {
    // cd /path/to
    // change cwd to /path/to
    if (cmd[0] === 'cd' && cmd[1]) {
      that.cwd = path.resolve(that.cwd, cmd[1]);
    }
    that.trigger('each', cmdString, that.stdout, that.index++);
    that.stdout = null;
    that.run();
  })

  s.stdout && s.stdout.on('data', stdOnData);
  s.stderr && s.stderr.on('data', stdOnData);

  function stdOnData(data) {
    that.stdout = data.toString();
  }

};

module.exports = function(commands) {
  return new Exeq(commands);
};
