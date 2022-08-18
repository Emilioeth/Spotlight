const bodyParser = require('body-parser')

const router = require('express').Router();
router.use(bodyParser.json())

const favoriteRoutes = require('./favorite');
const userRoutes = require('./user');

router.use('/user', userRoutes);
router.use('/favorite', favoriteRoutes);

module.exports = router;