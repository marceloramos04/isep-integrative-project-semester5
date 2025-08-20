import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { Patient } from '../../../../interfaces/patient.interface';
import { PatientService } from '../../../../services/patient.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-patient-by-doctor',
  standalone: false,
  templateUrl: './list-patient-by-doctor.component.html',
  styleUrl: './list-patient-by-doctor.component.css'
})
export class ListPatientByDoctorComponent implements AfterViewInit {
  types: Patient[] = [];
  firstName: string[] = [];
  lastName: string[] = [];
  email: string[] = [];
  dateOfBirth: string[] = [];
  medicalRecordNumber: string[] = [];


  dataSource: MatTableDataSource<Patient>;
  filterForm: FormGroup;
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'dateOfBirth', 'medicalRecordNumber'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource();
    this.filterForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      dateOfBirth: [''],
      medicalRecordNumber: [''],
    });
  }

  // ngOnInit() {
  //   this.loadPatients();
  // }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;


    this.dataSource.filterPredicate = (data: Patient, filter: string) => {
      const transformedFilter = filter.trim().toLowerCase();
      return Object.values(data).some(
        (value) => value.toString().toLowerCase().includes(transformedFilter)
      );
    };
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  loadPatients() {
    var formValues = this.filterForm.value;
    if (formValues.dateOfBirth) {
      const date = new Date(formValues.dateOfBirth);
      formValues.dateOfBirth = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    }
    this.patientService.getFilteredPatients(
      formValues.firstName,
      formValues.lastName,
      formValues.email,
      formValues.dateOfBirth,
      formValues.medicalRecordNumber,
    ).subscribe((types: Patient[]) => {
      this.types = types;
      console.log('Data from Backend:', this.types);
      this.dataSource.data = this.types;
      console.log('Table Data Source:', this.dataSource.data);
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    });
  }

  clearField(field: string) {
    this.filterForm.get(field)?.setValue('');
  }

  search() {
    console.log(this.filterForm.value);
    this.loadPatients();
  }

  // getStatusName(statusValue: boolean): string {
  //   const status = this.statuses.find(s => s.value === statusValue);
  //   return status ? status.name : 'Unknown';
  // }

  onRowClicked(row: Patient) {
    this.router.navigate(
      [
        '/doctor-view/patients',
        row.medicalRecordNumber,
      ]
    );
  }
}
