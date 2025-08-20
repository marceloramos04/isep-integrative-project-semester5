var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MedicalRecordSchema = new Schema(
    {
        id: Schema.Types.ObjectId,
        patientId: { type: String, required: true, unique: true },
        /**
         * Penicilina: Provoca erupções cutâneas severas e dificuldade respiratória
         */
        allergies: [
            {
                id: { type: Schema.Types.ObjectId, ref: 'Allergy' },
                name: { type: String, required: true, unique: true },
                code: { type: String, required: true, unique: true }, //SNOMED CT
                description: { type: String, default: '' },
            }
        ],
        /**
         * Asma (diagnosticada em 2005)
         */
        medicalConditions: [
            {
                id: { type: Schema.Types.ObjectId, ref: 'MedicalCondition'},
                name: { type: String, required: true, unique: true },
                code: { type: String, required: true, unique: true }, //SNOMED CT
                description: { type: String, default: '' },
                diagnosisDate: { type: Date, default: Date.now, max: Date.now },
            }
        ],
        /**
         * 2010: Diagnosticado com rinite alérgica sazonal, tratado com anti-histamínicos
         */
        medicalHistory: [
            {
                date: { type: Date, required: true, max: Date.now },
                description: { type: String, required: true },
            }
        ],
        /**
         * Mãe: Asma, Osteoporose
         * Irmãos: Sem histórico médico significativo
         */
        familyMedicalHistory: [ // Pai: Hipertensão arterial, Diabetes Tipo 2 | Irmãos: Sem histórico médico significativo.
            {
                relative: { type: String, required: true },
                description: { type: String, required: true },
            }
        ],
        /**
         * Inalador de Salbutamol (conforme necessidade para asma)
         * Losartan 50 mg (uma vez ao dia para hipertensão)
         * Cetirizina 10 mg (conforme necessidade para rinite alérgica)
         */
        currentMedications: [
            {
                medication: { type: String, required: true },
                dose: { type: String, default: "" },
                frequency: { type: String, required: true },
            }
        ],
        /**
         * Vacina contra a gripe (última dose: outubro de 2023)
         * Reforço da COVID-19 (última dose: setembro de 2023)
         */
        vaccines: [
            {
                description: { type: String, required: true },
                lastDose: { type: Date, required: true },
            }
        ],
        /**
         * Tabaco: Não fumador
         * Álcool: Consumo ocasional e social
         * Dieta: Alimentação equilibrada, com indulgência ocasional em alimentos picantes (provavelmente agravando a gastrite)
         */
        lifeStyle: [
            {
                habit: { type: String, required: true }, //values like alcohol, smoking, diet, exercise, etc
                description: { type: String, required: true },
            }
        ],
        /**
         * (Novembro de 2024)
         * Queixas de leve falta de ar durante exercício físico
         * Pressão arterial: 138/86 mmHg
         * Orientação: manter a medicação atual e o estilo de vida saudável
         */
        recentVisitNotes: {
            date: Date, //{ type: Date, required: true },
            notes: [String] //{ type: [ String ], required: true },
        }
    }
)

module.exports = mongoose.model('MedicalRecord', MedicalRecordSchema);