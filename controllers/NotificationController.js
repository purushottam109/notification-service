const NotificationHelper = require("./NotificationHelper");
const { validationResult } = require('express-validator/check');

// Send a notification
// user : the user to send notification to
// medium: the medium to use
// schedule: DateTime in UTC miliseconds, ensures the time syncronization
// message: message to be sent
const send = async (req, res) => {
    try {
        // Finds the validation errors in this request and wraps them in an object
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        }
        // forward to business logic
        await NotificationHelper.send(req, res);
        res.send(200);
    } catch (e) {
        console.log(e);
        res.send(500);
    }
}

exports.send = send;