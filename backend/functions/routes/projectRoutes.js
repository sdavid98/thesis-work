const router = require('express').Router();
const ObjectId = require('mongodb').ObjectID;
const getClient = require('../db');

module.exports = (app) => {
    router.get('/projects', async (req, res) => {
        const client = await getClient();
        const collection = client.db("mailteq_dev").collection("projectInfo");
        collection.find({}).toArray((err, data) => {
            if (err) throw err;
            res.send(data);
        });
    });

    router.get('/projects/:projectId', async (req, res) => {
        const client = await getClient();
        const collection = client.db("mailteq_dev").collection("mailData");
        collection.findOne({_id: ObjectId(req.params.projectId)}).then((data) => {
            res.send(data);
            return;
        }).catch(err => {
            throw err
        });
    });

    router.post('/projects/new', async (req, res) => {
        const client = await getClient();
        const mailData = client.db("mailteq_dev").collection("mailData");
        const projectInfo = client.db("mailteq_dev").collection("projectInfo");

        mailData.insertOne(req.body.payload.mailData, (err, response) => {
            if (err) throw err;
            const projectData = {
                _id: ObjectId(response.insertedId),
                created_at: Date.now(),
                created_by: req.body.payload.user.name,
                group: req.body.payload.user.group,
                name: req.body.payload.mailData.items.projectInfo.name,
                view_id: Date.now() + response.insertedId
            };
            projectInfo.insertOne(projectData, {forceServerObjectId: false}, (err, response) => {
                if (err) throw err;
                res.send({saved: true, projectId: response.insertedId});
            });
        });
    });

    router.post('/projects/:projectId', async (req, res) => {
        const client = await getClient();
        const mailData = client.db("mailteq_dev").collection("mailData");
        const projectInfo = client.db("mailteq_dev").collection("projectInfo");

        Promise.all([
            mailData.updateOne({_id: ObjectId(req.params.projectId)}, {
                $set: {
                    items: req.body.payload.mailData.items,
                    structure: req.body.payload.mailData.structure
                }
            }),
            projectInfo.updateOne({_id: ObjectId(req.params.projectId)}, {
                $set: {
                    name: req.body.payload.mailData.items.projectInfo.name,
                    updated_at: Date.now(),
                    updated_by: req.body.payload.user.name
                }
            })
        ])
            .then((data) => {
                res.send(data);
                return;
            }).catch(err => {
            throw err
        });
    });

    router.get('/projects/view/:viewId', async (req, res) => {
        const client = await getClient();
        const mailData = client.db("mailteq_dev").collection("mailData");
        const projectInfo = client.db("mailteq_dev").collection("projectInfo");

        projectInfo.findOne({view_id: req.params.viewId}).then((data) => {
            if (data) {
                mailData.findOne({_id: data._id}).then(result => {
                    res.send(result);
                    return;
                }).catch(err => {
                    throw err
                });
            } else {
                res.send();
            }
            return;
        }).catch(err => {
            throw err
        });
    });

    router.post('/projects/comment/:viewId', async (req, res) => {
        const client = await getClient();
        const projectComment = client.db("mailteq_dev").collection("projectComment");

        projectComment.updateOne(
            {_id: req.params.viewId},
            {
                $set: {
                    comments: req.body.payload,
                }
            }, {upsert: true})
            .then(data => {
                res.send(data);
                return;
            })
            .catch(err => {
                throw err
            });
    });

    router.get('/projects/comment/:viewId', async (req, res) => {
        const client = await getClient();
        const projectComment = client.db("mailteq_dev").collection("projectComment");

        projectComment.findOne({_id: req.params.viewId}).then((data) => {
            res.send(data);
            return;
        }).catch(err => {
            throw err
        });
    });

    app.use(router);
};