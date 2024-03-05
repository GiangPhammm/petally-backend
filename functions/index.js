const functions = require('firebase-functions');
const express = require('express');
// Grant firebase admin right
const admin = require('firebase-admin');
const serviceAccount = require('./secrets/permissions.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const authMiddleware = require('./authMiddleware');
app.use(authMiddleware); // apply auth to all routes

const app = express();
const port = 5001;
const db = admin.firestore();
// Allow another domain origin
const cors = require('cors');

app.use(cors({origin: true}));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

// Signup
app.post('/user/signup', (req, res) => {
    (async () => {
        try {
            await db.collection('accounts').doc('/' + req.body.id + '/')
                .create({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                });
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

// Login
// app.post('/user/login', middleware, (req, res) => { 
app.post('/user/login', (req, res) => {
    (async () => {
        try {
            await db.collection('accounts').doc('/' + req.body.id + '/')
                .create({
                    email: req.body.email,
                    password: req.body.password,
                });
            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

// Get account by id
app.get('/user/:id', (req, res) => {
    (async () => {
        try {
            const document = db.collection('accounts').doc(req.params.id);
            const account = await document.get();
            const response = account.data();

            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

// Get all accounts
app.get('/users', (req, res) => {
    (async () => {
        try {
            const query = db.collection('accounts');
            const response = [];

            await query.get().then((querySnapshot) => {
                const docs = querySnapshot.docs;

                for (const doc of docs) {
                    const selectedItem = {
                        id: doc.id,
                        username: doc.data().username,
                        email: doc.data().email,
                    };
                    response.push(selectedItem);
                }

                return response;
            });

            return res.status(200).send(response);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

// Update account by id
app.post('/update/user/:id', (req, res) => {
    (async () => {
        try {
            const document = db.collection('accounts').doc(req.params.id);
            await document.update({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            });
            return res.status(200).send();
        } catch (error) {
            console.log(error);

            return res.status(500).send(error);
        }
    })();
});

// Delete account
app.delete('/delete/user/:id', (req, res) => {
    (async () => {
        try {
            const document = db.collection('accounts').doc(req.params.id);
            await document.delete();

            return res.status(200).send();
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

// Export api to firebase cloud functions
exports.app = functions.https.onRequest(app);
