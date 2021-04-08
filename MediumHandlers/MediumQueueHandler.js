const { Consumer } = require('sqs-consumer');
const SQS = require('aws-sdk/clients/sqs');
const sqs = new SQS();
const { region } = require('../config.json');

// CREATES THE QUEUE HANDLER FOR THE MEDIUM QUEUES LIKE EMAIL QUEUE, SLACK QUEUE
// HERE I USE THE SQS-CONSUMER TO ADDRESS THE POLLING SITUATION OF THE MEDIUM QUEUE
//AS SOON AS MESSAGES AVAILABLE ON QUEUE, IT RECEIVES THEM IN BATCHED IF POSSIBLE

// Queue url provided in config
// handler function is passed for each medium we add
const MediumQueueHandler = async (queueUrl, handlerFunction) => {
    try {
        const handler = await Consumer.create({
            queueUrl,
            handleMessageBatch: handlerFunction,
            region: region,
            batchSize: 10, // play around such settings
        });
        // await handler.start();
        return handler;
    } catch (e) {
        console.log(e);
    }
}

exports.MediumQueueHandler = MediumQueueHandler;







