const express = require('express');
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
        origin: 'https://mailteq-frontend.web.app',
        credentials: true,
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    }
));

app.use(cookieParser());
require('./routes/projectRoutes')(app);

const findUserByEmail = async (email) => {
    const client = await getClient();
    const collection = client.db("mailteq_dev").collection("users");
    return collection.findOne({email: email});
};

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
        const expireDate = Math.floor(Date.now() / 1000) + (60 * 60);
        const accessToken = jwt.sign({
            exp: expireDate,
            username: user.name,
            userID: user._id,
            userGroup: user.group
        }, accessTokenSecret);
        res.send({user: {name: user.name, group: user.group}, token: accessToken, expireDate});
    } else {
        res.send({login: 'failed'});
    }
});

app.get('/logout', async (req, res) => {
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