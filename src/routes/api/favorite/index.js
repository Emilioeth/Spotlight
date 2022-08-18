const router = require('express').Router();
const { User, Favorites } = require('../../../models');

// get all favorites
router.get('/all', (req, res) => {
  Favorites.findAll({
  })
    .then(dbFavoritesData => res.json(dbFavoritesData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Get single Favorite
router.get('/:id', (req, res) => {
  Favorites.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(dbFavoriteData => {
      if (!dbFavoriteData) {
        res.status(404).json({ message: 'No favorite found with this id' });
        return;
      }
      res.json(dbFavoriteData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



//Delete a Favorite
router.delete('/:id', (req, res) => {
  Favorites.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbFavData => {
      if (!dbFavData) {
        res.status(404).json({ message: 'No favorite found with this id' });
        return;
      }
      res.json(dbFavData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
