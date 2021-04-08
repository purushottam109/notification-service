const dbConfig = require("../config.json");

// connnector module to connnect to the MongoDb instance
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.notifications = require("./models/NotificationModel")(mongoose);

module.exports = db;