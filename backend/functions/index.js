const express = require('express');
const ObjectId = require('mongodb').ObjectID;
const functions = require('firebase-functions');
const bcrypt = require('bcrypt');
const redis = require("redis");
const session = require('express-session');

const RedisStore = require('connect-redis')(session);
const redisClient = redis.createClient({
    host: 'eu1-gorgeous-ladybug-30556.lambda.store',
    port: '30556',
    password: '958c6e8da26649ad8f91a04a06408e2c',
    tls: {}
});
redisClient.on("error", function (err) {
    throw err;
});

const getClient = require('./db');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
    name: 'redisIntro',
    store: new RedisStore({client: redisClient}),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const saltRounds = 5;

const findUserByEmail = async (email) => {
    const client = await getClient();
    const collection = client.db("mailteq_dev").collection("users");
    return collection.findOne({email: email});
};

app.get('/projects', async (req, res) => {
    const client = await getClient();
    const collection = client.db("mailteq_dev").collection("projectInfo");
    collection.find({}).toArray((err, data) => {
        res.send(data);
    });
});

app.get('/projects/:projectId', async (req, res) => {
    const client = await getClient();
    const collection = client.db("mailteq_dev").collection("projectInfo");
    collection.findOne({_id: ObjectId(req.params.projectId)}).then((data) => {
        res.send(data);
    });
});

app.post('/register', async (req, res) => {
    if (await findUserByEmail(req.body.email) === null) {
        const client = await getClient();
        const collection = client.db("mailteq_dev").collection("users");
        const hashedPw = await bcrypt.hash(req.body.password, saltRounds);
        const newUser = {
            email: req.body.email,
            password: hashedPw,
            name: req.body.name
        };
        collection.insertOne(newUser, (err, response) => {
            if (err) throw err;
            res.send({registered: true, pw: hashedPw});
            console.log("1 user inserted");
        });
    } else {
        res.send({registered: false});
    }
});

app.post('/login', async (req, res) => {
    if (redisClient.get('isLoggedIn', (err, reply) => reply === true)) {
        res.send({login: 'already logged in'});
        return;
    }
    const user = await findUserByEmail(req.body.email);
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        redisClient.set('isLoggedIn', true);
        res.send({login: 'logged in now'});
    }
});

exports.app = functions.https.onRequest(app);