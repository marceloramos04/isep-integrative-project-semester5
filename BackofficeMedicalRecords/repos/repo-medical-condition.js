var model = require('../models/medical-condition');

class RepoMedicalCondition {

    static async searchMedicalConditions(code, name, description) {
        const query = {};

        if (code && code.trim()) {
            query.code = { $regex: new RegExp(code.trim(), 'i') };
        }

        if (name && name.trim()) {
            query.name = { $regex: new RegExp(name.trim(), 'i') };
        }

        if (description && description.trim()) {
            query.description = { $regex: new RegExp(description.trim(), 'i') };
        }

        try {
            return await model.find(query);
        } catch (error) {
            throw new Error('Error searching medical conditions: ' + error.message);
        }
    }

    // static async createAllergy(allergyData) {
    //     try {
    //         const newAllergy = new model(allergyData);
    //         return await newAllergy.save();
    //     } catch (error) {
    //         throw new Error('Error creating allergy: ' + error.message);
    //     }
    // }

}

module.exports = RepoMedicalCondition;
