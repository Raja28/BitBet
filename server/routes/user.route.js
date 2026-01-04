
const express = require('express');
const { fetchGames, addToFavorites, removeFromFavorites, myFavorites } = require('../controllers/user');
const { authenticate } = require('../middlewares/auth');
const router = express.Router();


router.get('/games', authenticate, fetchGames);
router.post('/favorites/:gameId', authenticate, addToFavorites);
router.delete('/favorites/:gameId', authenticate, removeFromFavorites);
router.get('/favorites', authenticate, myFavorites);

module.exports = router;