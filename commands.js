var fs = require('fs');
var request= require('request');

module.exports = {
  pwd: function (stdin, param, done){
        done(process.cwd());
      },

  date: function(stdin, param, done){
      var date = new Date();
      done(date.toString());
    },

  ls: function(stdin, param, done){fs.readdir('.', function(err, files) {
        if (err) throw err;
          files.forEach(function(file) {
           done(file.toString() + "\n");
          })

        });
      },
  echo: function(stdin, str, done){
              done(str);
      },
  cat: function(stdin, filename, done){

    var input= filename || stdin;

        fs.readFile(input, 'utf8', function(err, data){
          if(err) throw err;
      done(data);
        });
      },
  head: function(stdin, filename, done){
    console.log("head stdin", stdin );
    console.log("head filename", done);
    var input= filename || stdin;
    console.log("input", input);

    fs.readFile(input, 'utf8', function(err, data){
      if(err) throw err;
      var split=data.split("\n");
      var i=0;
      var newdata="";
      while(i < 5 && i < split.length){
        newdata=newdata.concat(split[i] + "\n");
        i++;
      }
      done(newdata);
    });
  },
  tail: function(stdin, filename, done){
    fs.readFile(filename, 'utf8', function(err, data){
      if(err) throw err;
      var split=data.split("\n");
      var i=split.length-5;
      var newdata="";
      while(i >= split.length-5 && i < split.length){
        newdata=newdata.concat(split[i] + "\n");
        i++;
      }
      done(newdata);
    });
  },
  wc: function(stdin, filename, done){
    fs.readFile(filename, 'utf8', function(err, data){
      if(err) throw err;
      var split=data.split("\n");
      done(split.length + "");
    });
  },
  sort: function(stdin, filename, done){
    fs.readFile(filename, 'utf8', function(err, data){
      if(err) throw err;
      var split=data.split("\n");
      split.sort();

        done(split.join("\n"));

    });
  },
  uniq: function(stdin, filename,done){
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


      done(newdata);

    });
  },
  curl: function(stdin, url, done){


    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        //console.log(body) // Show the HTML for the Google homepage.
          done(body);
      }
    });

    process.stdout.write("\nprompt > ");
  },

};
