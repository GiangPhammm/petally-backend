import functions from 'firebase-functions';
import express from 'express';
import admin from 'firebase-admin';
import cors from 'cors';
import firebase from 'firebase/compat/app';
import {getAuth} from 'firebase/auth';

import {firebaseConfig} from './secrets/firebase-config.js';
import serviceAccount from './secrets/permissions.json' with {type: 'json'};
import * as routes from './src/index.js';

// Grant firebase admin right
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

firebase.initializeApp(firebaseConfig)

const app = express();
const auth = getAuth();

// Apply authentification to all routes
// app.use(authMiddleware);

// Allow another domain origin
app.use(cors({origin: true}));

routes.signupWithEmailAndPassword(app, auth);
routes.loginWithEmailAndPassword(app, auth);
routes.logoutWithEmailAndPassword(app, auth);

// Export api to firebase cloud functions
export default functions.https.onRequest(app);
