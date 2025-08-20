var repo = require('../repos/repo-allergy');

class ServiceAllergy{
    static async getAllergy(code) {
        return await repo.getAllergy(code);
    }

    static async createAllergy(allergyData) {
        if (!allergyData.name || !allergyData.description) {
            throw new Error('Invalid data: Allergy name and description are required.');
        }

        // Adiciona lógica de validação extra, se necessário.
        try {
            return await repo.createAllergy(allergyData);
        } catch (error) {
            throw new Error('Service error: ' + error.message);
        }
    }

    static async getFilteredAllergies({ code, name, description }) {
        const filter = {};

        if (code) filter.code = code;
        if (name) filter.name = { $regex: name, $options: 'i' }; // Busca case-insensitive
        if (description) filter.description = { $regex: description, $options: 'i' };

        return await repo.getFilteredAllergy(filter); // Busca no banco de dados com base no filtro
    }

}

module.exports = ServiceAllergy;