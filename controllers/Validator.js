const { body } = require('express-validator/check')
const MediumEnums = require('../MediumEnums.js');

// Validated the request parameters
exports.validate = (method) => {
    switch (method) {
        case 'send': { // for the NotificationController.send()
            return [
                body('user').exists().isString(),
                body('medium').exists().isIn(Object.values(MediumEnums.Medium)),
                body('schedule').optional().isInt(),
                body('message').exists().isObject()
            ]
        }
    }
}