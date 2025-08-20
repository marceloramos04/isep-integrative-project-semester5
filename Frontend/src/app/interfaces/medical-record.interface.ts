import { Allergy } from './allergy.interface';
import { MedicalCondition } from './medical-condition.interface';

export interface MedicalRecord {
    id: string;
    patientId: string;
    allergies: Allergy[];
    medicalConditions: MedicalConditionEntry[];
    medicalHistory: MedicalHistoryEntry[];
    familyMedicalHistory: FamilyMedicalHistoryEntry[];
    currentMedications: CurrentMedication[];
    vaccines: Vaccine[];
    lifeStyle: LifeStyleEntry[];
    recentVisitNotes: RecentVisitNotes;
}

export interface MedicalConditionEntry extends MedicalCondition {
    diagnosisDate: Date;
}

export interface MedicalHistoryEntry {
    date: Date;
    description: string;
}

export interface FamilyMedicalHistoryEntry {
    relative: string;
    description: string;
}

export interface CurrentMedication {
    medication: string;
    dose: string;
    frequency: string;
}

export interface Vaccine {
    description: string;
    lastDose: Date;
}

export interface LifeStyleEntry {
    habit: string;
    description: string;
}

export interface RecentVisitNotes {
    date: Date;
    notes: string[];
}