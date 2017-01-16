var commands = require('./commands');
var cmdList=[];

process.stdout.write('prompt > ');


// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmdString = data.toString().trim(); // remove the newline
  cmdList=cmdString.split(/\s*\|\s*/g) // any amount of whitespace, pipe, any amount of whitespace;

  var cmd=cmdList.shift();
  var splitIndex=cmd.indexOf(" ");
  if(splitIndex >= 0){
    var parameter= cmd.slice(splitIndex+1);
    cmd=cmd.slice(0, splitIndex);
  }
//  console.log("cmd", cmd);
//  console.log("param", parameter);
  commands[cmd](undefined, parameter, done);
});

var done = function(output) {
  // show the output
  // show the prompt

      if(cmdList.length > 0){
        var cmd=cmdList.shift();
        var splitIndex=cmd.indexOf(" ");
        if(splitIndex >= 0){
          var parameter= cmd.slice(splitIndex+1);
          cmd=cmd.slice(0, splitIndex);
        }
        commands[cmd](output, parameter, done);
      }else{
        process.stdout.write(output);
      }

      process.stdout.write("\nprompt > ");
}
