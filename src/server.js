const express = require('express');
const routes = require('./routes');

const { engine } = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001





const _engine = engine()
  app.engine('handlebars', _engine);
  app.set('view engine', 'handlebars');
  app.set('views', './src/views');
  app.use(routes);
  app.use(express.static('src/dist'));
  app.use(express.urlencoded({ extended: true }));
  
  

  app.listen(PORT, () => console.log('Now listening')); 