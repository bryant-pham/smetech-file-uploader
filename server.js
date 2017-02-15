var express = require('express');
var app = express();
var path = require('path');
var mkdirp = require('mkdirp');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        var user = req.body.student;
        var savePath = path.join(__dirname + '/pages/' + user);
        mkdirp(savePath, function() {
            cb(null, savePath);
        });
    },
    filename: function(req, file, cb) {
        cb(null, 'index.html')
    }
});
var upload = multer({
    storage: storage,
    limits: {fileSize: 1000000}
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/upload', upload.single('file'), function(req, res) {
    var link = 'sites.smetech.club/' + req.body.student;
    res.send({link: link});
});

app.get('/:user', function(req, res) {
    var user = req.params.user;
    res.sendFile(path.join(__dirname + '/pages/' + user + '/index.html'));
});

app.listen(3000, function() {
    console.log('Running on port 3000. Press CTRL + C to quit');
});
