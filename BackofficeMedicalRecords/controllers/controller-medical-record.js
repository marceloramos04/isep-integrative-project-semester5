var service = require('../services/service-medical-record');

class ControllerMedicalRecord {
    static async getPatientRecord(req, res) {
        try {
            var patientId = req.params.patientId;
            var result = await service.getPatientRecord(patientId);
            res.status(200).json(result);
        } catch (error) {
            res.status(404).send(error.message);
        }
    }

    static async updateConditions(patientId, conditions) {
        return service.updateConditions(patientId, conditions);
    }
}

module.exports = ControllerMedicalRecord;