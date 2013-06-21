#!/usr/bin/env node

var express = require('express'),
    path = require('path'),
    http = require('http'),
    album = require('./routes/albums');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/pictures/:id/', album.findById);
app.get('/albums', album.findAll);
app.get('/albums/:id', album.findById);
app.post('/albums', album.addAlbum);
app.put('/albums/:id', album.updateAlbum);
app.delete('/albums/:id', album.deleteAlbum);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});


