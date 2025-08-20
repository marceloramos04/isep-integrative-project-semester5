var repo = require('../repos/repo-roomType');

class ServiceRoomType {
    static async getRoomType(code) {
        return await repo.getRoomType(code);
    }

    static async createRoomType(roomTypeData) {
        if (!roomTypeData.name || !roomTypeData.description) {
            throw new Error('Invalid data: RoomType name and description are required.');
        }

        // Adiciona lógica de validação extra, se necessário.
        try {
            return await repo.createRoomType(roomTypeData);
        } catch (error) {
            throw new Error('Service error: ' + error.message);
        }
    }

    static async getFilteredRoomTypes({ name, description }) {
        const filter = {};

        if (name) filter.name = { $regex: name, $options: 'i' }; // Busca case-insensitive
        if (description) filter.description = { $regex: description, $options: 'i' };

        return await repo.getFilteredRoomType(filter); // Busca no banco de dados com base no filtro
    }

}

module.exports = ServiceRoomType;