const express = require('express');
const router = express.Router();

const Celebrity = require('../models/celebrity');

// Get a list of all celebrities
router.get('/', (req, res) => {
  Celebrity.find()
    .then((listOfCelebrities) => {
      res.render('celebrities/index', { listOfCelebrities });
    })
    .catch((err) => {
      console.log('There was an error, getting list of celebrities', err);
    });
});

// Create a new celebrity
router.get('/create', (req, res) => {
  console.log('celebrity/create is working');
  res.render('celebrities/create');
});

router.post('/create', (req, res) => {
  const newCelebrity = req.body;

  Celebrity.create({
    name: newCelebrity.name,
    occupation: newCelebrity.occupation,
    catchPhrase: newCelebrity.catchPhrase
  })
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch((err) => {
      console.log('Error occured when creating a new Celebrity', err);
      res.render('celebrities/create');
    });
});

// Get a specific celebrity
router.get('/:celebrityId', (req, res) => {
  const celebrityId = req.params.celebrityId;
  Celebrity.findById({ _id: celebrityId })
    .then((celebrity) => {
      res.render('celebrities/single', { celebrity });
    })
    .catch((err) => {
      console.log('There was an error, getting one celebrity', err);
    });
});

// Delete an existing celebrity
router.post('/:celebrityId/delete', (req, res) => {
  const celebrityId = req.params.celebrityId;
  Celebrity.findByIdAndRemove({ _id: celebrityId })
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch((err) => {
      console.log('there was an error deleting celebrity', err);
    });
});

// Edit an existing celebrity
router.get('/:celebrityId/edit', (req, res) => {
  console.log('Im inside router for edit celebrities');
  const celebrityId = req.params.celebrityId;
  Celebrity.findById({ _id: celebrityId })
    .then((celebrity) => {
      res.render('celebrities/edit', { celebrity });
    })
    .catch((err) => {
      console.log('there was an error getting edit celebrity', err);
    });
});
// Update celebraty document in database
router.post('/:celebrityId', (req, res) => {
  const editedCelebrity = req.body;
  const celebrityId = req.params.celebrityId;
  Celebrity.updateOne(
    { _id: celebrityId },
    {
      name: editedCelebrity.name,
      occupation: editedCelebrity.occupation,
      catchPhrase: editedCelebrity.catchPhrase
    }
  )
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch((err) => {
      console.log('there was an error post editions on celebrity', err);
    });
});

module.exports = router;
