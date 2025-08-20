import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Patient } from 'src/app/interfaces/patient.interface';
import { PatientService } from 'src/app/services/patient.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'app-update-patient-by-patient',
    standalone: false,

    templateUrl: './update-patient-by-patient.component.html',
    styleUrl: './update-patient-by-patient.component.css'
})
export class UpdatePatientByPatientComponent {
    private fb = inject(FormBuilder);
    patientDetails = this.fb.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        phoneNumber: [null, Validators.required],
        email: [null, Validators.required],
        emergencyContact: [null, Validators.required],
        dateOfBirth: [null, Validators.required],
        gender: [null, Validators.required]
    });

    constructor(
        private patientService: PatientService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    updatePatient() {
        const patientId = this.route.parent?.snapshot.paramMap.get('id');
        // alert(`parent route ${patientId}`);
        if (!patientId) {
            alert('Unable to fetch patient ID');
            return;
        }

        if (this.patientDetails.valid) {
            const values = this.patientDetails.value;
            const patient: Patient = {
                medicalRecordNumber: patientId,
                firstName: values.firstName || '',
                lastName: values.lastName || '',
                phoneNumber: values.phoneNumber || '',
                email: values.email || '',
                emergencyContact: values.emergencyContact || '',
                dateOfBirth: values.dateOfBirth || '',
                gender: '',
                fullName: ''
            };

            this.patientService.updatePatient(patientId, patient).subscribe({
                next: (updatedPatient) => {
                    console.log('Patient updated successfully:', updatedPatient);
                    let route = `/patient-view/${updatedPatient.medicalRecordNumber}/details-patient`;
                    this.router.navigate(
                        [route]
                    );
                },
                error: (err) => {
                    console.error('Error updating patient:', err);
                }
            });
        }


    }
}
