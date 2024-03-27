import {signInWithEmailAndPassword} from 'firebase/auth';

/**
 * @param {Express} app
 * @param {Auth} auth
 */
export const loginWithEmailAndPassword = async (app, auth) => {
    app.post('/login', async (req, res) => {
        const {email, password} = req.body;

        try {
            signInWithEmailAndPassword(auth, email, password,
            ).then((response) => {
                res.json(response.user);
            });
        } catch (error) {
            res.status(500).json({error: 'Server error'});
        }
    });
};

/**
 * @typedef {import('express').Express} Express
 * @typedef {import('firebase/auth').Auth} Auth
 */
