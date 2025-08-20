import { Component, inject, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OperationTypeService } from 'src/app/services/operation-type.service';
import { OperationType, RequiredStaff } from 'src/app/interfaces/operation-type.interface';

@Component({
  selector: 'app-register-operation-type',
  standalone: false,
  //  imports: [
  //   ],
  templateUrl: './register-operation-type.component.html',
  styleUrl: './register-operation-type.component.css'
})

export class RegisterOperationTypeComponent implements OnInit, AfterViewInit {

  roles: string[] = [];
  specializations: string[] = [];
  requiredStaffList: RequiredStaff[] = [];
  requiredStaffTableColumns: string[] = ['role', 'specialization', 'quantity', 'actions'];

  private fb = inject(FormBuilder);
  form = this.fb.group({
    name: [null, Validators.required],
    estimatedDuration: [null, Validators.required],
    role: [null],
    specialization: [null],
    quantity: [null],
  });

  constructor(
    private service: OperationTypeService
  ) { }

  ngOnInit(): void {
    this.service.getRoles().subscribe((data) => {
      console.log('Roles loaded', data);
      this.roles = data;
    });

    this.service.getSpecializations().subscribe((data) => {
      console.log('Specializations loaded', data);
      this.specializations = data;
    })
  }

  ngAfterViewInit(): void {

  }

  addRequiredStaff() {
    if (
      this.form.value.role
      && this.form.value.specialization
      && this.form.value.quantity
    ) {
      // Adiciona um novo item à lista
      this.requiredStaffList = [
        ...this.requiredStaffList,
        {
          role: this.form.value.role,
          specialization: this.form.value.specialization,
          quantity: this.form.value.quantity,
        },
      ];

      // Reseta os campos relacionados
      this.form.patchValue({
        role: null,
        specialization: null,
        quantity: null,
      });
    }
  }

  removeRequiredStaff(index: number): void {
    this.requiredStaffList = this.requiredStaffList.filter((_, i) => i !== index);
  }

  submit() {

    if (this.form.valid) {
      const formValues = this.form.value;
      console.log('Form Submitted', formValues);

      const operationType: OperationType = {
        id: 0,
        name: formValues.name || '',
        requiredStaff: this.requiredStaffList || [],
        estimatedDuration: formValues.estimatedDuration || 0,
        status: '',
      }

      this.service.addOperationType(operationType).subscribe(
        response => {
          console.log('Operation type added successfully', response);
          this.requiredStaffList = [];
          this.form.reset();
        },
        error => {
          console.error('Error adding operation type', error);

        }
      );
    }
  }
}
