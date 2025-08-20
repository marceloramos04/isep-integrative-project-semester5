var repo = require('../repos/repo-medical-record');

class ServiceMedicalRecord {
    static async getPatientRecord(patientId) {
        return await repo.getPatientRecord(patientId);
    }

    static async updateConditions(patientId, conditions) {
        return await repo.updateConditions(patientId, conditions);
    }
}

module.exports = ServiceMedicalRecord;