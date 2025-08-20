var service = require('../services/service-roomType');

class ControllerRoomType {

    static async createRoomType(req, res) {
        try {
            const roomTypeData = req.body; // Obtém os dados do corpo da requisição
            const newRoomType = await service.createRoomType(roomTypeData);
            res.status(201).json(newRoomType); // Retorna o novo registro criado
        } catch (error) {
            res.status(400).json({ error: error.message }); // Erro de validação ou serviço
        }
    }

    static async getRoomType(req, res) {
        try {
            var name = req.params.name;
            var result = await service.getRoomType(name);
            res.status(200).json(result);
        } catch (error) {
            res.status(404).send(error.message);
        }
    }

    static async getFilteredRoomTypes(req, res) {
        try {
            const { name, description } = req.query; // Obtém os parâmetros da query string
            const filteredRoomTypes = await service.getFilteredRoomTypes({ name, description });
            res.status(200).json(filteredRoomTypes); // Retorna os tipos de quartos filtradas
        } catch (error) {
            res.status(500).json({ error: error.message }); // Retorna erro em caso de falha no serviço
        }
    }
}

module.exports = ControllerRoomType;