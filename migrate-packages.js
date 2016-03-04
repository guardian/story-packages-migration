var fs = require('fs');
var Promise = require('bluebird');

Promise.promisifyAll(fs);

var filePath = process.argv[2];
var filePathToWrite = process.argv[3];

if (!filePath) {
    throw new Error('You must provide a filepath');
}

if (!filePathToWrite) {
    throw new Error('You must provide a filepath to write to');
}

fs.readFileAsync(filePath, 'utf8')
.then(function(storyPackages) {
    var newStoryPackages = parseStoryPackages(storyPackages);

    fs.writeFileAsync(filePathToWrite, newStoryPackages)
})
.then(function() {
    console.log('wrote new packages');
})
.catch(function(error) {
    console.log(error);
});

function parseStoryPackages(storyPackages) {

    var packages = '';

    for (var i = 0; i < 10000; i++) {
        var id = Math.floor(Math.random() * 10000000)
        var packageName = (Math.random()+1).toString(36).substring(7);
        var startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 3);
        var modifyDate = new Date(startDate.getTime() + Math.random() * (new Date().getTime() - startDate.getTime())).toISOString();
        var lastModifyBy = 'fabio.crisci@guardian.co.uk';
        var searchName = packageName.toLowerCase();
        var storyPackage =
          'id' + String.fromCharCode(03) + '{\"s\":\"'+ id + '\"}' + String.fromCharCode(02) +
          'isHidden' + String.fromCharCode(03)+'{\"bOOL\":false}' + String.fromCharCode(02) +
          'lastModifyByName' + String.fromCharCode(03) + '{\"s\":\"Fabio Crisci\"}' + String.fromCharCode(02) +
          'lastModify' + String.fromCharCode(03) + '{\"s\":\"' + modifyDate +'\"}' + String.fromCharCode(02) +
          'packageName' + String.fromCharCode(03) + '{\"s\":\"' + packageName + '\"}' + String.fromCharCode(02) +
          'createdBy' + String.fromCharCode(03) + '{"\s\":\"fabio.crisci@guardian.co.uk\"}' + String.fromCharCode(02) +
          'lastModifyBy' + String.fromCharCode(03) + '{\"s\":\"fabio.crisci@guardian.co.uk\"}' + String.fromCharCode(02) +
          'searchName' + String.fromCharCode(03) + '{\"s\":\"' + searchName + '\"}' + String.fromCharCode(10)

        packages += storyPackage;
    }

    return packages;
}

