import functions from 'firebase-functions';
import express from 'express';
import admin from 'firebase-admin';
import cors from 'cors';

import serviceAccount from './secrets/permissions.json';
import * as routes from './routes/index.js';

// Grant firebase admin right
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const app = express();
const db = admin.firestore();

// Apply authentification to all routes
// app.use(authMiddleware);

// Allow another domain origin
app.use(cors({origin: true}));

routes.signupWithEmailAndPassword(app, admin);

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
export default functions.https.onRequest(app);
