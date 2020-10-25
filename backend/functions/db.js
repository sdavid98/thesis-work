const MongoClient = require("mongodb").MongoClient;

const url = "mongodb+srv://nlAdmin:qpCCJpwm0P2vtmoi@malteq.j3m2h.gcp.mongodb.net/mailteq_dev?retryWrites=true&w=majority";

let client;

const getClient = async () => {
    if (client && client.isConnected()) {
        console.log("DB CLIENT ALREADY CONNECTED");
    } else
        try {
            client = await MongoClient.connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log("DB CLIENT RECONNECTED");
        } catch (e) {
            throw e;
        }

    return client;
};

module.exports = getClient;