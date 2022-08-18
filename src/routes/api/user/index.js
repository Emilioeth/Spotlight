const router = require('express').Router();
const { User, Favorites } = require('../../../models');

// get all users
router.get('/all', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] }
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// add a favorite for a user
router.post('/:id/addfavorite', (req, res) => {
  Favorites.create({
    title: req.body.title,
    song_url: req.body.url,
    owner_id: req.params.id
})
    .then(dbFavoriteData => {
          res.json(dbFavoriteData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Get single User
router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Favorites,
        attributes: ['id', 'title', 'song_url', 'owner_id'],
      }
    ]
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



//Delete a User
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
