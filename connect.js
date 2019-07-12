// connect Express Server to MongoDB database

const express = require('express')
const bodyParser = require('body-parser'); // will populate the req.body property with the parsed body when the Content-Type request header matches the type option, or an empty object ({}) if there was no body to parse
const app = express()
const port = 3000

app.use( bodyParser.json() );


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://104.248.89.22:27017/4WashDB"; //ip + port MongoDB (asculta pt request-uri de la client)

app.use(express.static( 'static' ));

app.get('/users', (req, res) => {

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;

        var dbo = db.db("4WashDB");

        var query = { username: "chitu_irina" };

        dbo.collection("User").findOne({}, function(err, result) {
            if (err) throw err;
            console.log(result.name);
            res.send(JSON.stringify(result));
            db.close();
        });

        // dbo.collection("User").find(query).toArray(function(err, result) {
        //     if (err) throw err;
        //     console.log(result);
        //     res.send(result[0].active_reservations);
        //     db.close();
        // });

    });

})

  // Get Washing Point jsons

app.get('/washingpoints', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;

        var dbo = db.db("4WashDB");

        dbo.collection("WashPoint").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            res.send({result: result});
        });
    });

});


app.get('/todayschedule', (req, res) => {

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;

        var dbo = db.db("4WashDB");

        var query = { date: '2019-07-10T00:00:00.000+00:00' };

        dbo.collection("WashPoint").find(query).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);
                res.send(result);
                db.close();
        });

        // dbo.collection("User").find(query).toArray(function(err, result) {
        //     if (err) throw err;
        //     console.log(result);
        //     res.send(result[0].active_reservations);
        //     db.close();
        // });

    });

})

app.listen(port, () => console.log(`App listening on port ${port}!`))
