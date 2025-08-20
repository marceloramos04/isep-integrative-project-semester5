var service = require('../services/service-allergy');

class ControllerAllergy {

    static async createAllergy(req, res) {
        try {
            const allergyData = req.body; // Obtém os dados do corpo da requisição
            const newAllergy = await service.createAllergy(allergyData);
            res.status(201).json(newAllergy); // Retorna o novo registro criado
        } catch (error) {
            res.status(400).json({ error: error.message }); // Erro de validação ou serviço
        }
    }

    static async getAllergy(req, res) {
        try {
            var code = req.params.code;
            var result = await service.getAllergy(code);
            res.status(200).json(result);
        } catch (error) {
            res.status(404).send(error.message);
        }
    }

    static async getFilteredAllergies(req, res) {
        try {
            const { code, name, description } = req.query; // Obtém os parâmetros da query string
            const filteredAllergies = await service.getFilteredAllergies({ code, name, description });
            res.status(200).json(filteredAllergies); // Retorna as alergias filtradas
        } catch (error) {
            res.status(500).json({ error: error.message }); // Retorna erro em caso de falha no serviço
        }
    }
}

module.exports = ControllerAllergy;