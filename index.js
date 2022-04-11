const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const router = express.Router();

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const mongoose = require('mongoose');

const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_DATABASE = process.env.MONGO_DATABASE;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_KEY = process.env.MONGO_KEY;
const MONGODB_URI = `mongodb://${MONGO_USER}:${MONGO_KEY}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`;
console.log('mongodb_uri', MONGODB_URI);
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    dbName: 'promotions'
})
.then(_ => console.log('Connected successfully to MongoDB'))
.catch(error => console.log('Error connecting to MongoDB', error));

//root route
app.get('/', (req, res) => {
    res.json({message: 'Welcome to Walmart Services Testing Application'});
});

require('./app/routes')(app, router);

const PORT = 8085;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

exports.app = app;