var express = require('express');
var router = express.Router();
var MedicalCondition = require('../models/medical-condition'); // Assuming you have an Allergy model
var controller = require('../controllers/controller-medical-condition');

/* GET allergies listing. */
router.get('/', async function (req, res, next) {
  try {
    res.status(200).json(await MedicalCondition.find());
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/search', async function(req, res, next) {
  try {
    const { name, code, description } = req.query;
    const results = await controller.searchMedicalConditions(code, name, description);
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;