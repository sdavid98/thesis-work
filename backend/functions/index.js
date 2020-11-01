const express = require('express');
const ObjectId = require('mongodb').ObjectID;
const functions = require('firebase-functions');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const getClient = require('./db');

const saltRounds = 5;
const accessTokenSecret = 'youraccesstokensecret';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true,
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    }
));

app.use(cookieParser());

const findUserByEmail = async (email) => {
    const client = await getClient();
    const collection = client.db("mailteq_dev").collection("users");
    return collection.findOne({email: email});
};

app.get('/projects', async (req, res) => {
    const client = await getClient();
    const collection = client.db("mailteq_dev").collection("projectInfo");
    collection.find({}).toArray((err, data) => {
        if (err) throw err;
        res.send(data);
    });
});

app.post('/projects/new', async (req, res) => {
    const client = await getClient();
    const mailData = client.db("mailteq_dev").collection("mailData");
    const projectInfo = client.db("mailteq_dev").collection("projectInfo");

    mailData.insertOne(req.body.mailData, (err, response) => {
        if (err) throw err;
        const projectData = {
            _id: ObjectId(response.insertedId),
            created_at: Date.now(),
            created_by: 'John',
            name: req.body.mailData.items.projectInfo.name
        };
        projectInfo.insertOne(projectData, { forceServerObjectId: false }, (err, response) => {
            if (err) throw err;
            console.log("1 info inserted", response.ops);
            res.send({saved: true});
        });
    });
});

app.get('/projects/:projectId', async (req, res) => {
    const client = await getClient();
    const collection = client.db("mailteq_dev").collection("mailData");
    collection.findOne({_id: ObjectId(req.params.projectId)}).then((data) => {
        res.send(data);
        return;
    }).catch(err => {
        throw err
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
    const user = await findUserByEmail(req.body.email);
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        const accessToken = jwt.sign({ username: user.name,  userID: user._id, userGroup: user.group }, accessTokenSecret);
        res.cookie('token', accessToken, {sameSite: "none", secure: true});
        res.send({user: {name: user.name, group: user.group}});
    }
    else {
        res.send({login: 'failed'});
    }
});

app.get('/logout', async (req, res) => {
    /*redisClient.del('isLoggedIn', (err, reply) => {
        res.send({login: 'deleted login'});
    });*/
    res.send();
});

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

exports.app = functions.https.onRequest(app);