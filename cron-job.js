const { getDataByCurrentTime, sendNotificationToTopic, deleteDataArray } = require("./controllers/NotificationHelper.js");

// run the cron job to send the latest scheduled notifications 
// once the notifications are sent, delete them from the database
// and failed notification will stay back and retried
const job = async () => {
    try {
        // get the latest notifications
        const notifications = await getDataByCurrentTime();
        // store the successfully completed notification IDs
        const completed = [];

        // batch promise send all the notifications
        const eventPromises = notifications.map(async (notification) => {
            try {
                await sendNotificationToTopic(notification);
                completed.append(notification.id);
                // could cause too many calls and degrade performance
                // await NotificationHelper.deleteDataArray(completed);
            } catch (e) {
                console.log(e);
            }
        });

        // All the notification send attempted
        await Promise.allSettled(eventPromises);

        // delete the successully sent notifications from the database
        //maybe could be dirty
        await deleteDataArray(completed);

    } catch (e) {
        throw (e);
    }
}

exports.job = job;