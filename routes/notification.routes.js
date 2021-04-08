const { notifications } = require("../data/connector");
const { validate } = require("../controllers/Validator");
module.exports = app => {
    const notificationController = require(".././controllers/NotificationController");

    var router = require("express").Router();

    /**
    * @api {post} /api/send Send Request
    *
    * @apiParam  {String} [user] user
    * @apiParam  {String} [medium] Medium
    * @apiParam  {number} [schedule] time in miliseconds for the notification
    * @apiParam  {Object} [message] Message
    *
    * @apiSuccess (200) 
    */
    router.post(
        '/send',
        validate('send'), // request validation express-validator
        notificationController.send);


    // for sending Ad Hoc notifications
    // would have the Authorization middleware
    // Const sendAdHoc(req, auth, res)
    // router.post(
    //     '/sendAdHoc',
    //     notificationController.validate('sendAdHoc'), // request validation express-validator
    //     notificationController.sendAdHoc);

    app.use('/api/notification', router);
};


