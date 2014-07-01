//MONGOLAB_URI: mongodb://heroku_app16441027:tes4h1r4nosb41om8rbdsmo27j@ds031618.mongolab.com:31618/heroku_app16441027
//mongodb://heroku_app16441027_A:hGlcSpZiJyWRPjTtroThGEGGNBhkjZHp@ds031618.mongolab.com:31618/heroku_app16441027

var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
var server = new Server('ds031618-a.mongolab.com', 31618, {auto_reconnect: true});
db = new Db('heroku_app16441027', server, {safe: true});

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'heroku_app16441027' database");
			db.authenticate('heroku_app16441027', 'hGlcSpZiJyWRPjTtroThGEGGNBhkjZHp', function(err, result) {
				db.collection('albums', {safe:true}, function(err, collection) {
					if (err) {
						console.log("The 'albums' collection doesn't exist. Creating it with sample data...");
                                                console.log("The error here is "+err);
						populateDB();
					}
				});
			})
    }
    else{
         console.log(err);
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving album: ' + id);
    db.collection('albums', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('albums', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addAlbum = function(req, res) {
    var album = req.body;
    console.log('Adding album: ' + JSON.stringify(album));
    db.collection('albums', function(err, collection) {
        collection.insert(album, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateAlbum = function(req, res) {
    var id = req.params.id;
    var album = req.body;
    delete album._id;
    console.log('Updating album: ' + id);
    console.log(JSON.stringify(album));
    db.collection('albums', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, album, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating album: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(album);
            }
        });
    });
}

exports.deleteAlbum = function(req, res) {
    var id = req.params.id;
    console.log('Deleting album: ' + id);
    db.collection('albums', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var albums = [
    {
        name: "My Favourites",
        date: "1/1/2013",
        notes: "all my favourite pics docs go here"
        
    },
    {
        name: "Happy Times",
        date: "1/1/2013",
        notes: "all my happy pics docs go here"
    },
    {
        name: "Party Pics",
        date: "1/1/2013",
        notes: "all my party docs go here"
    }];

    db.collection('albums', function(err, collection) {
        collection.insert(albums, {safe:true}, function(err, result) {});
    });

};