// TODO: add check credential (email availability, password format etc.)

import {createUserWithEmailAndPassword} from 'firebase/auth';

export const signupWithEmailAndPassword = (app, auth) => {
    app.post('/signup', async (req, res) => {
        const {email, password} = req.body;
        try {
            const response = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );

            res.json(response);

            return res.status(200).send();
        } catch (error) {
            return res.status(500).json({
                error: 'Invalid email or password format',
            });
        }
    });
};
