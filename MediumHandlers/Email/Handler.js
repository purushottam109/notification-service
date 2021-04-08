const MediumQueueHandler = require("../MediumQueueHandler.js");
var { queues } = require(".././config.json");
const EmailService = require(".././Services/Email/EmailService.js");
const SQS = require('aws-sdk/clients/sqs');
const sqs = new SQS();
// QUEUE HANDLER IMPLEMENTED FOR EMAIL MEDIUM HERE BUT CAN BE REUSED WHILE ADDING OTHER MEDIUMS

// this function processes the messages received from the Email Queue
// responsible for connectng to the Third Party Email Service and sending the notification to it

// messages
const EmailQueueHandlerFunction = async (messages, done) => {
    // connect to the Email Service
    const connection = await EmailService.connect();
    try {
        const eventPromises = messages.map(async (record) => {
            try {
                // send the notification to the EmailService to send the Email
                await processMessage(connection, record);
                // delete notification from the Queue
                await sqs.deleteMessage({
                    QueueUrl: queues.EmailQueueUrl,
                    ReceiptHandle: record.receiptHandle
                }).promise();
            } catch (error) {
                throw error;
            }
        });

        // get status after all notifications are processed
        const processedEvents = await Promise.allSettled(eventPromises);
        const failedEvents = processedEvents
            .filter((r) => r.status === 'rejected');
        //if any notification failed to be processed, Partial batch failure!
        if (failedEvents.length) throw new Error('Partial batch failure');
        // else All notification processed successfully
        done();
    } catch (error) {
        logger.log(error);
    }
}

// Send the notification to the Email Service
async function processMessage(connection, record) {
    try {
        // Use the connection
        // Finally Send the notification to the Email Service WELL DONE!!
        await EmailService.Send(connection, record.email, record.message);
    }
    catch (error) {
        throw error;
    }
}

// crteates the Handler for the Email Queue
// takes in parameters from the Queue and other parameters set in MediumQueueHandler
// and can be tuned accordingly
const EmailQueueHandler = MediumQueueHandler(queues.EmailQueueUrl, EmailQueueHandlerFunction);

exports.EmailQueueHandler = EmailQueueHandler;

