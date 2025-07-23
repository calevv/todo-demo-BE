const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', indexRouter);

const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;
const mongoURI = MONGODB_URI_PROD;

mongoose
    .connect(mongoURI)
    .then(() => {
        console.log('mongoose connectes');
    })
    .catch((err) => {
        console.log('DB connecton fail', err);
    });

app.listen(process.env.PORT || 5000, () => {
    console.log('server on 5000');
});
