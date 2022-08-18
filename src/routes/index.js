const bodyParser = require('body-parser')

const router = require('express').Router();
router.use(bodyParser.json())

const apiRoutes = require('./api');
const authRoutes = require('./auth');


router.use('/api', apiRoutes);
router.use('/auth', authRoutes);

router.use('/', (req, res) => {
    res.render('index', {
        helpers: {
            loggedIn: function () { return true; }
        }
    });
});

module.exports = router;