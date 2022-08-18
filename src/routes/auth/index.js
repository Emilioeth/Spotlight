const router = require('express').Router();
const { User, Favorites } = require('../../models');

//User Sign Up
router.post('/register', (req, res) => {
    User.create({
        username: req.body.email,
        email: req.body.email,
        password: req.body.password
    })
        .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json(dbUserData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Auth Log-in
router.post('/login', (req, res) => {

    console.log("hit /login")
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user with that email address!' });
            return;
        }

        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
        // regenerate the session, which is good practice to help
        // guard against forms of session fixation
        req.session.regenerate(function (err) {
            if (err) next(err)

            // save the session before redirection to ensure page
            // load does not happen before session is saved
            req.session.save(function (err) {
                if (err) return next(err)
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;
                
                res.json({ user: dbUserData, message: 'You are now logged in!' });
            })
        })
    });
});

//User log-out
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

module.exports = router;