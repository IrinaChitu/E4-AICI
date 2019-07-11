// connect to DB using mongoose
// first of all, run: install npm install mongoose
//user: root || psw: 3d18ab7d0936105a
//
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://104.248.89.22:27017/4WashDB', {useNewUrlParser: true});
//
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//     console.log("we're connected!");
//     // User.find(function (err, users) {
//     //     if (err) return console.error(err);
//     //     console.log(users);
//     // })
//     var User = mongoose.model('User', User);
// });



var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://104.248.89.22:27017/4WashDB";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("4WashDB");
    dbo.collection("User").findOne({}, function(err, result) {
        if (err) throw err;
        console.log(result.name);
        db.close();
    });
});