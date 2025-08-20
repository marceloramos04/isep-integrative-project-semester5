var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoomTypeSchema = new Schema(
    {
        id: Schema.Types.ObjectId,
        name: { type: String, required: true, unique: true },
        description: { type: String, default: '' },
    }
)

module.exports = mongoose.model('RoomType', RoomTypeSchema);