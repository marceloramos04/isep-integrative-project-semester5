var repo = require('../repos/repo-medical-condition');

class ServiceMedicalCondition{

    // static async createAllergy(allergyData) {
    //     if (!allergyData.name || !allergyData.description) {
    //         throw new Error('Invalid data: Allergy name and description are required.');
    //     }

    //     // Adiciona lógica de validação extra, se necessário.
    //     try {
    //         return await repo.createAllergy(allergyData);
    //     } catch (error) {
    //         throw new Error('Service error: ' + error.message);
    //     }
    // }

    static async searchMedicalConditions(code, name, description) {
        return await repo.searchMedicalConditions(code, name, description); // Busca no banco de dados com base no filtro
    }

}

module.exports = ServiceMedicalCondition;