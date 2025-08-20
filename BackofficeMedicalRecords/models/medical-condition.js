var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MedicalConditionSchema = new Schema(
    {
        id: Schema.Types.ObjectId,
        name: { type: String, required: true, unique: true },
        code: { type: String, required: true, unique: true }, //SNOMED CT
        description: { type: String, default: '' },
    }
)

module.exports = mongoose.model('MedicalCondition', MedicalConditionSchema);