const express = require('express');
const routes = require('./routes');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

sequelize.sync({ force: false }).then(() => {
  const sess = {
    secret: 'Password Social Music App',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

  app.use(session(sess));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(routes);
  app.listen(PORT, () => console.log('Now listening'));
});