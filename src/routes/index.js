const router = require('express').Router();

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use('/', (req, res) => {
    res.render('index', {
        helpers: {
            loggedIn: function () { return true; }
        }
    });
});

module.exports = router;