var fs = require('fs');

module.exports = {
  pwd: function (){
        process.stdout.write(process.cwd());
        process.stdout.write('\nprompt > ');
      },

  date: function(){
      var date = new Date();
      process.stdout.write(date.toString());
      process.stdout.write('\nprompt > ');
    },

  ls: function(){fs.readdir('.', function(err, files) {
        if (err) throw err;
          files.forEach(function(file) {
          process.stdout.write(file.toString() + "\n");
          })
          process.stdout.write("\nprompt > ");
        });
      },
  echo: function(str){
        process.stdout.write(str);
        process.stdout.write("\nprompt > ");
      },
  cat: function(filename){
        fs.readFile(filename, 'utf8', function(err, data){
          if(err) throw err;
          process.stdout.write(data);
          process.stdout.write("\nprompt > ");
        });
      },
  head: function(filename){
    fs.readFile(filename, 'utf8', function(err, data){
      if(err) throw err;
      var split=data.split("\n");
      var i=0;
      var newdata="";
      while(i < 5 && i < split.length){
        newdata=newdata.concat(split[i] + "\n");
        i++;
      }
      process.stdout.write(newdata);
      process.stdout.write("\nprompt > ");
    });
  },
  tail: function(filename){
    fs.readFile(filename, 'utf8', function(err, data){
      if(err) throw err;
      var split=data.split("\n");
      var i=split.length-5;
      var newdata="";
      while(i >= split.length-5 && i < split.length){
        newdata=newdata.concat(split[i] + "\n");
        i++;
      }
      process.stdout.write(newdata);
      process.stdout.write("\nprompt > ");
    });
  },
  wc: function(filename){
    fs.readFile(filename, 'utf8', function(err, data){
      if(err) throw err;
      var split=data.split("\n");
      process.stdout.write(split.length + "");
      process.stdout.write("\nprompt > ");
    });
  },
  sort: function(filename){
    fs.readFile(filename, 'utf8', function(err, data){
      if(err) throw err;
      var split=data.split("\n");
      split.sort();
      process.stdout.write(split.join("\n"));
      process.stdout.write("\nprompt > ");
    });
  },
  uniq: function(filename){
    fs.readFile(filename, 'utf8', function(err, data){
      if(err) throw err;
      var split=data.split("\n");
      split.sort();
      var newdata="";
      var i=0;
      while(i < split.length){
        newdata=newdata.concat(split[i] + "\n");
        var j=i+1;
        while(split[i] === split[j]){
          j++;
        }
        i=j;
      }


      process.stdout.write(newdata);
      process.stdout.write("\nprompt > ");
    });
  },

};
