const bodyParser = require('body-parser')

const router = require('express').Router();
router.use(bodyParser.json())

const userRoutes = require('./user');

router.use('/user', userRoutes);


module.exports = router;