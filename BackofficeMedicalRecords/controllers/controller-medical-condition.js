var service = require('../services/service-medical-condition');

class ControllerMedicalCondition {

    // static async createAllergy(req, res) {
    //     try {
    //         const allergyData = req.body; // Obtém os dados do corpo da requisição
    //         const newAllergy = await service.createAllergy(allergyData);
    //         res.status(201).json(newAllergy); // Retorna o novo registro criado
    //     } catch (error) {
    //         res.status(400).json({ error: error.message }); // Erro de validação ou serviço
    //     }
    // }

    static async searchMedicalConditions(code, name, description) {
        return await service.searchMedicalConditions(code, name, description);
    }
}

module.exports = ControllerMedicalCondition;