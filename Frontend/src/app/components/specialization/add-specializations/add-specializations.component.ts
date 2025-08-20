import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpecializationsService } from 'src/app/services/specializations.service';

@Component({
  selector: 'app-add-specializations',
  standalone: false,

  templateUrl: './add-specializations.component.html',
  styleUrl: './add-specializations.component.css'
})
export class AddSpecializationsComponent {
  specializationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private specializationsService: SpecializationsService
  ) {
    this.specializationForm = this.formBuilder.group({
      specializationCode: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{15}$/) // Must be exactly 15 digits
        ]
      ],
      designation: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z\s]+$/) // Only letters and spaces allowed
        ]
      ],
      description: [
        '',
        [
          Validators.maxLength(500) // Maximum of 200 characters
        ]
      ]
    });
  }

  onSubmit(): void {
    if (this.specializationForm.valid) {
      this.specializationsService.createSpecialization(this.specializationForm.value).subscribe({
        next: () => alert('Specialization created successfully!'),
        error: (error) => alert('Error creating specialization: ' + error.message),
      });
    } else {
      alert('Please fill all the fields.');
    }

  }
}