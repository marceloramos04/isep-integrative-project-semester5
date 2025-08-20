import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllergiesService } from 'src/app/services/allergies.service';

@Component({
  selector: 'app-allergy',
  standalone: false,

  templateUrl: './allergy.component.html',
  styleUrl: './allergy.component.css'
})
export class AllergyComponent {
  allergyForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private allergiesService: AllergiesService
  ) {
    this.allergyForm = this.formBuilder.group({

       name: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z\s]+$/) // Only letters and spaces allowed
        ]
      ],
      code: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{9}$/) // Must be exactly 9 digits
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
    if (this.allergyForm.valid) {
      console.log('Form Data:', this.allergyForm.value); // Adicionando log para verificar os dados do formulário
      this.allergiesService.createAllergy(this.allergyForm.value).subscribe({
        next: () => alert('The Allergy has been registered successfully!'),
        error: (error) => alert('Error creating the new allergy: ' + error.message),
      });
    } else {
      alert('Please fill all the fields.');
    }

  }
}
