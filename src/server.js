const express = require('express');
const routes = require('./routes');
const session = require('express-session');
const { engine } = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Password Social Music App',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

sequelize.sync({ force: false }).then(() => {
  const _engine = engine()
  app.engine('handlebars', _engine);
  app.set('view engine', 'handlebars');
  app.set('views', './src/views');
  app.use(routes);
  app.use(express.static('src/dist'))
  app.use(session(sess));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  

  app.listen(PORT, () => console.log('Now listening'));
});