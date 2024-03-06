// TODO: add check credential (email availability, password format etc.)

export const signupWithEmailAndPassword = (app, admin) => {
    app.post('/signup', async (req, res) => {
        try {
            const response = await admin.auth().createUser({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                emailVerified: false,
                disabled: false,
            });
            res.json(response);
            return res.status(200).send();
        } catch (error) {
            return res.status(500).json({
                error: 'Invalid email or password format',
            });
        }
    });
};
