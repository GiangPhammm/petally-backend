import {signOut} from 'firebase/auth';

export const logout = async (app, auth) => {
    app.post('/logout', async (req, res) => {
        try {
            await signOut(auth).then((response) => {
                res.json(response);
            });

            return res.status(200).send();
        } catch (error) {
            res.status(500).json(error.message);
        }
    });
};
