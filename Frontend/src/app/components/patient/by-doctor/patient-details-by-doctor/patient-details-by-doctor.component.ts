import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Patient } from 'src/app/interfaces/patient.interface';
import { PatientService } from 'src/app/services/patient.service';
import { ActivatedRoute } from '@angular/router';
import { CurrentMedication, FamilyMedicalHistoryEntry, LifeStyleEntry, MedicalHistoryEntry, MedicalRecord, Vaccine } from 'src/app/interfaces/medical-record.interface';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Allergy } from 'src/app/interfaces/allergy.interface';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MedicalCondition } from 'src/app/interfaces/medical-condition.interface';
import { FormControlName } from '@angular/forms';
import { MedicalConditionListComponent } from 'src/app/components/medical-condition/medical-condition-list/medical-condition-list.component';
import { MedicalRecordService } from 'src/app/services/medical-record.service';

@Component({
  selector: 'app-patient-details-by-doctor',
  standalone: false,

  templateUrl: './patient-details-by-doctor.component.html',
  styleUrl: './patient-details-by-doctor.component.css'
})
export class PatientDetailsByDoctorComponent implements OnInit, AfterViewInit {

  @ViewChild(MedicalConditionListComponent) conditionsListComponent!: MedicalConditionListComponent;

  patientId!: string | null;
  updatingAllergies = false;
  updatingMConditions = false;
  patientDetails?: Patient;
  medicalRecord?: MedicalRecord;

  /////////////////////////////////////////

  allergiesColumns = ['name', 'description', 'code'];
  allergiesDataSource: MatTableDataSource<Allergy> = new MatTableDataSource<Allergy>();

  mconditionsColumns = ['name', 'description', 'diagnosisDate', 'code'];
  mconditionsDataSource: MatTableDataSource<MedicalCondition> = new MatTableDataSource<MedicalCondition>();

  mhistoryColumns = ['date', 'description'];
  mhistoryDataSource: MatTableDataSource<MedicalHistoryEntry> = new MatTableDataSource<MedicalHistoryEntry>();

  fmhistoryColumns = ['relative', 'description'];
  fmhistoryDataSource: MatTableDataSource<FamilyMedicalHistoryEntry> = new MatTableDataSource<FamilyMedicalHistoryEntry>();

  medicationsColumns = ['medication', 'dose', 'frequency'];
  medicationsDataSource: MatTableDataSource<CurrentMedication> = new MatTableDataSource<CurrentMedication>();

  vaccinesColumns = ['description', 'lastDose'];
  vaccinesDataSource: MatTableDataSource<Vaccine> = new MatTableDataSource<Vaccine>();

  lifestyleColumns = ['habit', 'description'];
  lifestyleDataSource: MatTableDataSource<LifeStyleEntry> = new MatTableDataSource<LifeStyleEntry>();

  notesColumns = ['notes'];
  notesDataSource: MatTableDataSource<string> = new MatTableDataSource<string>();

  /////////////////////////////////////////

  @ViewChild('allergySort') allergySort!: MatSort;
  @ViewChild('allergyPaginator') allergyPaginator!: MatPaginator;

  @ViewChild('mconditionSort') mconditionSort!: MatSort;
  @ViewChild('mconditionPaginator') mconditionPaginator!: MatPaginator;

  @ViewChild('mhistorySort') mhistorySort!: MatSort;
  @ViewChild('mhistoryPaginator') mhistoryPaginator!: MatPaginator;

  @ViewChild('fmhistorySort') fmhistorySort!: MatSort;
  @ViewChild('fmhistoryPaginator') fmhistoryPaginator!: MatPaginator;

  @ViewChild('medicationsSort') medicationsSort!: MatSort;
  @ViewChild('medicationsPaginator') medicationsPaginator!: MatPaginator;

  @ViewChild('vaccinesSort') vaccinesSort!: MatSort;
  @ViewChild('vaccinesPaginator') vaccinesPaginator!: MatPaginator;

  @ViewChild('lifestyleSort') lifestyleSort!: MatSort;
  @ViewChild('lifestylePaginator') lifestylePaginator!: MatPaginator;

  @ViewChild('notesPaginator') notesPaginator!: MatPaginator;

  /////////////////////////////////////////

  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute,
    private mrecordService: MedicalRecordService
  ) { }

  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('id');
    if (!this.patientId) {
      alert('Patient ID not found in URL');
      return;
    }

    this.patientService.getPatientById1(this.patientId).subscribe({
      next: (patient) => {
        this.patientDetails = patient;
      },
      error: (err) => {
        console.error('Error fetching patient details:', err);
      }
    });

    this.patientService.getMedicalRecord(this.patientId).subscribe({
      next: (medicalRecord) => {
        console.log('Medical record loaded:', medicalRecord);
        this.medicalRecord = medicalRecord;
        this.allergiesDataSource.data = medicalRecord.allergies;
        this.mconditionsDataSource.data = medicalRecord.medicalConditions;
        this.mhistoryDataSource.data = medicalRecord.medicalHistory;
        this.fmhistoryDataSource.data = medicalRecord.familyMedicalHistory;
        this.medicationsDataSource.data = medicalRecord.currentMedications;
        this.vaccinesDataSource.data = medicalRecord.vaccines;
        this.lifestyleDataSource.data = medicalRecord.lifeStyle;
        this.notesDataSource.data = medicalRecord.recentVisitNotes.notes;
        console.log(`Patient ${this.patientId} medical record:`, medicalRecord);
      },
      error: (err) => {
        console.error('Error fetching medical record:', err);
      }
    });
  }

  ngAfterViewInit() {
    this.allergiesDataSource.sort = this.allergySort;
    this.allergiesDataSource.paginator = this.allergyPaginator;

    this.mconditionsDataSource.sort = this.mconditionSort;
    this.mconditionsDataSource.paginator = this.mconditionPaginator;

    this.mhistoryDataSource.sort = this.mhistorySort;
    this.mhistoryDataSource.paginator = this.mhistoryPaginator;

    this.fmhistoryDataSource.sort = this.fmhistorySort;
    this.fmhistoryDataSource.paginator = this.fmhistoryPaginator;

    this.medicationsDataSource.sort = this.medicationsSort;
    this.medicationsDataSource.paginator = this.medicationsPaginator;

    this.vaccinesDataSource.sort = this.vaccinesSort;
    this.vaccinesDataSource.paginator = this.vaccinesPaginator;

    this.lifestyleDataSource.sort = this.lifestyleSort;
    this.lifestyleDataSource.paginator = this.lifestylePaginator;

    this.notesDataSource.paginator = this.notesPaginator
  }

  filterAllergies(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.allergiesDataSource.filter = filterValue.trim().toLowerCase();
  }

  filterMConditions(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.mconditionsDataSource.filter = filterValue.trim().toLowerCase();
  }

  updateAllergies() {
    alert('Not implemented yet');
  }

  submitUpdateConditions() {
    this.conditionsListComponent.emitSelected();
  }

  updateConditions(conditions: MedicalCondition[]) {
    if (this.patientId) {
      this.mrecordService.updateConditions(this.patientId, conditions).subscribe(
        {
          next: (recordUpdated) => {
            console.log('Medical record updated:', recordUpdated);
            this.medicalRecord = recordUpdated;
            this.mconditionsDataSource.data = this.medicalRecord.medicalConditions;
            this.updatingMConditions = false;
          },
          error: (err) => {
            console.error('Error updating medical record:', err);
          }
        }
      )
    }
  }
}
