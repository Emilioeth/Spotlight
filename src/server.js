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
  
  app.engine('handlebars', engine());
  app.set('view engine', 'handlebars');
  app.set('views', './src/views');
  
  app.use(session(sess));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(routes);
  app.use(express.static('public'))
  

  app.listen(PORT, () => console.log('Now listening'));
});