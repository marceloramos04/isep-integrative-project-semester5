import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Patient } from 'src/app/interfaces/patient.interface';
import { PatientService } from 'src/app/services/patient.service';
import { hardCodedPatientId } from 'src/app/app.component';

@Component({
  selector: 'app-patient-details-by-patient',
  standalone: false,
  
  templateUrl: './patient-details-by-patient.component.html',
  styleUrl: './patient-details-by-patient.component.css'
})
export class PatientDetailsByPatientComponent implements OnInit {
  patientDetails: Patient | null = null;

  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    let patientId='';
    const parentRoute = this.route.parent;
    if (parentRoute) {
      parentRoute.paramMap.subscribe(params => {
        const parentId = params.get('id');
        if (parentId) {
          patientId = parentId;
        }
      });

    } else {
      alert('Patient ID not found in URL');
      return;
    }

    // const patientId = hardCodedPatientId;

    // const patientId="2025000001";

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
