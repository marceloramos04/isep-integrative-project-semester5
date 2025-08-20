var MedicalRecord = require('../models/medical-record');

class RepoMedicalRecord {
    static async getPatientRecord(patientId) {
        if (MedicalRecord.exists({ patientId: patientId }))
            return await MedicalRecord.findOne({ patientId: patientId });
        else throw new Error('Patient record not found');
    }

    static async updateConditions(patientId, conditions) {
        let record = await MedicalRecord.findOne({ patientId: patientId });
        for (let condition of conditions) {
            if (!record.medicalConditions.find(c => c.code === condition.code)) {
                record.medicalConditions.push(condition);
                await record.save();
            }
        }

        return record;
    }
}

module.exports = RepoMedicalRecord;
