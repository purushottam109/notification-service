
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { startServices } = require("./startUp");


// parse requests of content-type - application/json
app.use(bodyParser.json());

// for validating the request and error handling
// app.use(expressValidator)()

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// require("./logger.js");

// start all services
startServices();

require("./routes/notification.routes.js")(app);

// api is working
app.get('/', (req, res) => {
    console.log('api HIT!');
    res.json({ message: "Welcome to the Notification application by Purushottam Shrama" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});


