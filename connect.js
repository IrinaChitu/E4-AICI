// connect Express Server to MongoDB database
//
// const express = require('express');
// const mongodb = require('mongodb');
//
// const app = express();
//
// var MongoClient = require('mongodb').MongoClient
//     , Server = require('mongodb').Server;
//
// var mongoClient = new MongoClient(new Server('104.248.89.22', 27017));
// mongoClient.open(function(err, mongoClient) {
//     var db1 = mongoClient.db("4WashDB");
//
//     mongoClient.close();
// });
//
// let db = null;
//
//
// app.get('/api/User', function (req, res) {
//     db.collection('User').find().toArray((err, result) => {
//         if (err) return console.log(err)
//         res.send({
//             courses: result
//         })
//     })
// })
//
// mongodb.MongoClient.connect('mongodb://localhost:27017/', (err, client) => {
//     if (err) return console.log(err)
//     console.log('Connected to database')
//     db = client.db('4WashDB');
//     app.listen(3000, function () {
//         console.log('Example app listening on port 3000!')
//     })
// })



const express = require('express')
const app = express()
const port = 3000


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

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))