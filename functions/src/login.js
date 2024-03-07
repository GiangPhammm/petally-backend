import {signInWithEmailAndPassword} from 'firebase/auth';

export const loginWithEmailAndPassword = async (app, auth) => {
    app.post('/login', async (req, res) => {
        const {email, password} = req.body;

        try {
            await signInWithEmailAndPassword(auth, email, password,
            ).then((response) => {
                res.json(response.user);
            });
        } catch (error) {
            res.status(500).json({error: 'Server error'});
        }
    });
};
