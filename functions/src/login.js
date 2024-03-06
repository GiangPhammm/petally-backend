import axios from 'axios';

import {API_KEY} from '../secrets/api-key.js';

export const loginWithEmailAndPassword = async (app, admin) => {
    app.post('/login', async (req, res) => {
        try {
            const response = await axios.post(
                `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
                {
                    email: req.body.email,
                    password: req.body.password,
                    returnSecureToken: true,
                },
            );

            const {idToken} = response.data;

            res.json({
                status: 'Success',
                msg: 'User logged in successfully',
                token: idToken,
            });
        } catch (error) {
            console.log('Error logging in: ', error);
            res.status(401).json({error: 'Invalid credentials'});
        }
    });
};
