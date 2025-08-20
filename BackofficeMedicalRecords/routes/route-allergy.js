var express = require('express');
var router = express.Router();
var Allergy = require('../models/allergy'); // Assuming you have an Allergy model
const AllergyController = require('../controllers/controller-allergy'); 

/* GET allergies listing. */
router.get('/Allergies', AllergyController.getFilteredAllergies); // Uses the controller method to get allergies

/* POST create a new allergy */
router.post('/createAllergy', AllergyController.createAllergy); // Uses the controller method to create allergies

module.exports = router;