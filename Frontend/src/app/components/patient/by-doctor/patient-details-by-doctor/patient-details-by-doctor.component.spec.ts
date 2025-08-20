import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { of } from 'rxjs';
import { PatientDetailsByDoctorComponent } from './patient-details-by-doctor.component';
import { PatientService } from 'src/app/services/patient.service';
import { MedicalRecord } from 'src/app/interfaces/medical-record.interface';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PatientDetailsByDoctorComponent', () => {
  let component: PatientDetailsByDoctorComponent;
  let fixture: ComponentFixture<PatientDetailsByDoctorComponent>;
  let patientService: jasmine.SpyObj<PatientService>;

  beforeEach(async () => {
    const patientServiceSpy = jasmine.createSpyObj('PatientService', ['getMedicalRecord', 'getPatientById1']);

    await TestBed.configureTestingModule({
      declarations: [PatientDetailsByDoctorComponent],
      imports: [
        HttpClientTestingModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: PatientService, useValue: patientServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PatientDetailsByDoctorComponent);
    component = fixture.componentInstance;
    patientService = TestBed.inject(PatientService) as jasmine.SpyObj<PatientService>;
  });

  const mockMedicalRecord: MedicalRecord = {
    id: '1',
    patientId: '1',
    allergies: [{
        name: 'Peanuts', description: 'Severe reaction', code: 'A001',
        id: '1'
    }],
    medicalConditions: [{
        name: 'Diabetes', description: 'Chronic condition', diagnosisDate: new Date(), code: 'M001',
        id: '1'
    }],
    medicalHistory: [{ date: new Date(), description: 'Routine checkup' }],
    familyMedicalHistory: [{ relative: 'Father', description: 'Heart disease' }],
    currentMedications: [{ medication: 'Metformin', dose: '500mg', frequency: 'Twice a day' }],
    vaccines: [{ description: 'Flu shot', lastDose: new Date() }],
    lifeStyle: [{ habit: 'Smoking', description: 'Occasional' }],
    recentVisitNotes: { date: new Date(), notes: ['Patient is doing well'] }
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load medical record on init', () => {

    patientService.getMedicalRecord.and.returnValue(of(mockMedicalRecord));

    component.ngOnInit();

    expect(patientService.getMedicalRecord).toHaveBeenCalledWith('1');
    expect(component.medicalRecord).toEqual(mockMedicalRecord);
    expect(component.allergiesDataSource.data).toEqual(mockMedicalRecord.allergies);
    expect(component.mconditionsDataSource.data).toEqual(mockMedicalRecord.medicalConditions);
    expect(component.mhistoryDataSource.data).toEqual(mockMedicalRecord.medicalHistory);
    expect(component.fmhistoryDataSource.data).toEqual(mockMedicalRecord.familyMedicalHistory);
    expect(component.medicationsDataSource.data).toEqual(mockMedicalRecord.currentMedications);
    expect(component.vaccinesDataSource.data).toEqual(mockMedicalRecord.vaccines);
    expect(component.lifestyleDataSource.data).toEqual(mockMedicalRecord.lifeStyle);
    expect(component.notesDataSource.data).toEqual(mockMedicalRecord.recentVisitNotes.notes);
  });

  it('should filter allergies', () => {

    patientService.getMedicalRecord.and.returnValue(of(mockMedicalRecord));

    component.ngOnInit();
    fixture.detectChanges();

    const inputElement = fixture.nativeElement.querySelector('input[matInput]');
    inputElement.value = 'Peanuts';
    inputElement.dispatchEvent(new Event('keyup'));

    fixture.detectChanges();

    expect(component.allergiesDataSource.filteredData.length).toBe(1);
    expect(component.allergiesDataSource.filteredData[0].name).toBe('Peanuts');
  });

  it('should filter medical conditions', () => {

    patientService.getMedicalRecord.and.returnValue(of(mockMedicalRecord));

    component.ngOnInit();
    fixture.detectChanges();

    const inputElement = fixture.nativeElement.querySelector('input[matInput]');
    inputElement.value = 'Diabetes';
    inputElement.dispatchEvent(new Event('keyup'));

    fixture.detectChanges();

    expect(component.mconditionsDataSource.filteredData.length).toBe(1);
    expect(component.mconditionsDataSource.filteredData[0].name).toBe('Diabetes');
  });
});
