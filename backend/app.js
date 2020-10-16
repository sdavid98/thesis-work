const express = require('express');
const app = express();
const port = 3001;

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://nlAdmin:qpCCJpwm0P2vtmoi@malteq.j3m2h.gcp.mongodb.net/mailteq_dev?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


app.get('/', (req, res) => {
    client.connect(err => {
        const collection = client.db("mailteq_dev").collection("malteq");
        // perform actions on the collection object
        var myobj = { name: "Company Inc", address: "Highway 37" };
        collection.insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
        });
        client.close();
    });
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});