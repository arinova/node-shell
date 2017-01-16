var commands = require('./commands');
//var userCommand = 'pwd';

process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmd = data.toString().trim(); // remove the newline

  commands[cmd]();

  // else if(cmd === "date"){
  //   var date = new Date();
  //   process.stdout.write(date.toString());
  // }

    // process.stdout.write('\nprompt > ');

});
