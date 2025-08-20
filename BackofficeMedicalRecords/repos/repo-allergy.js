var Allergy = require('../models/allergy');

class RepoAllergy {

   
    static async getAllergy(code) {
        const allergy = await Allergy.findOne({ code });
        if (!allergy) throw new Error('Allergy not found');
        return allergy;
    }


    static async getFilteredAllergy(filter) {
        const results = await Allergy.find(filter); // Busca usando o filtro
        if (results.length === 0) throw new Error('No room types found with the given criteria');
        return results;
    }

    static async createAllergy(allergyData) {
        try {
            const newAllergy = new Allergy(allergyData);
            return await newAllergy.save();
        } catch (error) {
            throw new Error('Error creating allergy: ' + error.message);
        }
    }

}

module.exports = RepoAllergy;
