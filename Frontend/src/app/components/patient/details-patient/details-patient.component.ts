import { Component, inject, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { CommonModule, Time } from '@angular/common'; // Importe o CommonModule
import { ReactiveFormsModule, FormBuilder, Validators, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { StaffService } from '../../../services/staff.service';
import { Staff } from '../../../interfaces/staff.interface';

import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
//import { TableDataSource, TableItem } from './table-datasource';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { Patient } from 'src/app/interfaces/patient.interface';
import { PatientService } from 'src/app/services/patient.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-patient',
  standalone: false,
  templateUrl: './details-patient.component.html',
  styleUrls: ['./details-patient.component.css']
})
export class DetailsPatientComponent implements OnInit {

  patientDetails: Patient | null = null;

  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const patientId = this.route.snapshot.paramMap.get('id');
    if (!patientId) {
      alert('Patient ID not found in URL');
      return;
    }

    this.patientService.getPatientById1(patientId).subscribe({
      next: (patient) => {
        this.patientDetails = patient;
      },
      error: (err) => {
        console.error('Error fetching patient details:', err);
      }
    });
  }

  deactivate(){
    alert('Not implemented yet');
  }
}
