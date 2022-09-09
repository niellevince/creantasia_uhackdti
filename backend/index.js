require('dotenv').config();
require('./controllers/helpers/helpers');
const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');

const app = express();
const http = require('http');
const server = http.createServer(app);

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const dbUri = process.env.MONGODB_URI;
mongoose.connect(dbUri, (err) => {
    if (err != null) return console.error(err);
    console.log(`MongoDB connected to: ${process.env.MONGODB_URI}`);
})

const origins = [
    process.env.APP_FRONT_END,
    'http://192.168.110.160:8080',
    'http://192.168.110.160:8081',
    'http://192.168.110.160:8082',
    'http://192.168.110.160:8083',
    'http://192.168.56.1:81'
];

// Express Server
server.listen(process.env.APP_PORT, () => {
    console.log(`${process.env.APP_NAME} is now up running.`);
    console.log(`Express JS running on port ${process.env.APP_PORT}`);
});

const config = {
    origin: '*',
    // credentials: true,
}

app.use(cors(config))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(fileUpload({
    createParentPath: true
}));

// Routes
const web = require('./routes/web');
app.use(web);