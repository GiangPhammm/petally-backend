import {signOut} from 'firebase/auth';

/**
 * @param {Express} app
 * @param {Auth} auth
 */
export const logout = async (app, auth) => {
    // @ts-ignore
    app.post('/logout', async (req, res) => {
        try {
            await signOut(auth).then((response) => {
                res.json(response);
            });

            return res.status(200).send();
        } catch (error) {
            res.status(500).json({error: 'Server error'});
        }
    });
};

/**
 * @typedef {import('express').Express} Express
 * @typedef {import('firebase/auth').Auth} Auth
 */
