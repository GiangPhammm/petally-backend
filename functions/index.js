const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

const app = express();

// Route
app.get('/hello', (req, res) => {
    return res.status(200).send('Hi there')
})

// Export api to firebase cloud functions
exports.app = functions.https.onRequest(app)