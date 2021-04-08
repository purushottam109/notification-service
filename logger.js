const winston = require('winston');

// simple log in combined.log
var logger = winston.createLogger({
    transports: [
        new (winston.transports.File)({ filename: 'combined.log' })
    ]
});