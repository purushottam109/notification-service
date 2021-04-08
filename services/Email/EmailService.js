// Just an Example of how we would interact with the
// Third party Medium Services like SMS, Whatsapp, Slack, etc


// geth the service endpoint from config
const config = require(".././config.json");
const EmailServiceEndpoint = config.service.emailServiceUrl;

// to connect to the Medium Service
const connect = () => {
    // assumed resolves
    connect(EmailServiceEndpoint);
}

const send = async (connection, email, message) => {
    // makes call to the MediumService API to send the notification
}
exports.connect = connect;
exports.send = send;
