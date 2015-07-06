var fs = require('fs');
var readme = "";
var commentRegex = /\/\/(.*)\n/g;
var toParse = 0;
var readmeLocation = __dirname + '/../README.md';
fs.readdir(__dirname + '/../', parseDirectory);

function fileParsed(){
    toParse --;
    if (!toParse) gitChanges();
}

function writeFile(){
    fs.writeFile(readmeLocation, readme, function(err){
        if (err){
            throw ('Error writing to ' + readmeLocation);
        } else {
            console.log(readme);
            console.log('Complete');
        }
    });
}
function gitChanges(){
    readme += "\n#### Changes  \n\n";
    var child = require("child_process").spawn;
    var commits = child("git", ['log','--pretty="%s"']);
    commits.stdout.on('data', function (data) {
        readme += data.toString().split("\n").join("  \n");
        writeFile();
    });
}

function parseFile(file){
    toParse++;

    console.log('---', file);
    fs.readFile(file, 'utf-8', function (err, contents){
        if (err) throw ('Error reading js file');
        contents.replace(commentRegex, function (outer, inner){
            readme += inner + '  \n';
        });
        fileParsed();
    });
    console.log('\n');
}

function parseDirectory (err, files){
    if (err) throw ('Error parsing directory');
    files.forEach(function(file){
        file = __dirname + '/../' + file;
        if (!fs.statSync(file).isDirectory() && file.substr(-2) === 'js') parseFile(file);
    });
}