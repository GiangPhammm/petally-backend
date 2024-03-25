import {
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
} from 'firebase/auth';

/**
 * @param {Express} app
 * @param {Auth} auth
 */
export const authenticateWithGoogle = async (app, auth) => {
    const provider = new GoogleAuthProvider();
    app.post('/auth-google', async (req, res) => {
        signInWithPopup(auth, provider).then((response) => {
            const credential = GoogleAuthProvider.credentialFromResult(response);
            const token = credential.accessToken;
            const user = response.user;
            res.json({
                token: token,
                user: user,
            });
        }).catch((error) => {
            res.json(error.message);
        });
    });
};

/**
 * @param {Express} app
 * @param {Auth} auth
 */
export const authenticateWithFacebook = async (app, auth) => {
    const provider = new FacebookAuthProvider();
    app.post('/auth-google', async (req, res) => {
        signInWithPopup(auth, provider).then((response) => {
            const credential = FacebookAuthProvider.credentialFromResult(response);
            const token = credential.accessToken;
            const user = response.user;
            res.json({
                token: token,
                user: user,
            });
        }).catch((error) => {
            res.json(error.message);
        });
    });
};

/**
 * @typedef {import('express').Express} Express
 * @typedef {import('firebase/auth').Auth} Auth
 */
