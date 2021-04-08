const { job } = require("./cron-job.js");
const { cronFrequency } = require("./config.json");
const { EmailQueueHandler } = require("./MediumHandlers/Email/Handler");
const db = require("./data/connector");
const { dbConfig } = require("./config.json");

// start all the components before starting the app
const startServices = async () => {
    try {
        // connect to the database
        await db.mongoose
            .connect(dbConfig.url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        console.log("Connected to the database!");

        // start all the QueueHandlers
        await EmailQueueHandler.start();
        console.log("sratete the services");

        // start the cronjob 
        cron.schedule(cronFrequency, job);
        console.log("sratete the cron-job");

    } catch (err) {
        console.log("Something went wrong!", err);
        process.exit();
    }
}

exports.startServices = startServices;
