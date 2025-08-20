import { Component } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { PatientService } from '../../../services/patient.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-delete-patient',
    imports: [
        MatCard,
        MatCardHeader,
        MatCardContent,
        MatCardActions,
        MatCardTitle
    ],
    templateUrl: './delete-patient.component.html',
    styleUrl: './delete-patient.component.css'
})
export class DeletePatientComponent {

  medicalRecordNumber!: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService
  ) {
  }

  ngOnInit() {
    // Get medicalRecordNumber from the route
    this.medicalRecordNumber = this.route.snapshot.paramMap.get('medicalRecordNumber')!;
  }

  
  deletePatient() {
    const patientId = this.medicalRecordNumber;

    this.patientService.deletePatientProfile(patientId).subscribe({
      next: () => {
        alert('Patient successfully deleted! Redirecting to the patient list...');

      // Wait for 1.5 seconds before navigating back to the patient list
      setTimeout(() => {
        this.router.navigate(['/admin-view/list-patients']);
      }, 1500);
      },
      error: (err) => {
        console.error('Error deleting patient:', err);
        alert('Error deleting')
      }
    });
  }

  cancel() {
    this.router.navigate(['/admin-view/list-patients']);
  }
}
