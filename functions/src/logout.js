import {signOut} from 'firebase/auth';

export const logoutWithEmailAndPassword = async (app, auth) => {
    app.post('/logout', async (req, res) => {
        try {
            signOut(auth).then(() => {
                console.log('User logged out');
            });
        } catch (error) {
            res.status(500).json(error.message);
        }
    });
};
