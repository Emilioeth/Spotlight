const bodyParser = require('body-parser')

const router = require('express').Router();
router.use(bodyParser.json())

const apiRoutes = require('./api');
const authRoutes = require('./auth');

const session = require('express-session');
const sequelize = require('../config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { User, Favorites } = require('../models');

const sess = {
  secret: 'Password Social Music App',
  cookie: { path: '/', httpOnly: true, secure: false, maxAge: null },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

sequelize.sync({ force: false });
router.use(session(sess));
router.use('/api', apiRoutes);
router.use('/auth', authRoutes);

router.use('/', (req, res, next) => {
    if (req?.session?.loggedIn) {
        User.findOne({
            attributes: { exclude: ['password'] },
            where: {
              id: req.session.user_id
            },
            include: [
              {
                model: Favorites,
                attributes: ['id', 'title', 'song_id', 'owner_id'],
              }
            ]
          })
            .then(dbUserData => {
              if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
              }
              res.render('index', {
                authed: true,
                username: req.session.username,
                trackList: dbUserData.favorites,
                user_id: req.session.user_id
            });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json(err);
            });
    }
    else next()
});

router.use('/', (req, res) => {
    res.render('index', {
        authed: false
    });
});

module.exports = router;