const { check } = require('express-validator');
const { Router } = require('express');
const { animesGet } = require('../controllers/animes.controller');

const router = Router();

router.get('/', animesGet);

module.exports = router;