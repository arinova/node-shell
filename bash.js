var commands = require('./commands');
//var userCommand = 'pwd';
//var userCommand = 'pwd';

process.stdout.write('prompt > ');
// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmd = data.toString().trim(); // remove the newline

  var splitIndex=cmd.indexOf(" ");
  if(splitIndex >= 0){
    var parameter= cmd.slice(splitIndex+1);
    cmd=cmd.slice(0, splitIndex);
  }
  commands[cmd](parameter);

});
