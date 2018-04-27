const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID; // we will use this later

MongoClient.connect('mongodb://admin1:admin@ds259089.mlab.com:59089/crud_using_node', (err, database) => {
    var dbase = database.db("crud_using_node");
    if (err) return console.log(err)

    app.listen(3000, () => {
        console.log('app working on 3000')
    })

    // Creating an Entry
    app.post('/name/add', (req, res, next) => {

        var name = {
            first_name: req.body.first_name,
            last_name: req.body.last_name
        };

        dbase.collection("name").save(name, (err, result) => {
            if (err) {
                console.log(err);
            }

            res.send('name added successfully');
        });
    });

    // To test this application for Adding an Entry:
    // open Postman
    // tick x - www - form - urlencoded
    // make a post request to http://localhost:3000/name/add with the key as first_name and last_name 

    // Reading All Entries
    app.get('/name', (req, res) => {
        dbase.collection('name').find().toArray((err, results) => {
            res.send(results)
        });
    });

    // Reading by ID
    app.get('/name/:id', (req, res, next) => {
        if (err) {
            throw err;
        }

        let id = ObjectID(req.params.id);
        dbase.collection('name').find(id).toArray((err, result) => {
            if (err) {
                throw err;
            }

            res.send(result);
        });
    });

    // Updating by ID
    app.put('/name/update/:id', (req, res, next) => {
        let id = {
            _id: ObjectID(req.params.id)
        };

        dbase.collection("name").update({ _id: id }, { $set: { 'first_name': req.body.first_name, 'last_name': req.body.last_name } }, (err, result) => {
            if (err) {
                throw err;
            }
            res.send('user updated sucessfully');
        });
    });

    // Deleting by ID
    app.delete('/name/delete/:id', (req, res, next) => {
        let id = ObjectID(req.params.id);

        dbase.collection('name').deleteOne(id, (err, result) => {
            if (err) {
                throw err;
            }

            res.send('user deleted');
        });
    });
})


// app.listen(3000, function () {
//     console.log('listening on 3000');
// });

// app.get('/', function (req, res) {
//     res.send("Yep it's working");
// });

// app.get('/world', (req, res) => {
//     res.send('Hello world!!');
// });

