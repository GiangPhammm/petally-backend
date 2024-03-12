// TODO: add check credential (email availability, password format etc.)

import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';

/**
 * @param {Express} app
 * @param {Auth} auth
 */
export const signupWithEmailAndPassword = (app, auth) => {
    app.post('/signup', async (req, res) => {
        const {
            username,
            email,
            password,
            passwordConfirmation,
        } = req.body;
        try {
            if (!email && !password) {
                return null;
            }

            if (password !== passwordConfirmation) {
                res.json({error: 'Unmatched passwords'});
                return null;
            }

            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );

            if (userCredential && auth.currentUser) {
                try {
                    updateProfile(auth.currentUser, {
                        displayName: username,
                    });
                } catch (error) {
                    console.log(error);
                }
            }

            res.json(userCredential);

            return userCredential;
        } catch (error) {
            return res.status(500).json({
                error: 'Invalid email or password format',
            });
        }
    });
};

/**
 * @typedef {import('express').Express} Express
 * @typedef {import('firebase/auth').Auth} Auth
 */
