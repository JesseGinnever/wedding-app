const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const cors = require('cors');
const nodemailer = require('nodemailer');
const sendMail = require('./services/emailService').sendMail;

// MongoDB URL from the docker-compose file
const dbHost = 'mongodb://database/wedding-app';

const options = {
    useMongoClient: true
  };
// Connect to mongodb
mongoose.connect(dbHost, options);

// create mongoose schema
const guestSchema = new mongoose.Schema({
    weddingCode: String,
    partyName: String,
    attending: String,
    partySize: String,
    meals: Array,
    drinkTotal: String,
    comments: String,
    emailAddress: String
});

// create mongoose model
const Guest = mongoose.model('Guest', guestSchema);

// need this to connect to localhost
router.use(cors());

/* GET all guest. */
router.get('/', (req, res) => {
    Guest.find({}, (err, guests) => {
        if (err) res.status(500).send(error)

        res.status(200).json(guests);
    });
});

/* GET one guest by wedding code. */
router.get('/code/:weddingCode', (req, res) => {
    Guest.find({weddingCode: req.params.weddingCode}, (err, guests) => {
        if (err) res.status(500).send(error)
        res.status(200).json(guests);
    });
});


/* Update a guest. */
router.post('/', (req, res) => {
    let guest = {
        weddingCode: req.body.weddingCode,
        partyName: req.body.partyName,
        attending: req.body.attending,
        partySize: req.body.partySize,
        meals: req.body.meals,
        drinkTotal: req.body.drinkTotal,
        comments: req.body.comments,
        emailAddress: req.body.emailAddress
    };

    sendMail(guest);

    Guest.findOneAndUpdate({weddingCode: req.body.weddingCode}, guest, error => {
        if (error) res.status(500).send(error);
        
        res.status(201).json({
            message: 'guest created successfully'
        });
    });
});

/* Create a guest. */
router.post('/create', (req, res) => {
    let guest = new Guest({
        weddingCode: req.body.weddingCode,
        partyName: req.body.partyName,
        attending: req.body.attending,
        partySize: req.body.partySize,
        meals: req.body.meals,
        drinkTotal: req.body.drinkTotal,
        comments: req.body.comments,
        emailAddress: req.body.emailAddress
    });

    guest.save(error => {
        if (error) res.status(500).send(error);
        res.status(201).json({
            message: 'guest created successfully'
        });
    });
});

module.exports = router;