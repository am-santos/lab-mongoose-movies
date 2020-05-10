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
router.get('/create', (req, res) => {
  res.render('movies/create');
});

router.post('/create', (req, res) => {
  const newMovie = req.body;
  Movie.create({
    title: newMovie.title,
    genre: newMovie.genre,
    plot: newMovie.plot
  })
    .then(() => {
      res.redirect('/movies');
    })
    .catch(() => {
      console.log('Error occured when creating a new Movie', err);
      res.render('movies/create');
    });
});

// Get specific movie
router.get('/:movieId', (req, res) => {
  const movieId = req.params.movieId;

  Movie.findById({ _id: movieId })
    .then((movie) => {
      res.render('movies/single', { movie });
    })
    .catch((err) => {
      console.log('Error on getting movie single page', err);
    });
});

// Delete a movie
router.post('/:movieId/delete', (req, res) => {
  const movieId = req.params.movieId;

  Movie.findByIdAndRemove({ _id: movieId })
    .then(() => {
      res.redirect('/movies');
    })
    .catch((err) => {
      console.log('error on deleting a movie', err);
    });
});

// Edit a movie
router.get('/:movieId/edit', (req, res) => {
  const movieId = req.params.movieId;

  Movie.findById({ _id: movieId })
    .then((movie) => {
      res.render('movies/edit', { movie });
    })
    .catch((err) => {
      console.log('Error editing movie', err);
    });
});

router.post('/:movieId/edit', (req, res) => {
  const movieId = req.params.movieId;
  const editedMovie = req.body;
  Movie.updateOne(
    { _id: movieId },
    {
      title: editedMovie.title,
      genre: editedMovie.genre,
      plot: editedMovie.plot
    }
  )
    .then(() => {
      res.redirect('/movies');
    })
    .catch((err) => {
      console.log('Error on updating a movie', err);
    });
});

module.exports = router;
