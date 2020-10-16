const ObjectId = require('mongodb').ObjectID;
const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://nlAdmin:qpCCJpwm0P2vtmoi@malteq.j3m2h.gcp.mongodb.net/mailteq_dev?retryWrites=true&w=majority";

app.get('/add', (req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
    const collection = client.db("mailteq_dev").collection("mailData");
    client.connect(() => {
        var myobj = { created_at: "2020-10-16 11:11", created_by: "John", name: "ASD Project DE_2020_2" };
        collection.insertOne(myobj, (err, res) => {
            if (err) throw err;
            console.log("1 document inserted");
        });
        client.close();
    });
    res.send('New Document Added to Collection "mailData"');
});

app.get('/list', (req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
    client.connect(() => {
        const collection = client.db("mailteq_dev").collection("mailData");
        collection.find({}).toArray((err, data) => {
            res.send(data);
            client.close();
        });
    });

});

app.get('/list/:projectId', (req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
    client.connect(() => {
        const collection = client.db("mailteq_dev").collection("mailData");
        collection.findOne({_id: ObjectId(req.params.projectId)}).then(data => {
            res.send(data);
            client.close();
        });
    });
});

exports.app = functions.https.onRequest(app);