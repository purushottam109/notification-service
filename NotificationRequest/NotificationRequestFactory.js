const MediumEnums = require('../MediumEnums');
// base Request
function NotificationRequest(message, type) {
    this.message = message;
    this.type = type;
}

// Email notification Object
function EmailNotificationRequest(message, email) {
    this.email = email;
    Object.assign(this, new NotificationRequest(message, MediumEnums.Medium.EMAIL));
};

//SMS notification Object
function SMSNotificationRequest(message, number) {
    this.number = number;
    Object.assign(this, new NotificationRequest(message, MediumEnums.Medium.SMS));
};


//A factory for the Notification Requests
function NotificationRequestFactory() {
    this.create = (type, options) => {
        options = options || {};
        try {
            switch (type) {
                case MediumEnums.Medium.EMAIL:
                    return new EmailNotificationRequest(options.message, options.email);

                case MediumEnums.Medium.SMS:
                    return new SMSNotificationRequest(options.message, options.number);
                default:
                    {
                        console.log('Unknown Request type...');
                    }
            }
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new NotificationRequestFactory();