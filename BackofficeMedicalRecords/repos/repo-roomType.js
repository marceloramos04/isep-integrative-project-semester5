var RoomType = require('../models/roomType');

class RepoRoomType {

   
    static async getRoomType(name) {
        const roomType = await RoomType.findOne({ name });
        if (!roomType) throw new Error('RoomType not found');
        return roomType;
    }


    static async getFilteredRoomType(filter) {
        const results = await RoomType.find(filter); // Busca usando o filtro
        if (results.length === 0) throw new Error('No roomTypes found with the given criteria');
        return results;
    }

    static async createRoomType(roomTypeData) {
        try {
            const newRoomType = new RoomType(roomTypeData);
            return await newRoomType.save();
        } catch (error) {
            throw new Error('Error creating roomType: ' + error.message);
        }
    }

}

module.exports = RepoRoomType;
