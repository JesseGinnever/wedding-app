// Import dependencies
const express = require('express');
const router = express.Router();
const guest =  require('./guest');

router.use('/guest', guest);

router.use(function(req, res, next) {
    // log each request to the console
    console.log(req.method, req.url);
    // continue doing what we were doing and go to the route
    next(); 
});

/* GET api listing. */
router.get('/', (req, res) => {
        res.send('Welcome to the Wedding API!');
});

module.exports = router;