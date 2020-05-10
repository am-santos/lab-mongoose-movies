const express = require('express');
const router = express.Router();

const Movie = require('../models/movie');

// List of all movies
router.get('/', (req, res) => {
  Movie.find()
    .then((listOfMovies) => {
      res.render('movies/index', { listOfMovies });
    })
    .catch((err) => {
      console.log('Error getting the list of movies');
    });
});

// Create a new movie
router.post('/create', (req, res) => {
  const newMovie = req.body;
  Movie.create({
    title: newMovie.title,
    genre: newMovie.genre,
    plot: newMovie.plot
  })
    .then(() => {
      res.redirect('movies');
    })
    .catch(() => {
      console.log('Error occured when creating a new Movie', err);
      res.render('movies/create');
    });
});
// Get specific movie

// Delete a movie

// Edit a movie
//  - GET
//  - POST

module.exports = router;
