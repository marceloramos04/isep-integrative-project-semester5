import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OperationRequestService } from 'src/app/services/operation-request.service';
import { OperationTypeService } from 'src/app/services/operation-type.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
    selector: 'app-add-request',
    templateUrl: './add-request.component.html',
    styleUrl: './add-request.component.css',
    standalone: false
})
export class AddRequestComponent {
  operationForm: FormGroup;
  patientList: any[] = [];
  operationTypeList: any[] = [];

  constructor(private fb: FormBuilder,
    private operationRequestService: OperationRequestService,
    private patientService: PatientService,
    private operationTypeService: OperationTypeService) {
    this.operationForm = this.fb.group({
      patientId: ['', Validators.required],
      doctorId: ['', Validators.required],
      operationTypeId: ['', Validators.required],
      deadline: ['', Validators.required],
      priority: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadPatients();
    this.loadOperationTypes();
  }

  loadPatients() {
    this.patientService.getAllPatients().subscribe((data) => {
      this.patientList = data;
    });
  }

  loadOperationTypes() {
    this.operationTypeService.getOperationTypes().subscribe((data) => {
      this.operationTypeList = data;
    });
  }

  priorities = [
    "Elective",
    "Urgent",
    "Emergency"
  ];

  onSubmit(): void {
    if (this.operationForm.valid) {
      this.operationRequestService.createOperationRequest(this.operationForm.value).subscribe({
        next: () => alert('Operation request submitted successfully!'),
        error: (error) => alert('Error submitting operation request: ' + error.message),
      });
    } else {
      alert('Please fill out all required fields!');
    }
  }

}
