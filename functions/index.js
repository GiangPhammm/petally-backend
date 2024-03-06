import functions from 'firebase-functions';
import express from 'express';
import admin from 'firebase-admin';
import cors from 'cors';

import serviceAccount from './secrets/permissions.json' with {type: 'json'};
import * as routes from './src/index.js';

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
routes.loginWithEmailAndPassword(app, admin);

// Export api to firebase cloud functions
export default functions.https.onRequest(app);
