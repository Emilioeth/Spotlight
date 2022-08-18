const router = require('express').Router();
const { User, Favorites } = require('../../../models');
const axios = require('axios')

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

  axios({
    method: 'get',
    url: `https://api.spotify.com/v1/search?q=${req.body.title}&type=track&limit=1`,
    headers: {
      'Authorization': "Bearer BQDQObIMvT5J3LuQExAyCCu9w9kKBafGqwbEQAWurcbF9T5XIUtpujQ4McfbTcZvt6PZ235y7eXhOMjnysr3TEGWUYcgixiJf68NaUQuMSf9hSsOnPfXGnJWQ_WkBJODb1faUGsxKnvlZgTx0krALi-Cr3n_feZ6CY7LCFrjO9GpaNXXRnsYU9BXnOZPQek",
      'Content-Type': 'application/json'
    }
  }).then(function (response) {
    const track = response.data.tracks.items[0]
    const favorite_save = {
      title: `${track.artists[0].name} - ${track.name}`,
      artist: track.artists[0].name,
      album: track.album.name,
      id: track.id
    }
    Favorites.create({
      title: favorite_save.title,
      song_id: favorite_save.id,
      owner_id: req.params.id
    })
      .then(dbFavoriteData => {
        res.json(dbFavoriteData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });

  })
    .catch(function (error) {
      console.log(error);
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
        attributes: ['id', 'title', 'song_id', 'owner_id'],
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
