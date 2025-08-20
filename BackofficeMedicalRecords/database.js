var mongoose = require('mongoose');
var Allergy = require('./models/allergy');
var RoomType = require('./models/roomType');
var MedicalCondition = require('./models/medical-condition');
var MedicalRecord = require('./models/medical-record');

var configFile = require('./app-config.json');
var allergies = require('./initial_data/allergies.json');
var roomTypes = require('./initial_data/roomTypes.json');
var medicalConditions = require('./initial_data/medical-conditions.json');
var medicalRecords = require('./initial_data/medical-records.json');

var uri = configFile['database-url'];
var clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

class DatabaseConnection {

    constructor() {
        this.initialize().catch(console.dir);
    }

    async initialize() {
        try {
            // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
            await this.connect();
            await reset();
            await setInitialData();
        } catch (error) {
            // Ensures that the client will close when you finish/error
            await mongoose.disconnect();
        }
    }

    async connect() {
        try {
            // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
            await mongoose.connect(uri, clientOptions);
            if (mongoose.connection.db) {
                await mongoose.connection.db.admin().command({ ping: 1 });
                console.log("Successfully connected to MongoDB!");
            } else {
                throw new Error("Database connection is undefined");
            }
        } catch (error) {
            // Ensures that the client will close when you finish/error
            await mongoose.disconnect();
        }
    }
}

async function reset() {
    try {
        await mongoose.connection.db.dropDatabase();
        console.log("Database reset successfully!");
    } catch (error) {
        console.error("Error resetting database:", error);
    }
}

async function setInitialData() {
    console.log("Setting up database...\n");
    await setupAllergies();
    await setupRoomTypes();
    await setupMedicalConditions();
    await setupMedicalRecords();
}

async function setupAllergies() {
    console.log("Setting up allergies...");
    for (const e of allergies) {
        let allergy = new Allergy({
            name: e.name,
            code: e.code,
            description: e.description
        });

        try {
            await allergy.save();
            console.log(`"${allergy.name}" saved`);
        } catch (err) {
            console.log(err);
        }
    }
    console.log('\n');
}

async function setupRoomTypes() {
    console.log("Setting up roomTypes...");
    for (const e of roomTypes) {
        let roomType = new RoomType({
            name: e.name,
            description: e.description
        });

        try {
            await roomType.save();
            console.log(`"${roomType.name}" saved`);
        } catch (err) {
            console.log(err);
        }
    }
    console.log('\n');
}

async function setupMedicalConditions() {
    console.log("Setting up medical conditions...");
    for (const e of medicalConditions) {
        let mc = new MedicalCondition({
            name: e.name,
            code: e.code,
            description: e.description
        });

        try {
            await mc.save();
            console.log(`"${mc.name}" saved`);
        } catch (err) {
            console.log(err);
        }
    }
    console.log('\n');
}

async function setupMedicalRecords() {
    console.log("Setting up medical records...");
    for (const mr of medicalRecords) {
        console.log(`\n${mr.patientId} medical record:`);
        try {
            let this_medicalRecord = new MedicalRecord({ patientId: mr.patientId });

            try {
                if (mr.allergiesCodes) {
                    for (ac of mr.allergiesCodes) {
                        let this_allergy = await Allergy.findOne({ code: ac });
                        this_medicalRecord.allergies.push(this_allergy);
                        console.log(`Added ${this_allergy.name}`);
                    }
                }
            } catch (err) {
                console.log('Error adding allergies to medical record', err);
            }

            try {
                if (mr.medicalConditionsCodes) {
                    for (mcc of mr.medicalConditionsCodes) {
                        let this_mCondition = await MedicalCondition.findOne({ code: mcc });
                        this_medicalRecord.medicalConditions.push(this_mCondition);
                        console.log(`Added ${this_mCondition.name}`);
                    }
                }
            } catch (err) {
                console.log('Error adding medical conditions to medical record', err);
            }

            try {
                if (mr.medicalHistory) {
                    for (e of mr.medicalHistory) {
                        this_medicalRecord.medicalHistory.push(e);
                        console.log(`Added "${e.description}"`);
                    }
                }
            } catch (err) {
                console.log('Error adding medical history entries to medical record', err);
            }

            try {
                if (mr.familyMedicalHistory) {
                    for (e of mr.familyMedicalHistory) {
                        this_medicalRecord.familyMedicalHistory.push(e);
                        console.log(`Added "${e.relative} history"`);
                    }
                }
            } catch (err) {
                console.log('Error adding family history entries to medical record', err);
            }

            try {
                if (mr.currentMedications) {
                    for (e of mr.currentMedications) {
                        this_medicalRecord.currentMedications.push(e);
                        console.log(`Added "${e.medication}" medication`);
                    }
                }
            } catch (err) {
                console.log('Error adding medication entries to medical record', err);
            }

            try {
                if (mr.vaccines) {
                    for (e of mr.vaccines) {
                        this_medicalRecord.vaccines.push(e);
                        console.log(`Added "${e.description}" vaccine`);
                    }
                }
            } catch (err) {
                console.log('Error adding vaccines entries to medical record', err);
            }

            try {
                if (mr.lifeStyle) {
                    for (e of mr.lifeStyle) {
                        this_medicalRecord.lifeStyle.push(e);
                        console.log(`Added "${e.habit}" habit`);
                    }
                }
            } catch (err) {
                console.log('Error adding lifstyle entries to medical record', err);
            }

            try {
                if (mr.recentVisitNotes) {
                    this_medicalRecord.recentVisitNotes = mr.recentVisitNotes;
                    console.log(`Added "${mr.recentVisitNotes.date}" visit note`);
                }
            } catch (err) {
                console.log('Error adding recent visit notes to medical record', err);
            }

            await this_medicalRecord.save();
            console.log(`"${this_medicalRecord.patientId}" saved`);

        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = DatabaseConnection;