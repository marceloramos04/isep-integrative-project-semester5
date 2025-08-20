import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patient } from 'src/app/interfaces/patient.interface';
import { PatientService } from 'src/app/services/patient.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-update-patient',
    standalone: false,
    templateUrl: './update-patient.component.html',
    styleUrl: './update-patient.component.css',
})

export class UpdatePatientComponent implements OnInit{

    private fb = inject(FormBuilder);
    patient!: Patient;
    editFirstName = false;
    editLastName = false;
    editPhoneNumber = false;
    editEmail = false;
    editEmergencyContact = false;
    editDateOfBirth = false;
    editGender = false;

    patientDetails = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        email: ['', Validators.required],
        emergencyContact: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        gender: ['', Validators.required]
    });

    constructor(
        private patientService: PatientService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        
    }

    ngOnInit(): void {
        let patientId = this.route.snapshot.paramMap.get('id');
        if (!patientId) {
            alert('Unable to fetch patient ID');
            return;
        }

        this.patientService.getPatientById1(patientId).subscribe({
            next: (patient) => {
                this.patient = patient;

                this.patientDetails.patchValue({
                    firstName: patient.firstName,
                    lastName: patient.lastName,
                    phoneNumber: patient.phoneNumber,
                    email: patient.email,
                    emergencyContact: patient.emergencyContact,
                    dateOfBirth: patient.dateOfBirth,
                    gender: patient.gender
                });
            },
            error: (err) => {
                alert(err);
            }
        });
}

    updatePatient() {
        let patientId = this.route.snapshot.paramMap.get('id');
        if (!patientId) {
            alert('Unable to fetch patient ID');
            return;
        }

        // if (this.patientDetails.valid) {
        //     // const values = this.patientDetails.value;
        //     const patient: Patient = {
        //         medicalRecordNumber: patientId,
        //         firstName: this.patientDetails.get('firstName')?.value || '',
        //         lastName: this.patientDetails.get('lastName')?.value || '',
        //         phoneNumber: this.patientDetails.get('phoneNumber')?.value || '',
        //         email: this.patientDetails.get('email')?.value || '',
        //         emergencyContact: this.patientDetails.get('emergencyContact')?.value || '',
        //         dateOfBirth: this.patientDetails.get('dateOfBirth')?.value || '',
        //         gender: this.patientDetails.get('gender')?.value || '',
        //         fullName: ''
        //     };

        //     console.log('Updating patient:', patient);

        //     this.patientService.updatePatient(patientId, patient).subscribe({
        //         next: (updatedPatient) => {
        //             console.log('Patient updated successfully:', updatedPatient);
        //             let route = `/admin-view/patient-details/${updatedPatient.medicalRecordNumber}`;
        //             this.router.navigate(
        //                 [route]
        //             );
        //         },
        //         error: (err) => {
        //             console.error('Error updating patient:', err);
        //         }
        //     });
        // }

        const patient: Patient = {
            medicalRecordNumber: patientId,
            firstName: this.patientDetails.get('firstName')?.value || '',
            lastName: this.patientDetails.get('lastName')?.value || '',
            phoneNumber: this.patientDetails.get('phoneNumber')?.value || '',
            email: this.patientDetails.get('email')?.value || '',
            emergencyContact: this.patientDetails.get('emergencyContact')?.value || '',
            dateOfBirth: this.patientDetails.get('dateOfBirth')?.value || '',
            gender: this.patientDetails.get('gender')?.value || '',
            fullName: ''
        };

        console.log('Updating patient:', patient);

        this.patientService.updatePatient(patientId, patient).subscribe({
            next: (updatedPatient) => {
                console.log('Patient updated successfully:', updatedPatient);
                let route = `/admin-view/patient-details/${updatedPatient.medicalRecordNumber}`;
                this.router.navigate(
                    [route]
                );
            },
            error: (err) => {
                console.error('Error updating patient:', err);
            }
        });
    }

    cancel(){
        let patientId = this.route.snapshot.paramMap.get('id');
        let route = `/admin-view/patient-details/${patientId}`;
        this.router.navigate(
            [route]
        );
    }

}
