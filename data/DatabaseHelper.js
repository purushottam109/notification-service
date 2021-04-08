const db = require("./connector");
const Notification = db.notifications;


// save notification to the Database
const saveToDatabase = async (notification, schedule) => {
    const dbObject = new Notification({
        notification, schedule
    });
    await save(dbObject);
}
// save data to database
const save = (notification) => {
    notification.save();
};

// get all the notifications scheduled till current time
const getDataByCurrentTime = () => {
    Notification.find({
        schedule: {
            $lte: new Date().getTime(),
        }
    });
};

// delete all notification with provided indexes
const deleteDataArray = (array) => {
    Notification.delete({
        _id: { _id: { $in: array } }
    });
};

// delete notification with provided index
const deleteDataById = (id) => {
    Notification.findByIdAndRemove(id, { useFindAndModify: false })
};
exports.saveToDatabase = saveToDatabase;
exports.save = save;
exports.getDataByCurrentTime = getDataByCurrentTime;
exports.deleteDataArray = deleteDataArray;
exports.deleteDataById = deleteDataById;