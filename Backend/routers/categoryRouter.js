const router = require('express').Router();
const { createCategory, getCategory } = require('../controllers/categoryControllers');
const admin = require('../middlewares/admin');
const authorize = require('../middlewares/authorize')


router.route('/')
    .post([authorize, admin], createCategory)
    .get(getCategory); //ekhane amra kono middleware dei nai karon login saraw je kono user products dekhte parbe

module.exports = router;