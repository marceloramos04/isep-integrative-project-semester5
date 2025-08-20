var express = require('express');
var router = express.Router();
var MedicalRecord = require('../models/medical-record'); // Assuming you have an Allergy model
var controller = require('../controllers/controller-medical-record');

/* GET allergies listing. */
router.get('/', async function (req, res, next) {
  try {
    res.status(200).json(await MedicalRecord.find());
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/:patientId', async function (req, res, next) {
  return controller.getPatientRecord(req, res);
});

router.post('/:patientId/update-conditions', async function (req, res, next) {
  try {
    const { conditions } = req.body;
    const patientId = req.params.patientId;
    const updatedRecord = await controller.updateConditions(patientId, conditions);
    res.status(201).json(updatedRecord);
  } catch (error) {
    console.error(error);
    next(error);
  }
})


module.exports = router;