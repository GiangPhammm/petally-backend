const functions = require('firebase-functions');
const express = require('express');

// Grant firebase admin right
const admin = require('firebase-admin');
var serviceAccount = require('./secrets/permissions.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
const db = admin.firestore();

// Allow another domain origin
const cors = require('cors');
app.use(cors({origin: true}));

// Signup
app.post('/signup', (req, res) => {
    (async () => {
        try {
            await db.collection('accounts').doc('/' + req.body.id + '/')
                .create({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                })
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
})

// Get account
app.post('/get/user/:id', (req, res) => {
    (async () => {
        try {
            const document = db.collection('accounts').doc(req.params.id);
            let account = await document.get();
            let response = account.data()

            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
})


// Export api to firebase cloud functions
exports.app = functions.https.onRequest(app)