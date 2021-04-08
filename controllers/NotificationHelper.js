const { createRequest } = require("../NotificationRequest/NotificationRequestHelper")
const { saveToDatabase } = require("../data/DatabaseHelper");
const { region, mediumTopicUrl } = require(".././config.json");
var AWS = require('aws-sdk');
AWS.config.update({ region: region });

// decides whether to schdule or dispatch the notification
const send = async (req, res) => {
    try {
        const { user, medium, schedule, message } = req.body;
        try {
            // creates the appropriate NotificationRequest Object for the medium viz SMS, Email
            const notification = await createRequest(message, user, medium);
        } catch (e) {
            console.log(e);
            res.status(400).send({ message: "Something went wrong, Please verify the request params" });
        }
        if (req.body.schedule) {
            // schedule provided; schedule the notification to be sent later
            DatabaseHelper.saveToDatabase(notification, schedule);
        } else {
            // otherwise, Send the notification immediately]
            await sendNotificationToTopic(notification);
        }
    } catch (e) {
        console.log(e);
    }
}

// get the endpoint for the respective Medium Topic from the config.json
const getTopicforMediumType = (type) => {
    return mediumTopicUrl[type];
}

//Send notificaiton to the Topics
const sendNotificationToTopic = async (notification) => {
    // Create publish parameters
    const params = {
        Message: { message: notification },
        TopicArn: getTopicforMediumType(notification.type),
    };
    try {
        // Publish it to the SNS Topic and wait to be Qued at the appropriate subscriber
        await new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();
    } catch (e) {
        console.log(e);
    };
}

exports.send = send;
exports.sendNotificationToTopic = sendNotificationToTopic;