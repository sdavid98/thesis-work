const express = require('express');
const ObjectId = require('mongodb').ObjectID;
const functions = require('firebase-functions');
const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid');
const redis = require("redis");
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const getClient = require('./db');

const redisClient = redis.createClient({
    host: 'eu1-gorgeous-ladybug-30556.lambda.store',
    port: '30556',
    password: '958c6e8da26649ad8f91a04a06408e2c',
    tls: {}
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
    genid: (req) => {
        return uuid()
    },
    name: '_redisIntro',
    store: new RedisStore({client: redisClient}),
    cookie: { secure: false, maxAge: 60000 },
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

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

app.post('/projects/new', async (req, res) => {
    const client = await getClient();
    const mailData = client.db("mailteq_dev").collection("mailData");
    const projectInfo = client.db("mailteq_dev").collection("projectInfo");

    redisClient.get('userID', (err, key) => {
        if (err) throw err;
        mailData.insertOne(req.body.mailData, (err, response) => {
            if (err) throw err;
            const projectData = {
                _id: ObjectId(response.insertedId),
                created_at: Date.now(),
                created_by: key,
                name: req.body.mailData.items.projectInfo.name
            };
            projectInfo.insertOne(projectData, { forceServerObjectId: false }, (err, response) => {
                if (err) throw err;
                console.log("1 info inserted", response.ops);
                res.send({saved: true});
            });
        });
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
            res.send({registered: true});
            console.log("1 user inserted");
        });
    } else {
        res.send({registered: false});
    }
});

app.post('/login', async (req, res) => {
    /*if (redisClient.get('isLoggedIn', (err, reply) => reply === true)) {
        res.send({login: 'already logged in'});
        return;
    }*/
    const user = await findUserByEmail(req.body.email);
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        req.session.key = user;
        redisClient.set('isLoggedIn', true);
        redisClient.set('userID', user._id.toString());
        res.send({user: {name: user.name, group: user.group}});
    }
    else {
        res.send({login: 'failed'});
    }
});

app.get('/logout', async (req, res) => {
    console.log(req.session);
    /*redisClient.del('isLoggedIn', (err, reply) => {
        res.send({login: 'deleted login'});
    });*/
    res.send();
});

exports.app = functions.https.onRequest(app);