import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Specialization } from 'src/app/interfaces/specialization.interface';
import { SpecializationsService } from 'src/app/services/specializations.service';

@Component({
  selector: 'app-edit-specializations',
  standalone: false,
  templateUrl: './edit-specializations.component.html',
  styleUrl: './edit-specializations.component.css'
})

export class EditSpecializationsComponent implements OnInit {
  private fb = inject(FormBuilder);
  specializationDetails = this.fb.group({
    designation: [null, Validators.required],
    description: [null]
  });

  specialization: Specialization | null = null;
  specializationCode: string | null = null;

  constructor(
    private specializationsService: SpecializationsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
 
  }

  ngOnInit(): void {
    this.specializationCode = this.route.snapshot.paramMap.get('id');
    if (!this.specializationCode) {
      alert('Specialization code not found in URL');
      return;
    }

    this.specializationsService.getSpecializationById(this.specializationCode).subscribe({
      next: (specialization) => {
        this.specialization = specialization;
      },
      error: (err) => {
        console.error('Error fetching specialization details:', err);
      }
    });

  }

  onSubmit(): void {
    if (this.specializationDetails.valid) {
      const values = this.specializationDetails.value;
      const updatedSpecialization: Specialization = {
        specializationCode: this.specializationCode || '',
        designation: values.designation || '',
        description: values.description || ''
      };

      console.log('Updating specialization:', updatedSpecialization);

      this.specializationsService.updateSpecialization(updatedSpecialization).subscribe({
        next: () => {
          console.log('Specialization updated successfully!');
          alert('Specialization updated successfully!');
          this.router.navigate(['/admin-view/details-specialization', this.specializationCode]);
        },
        error: (err) => {
          console.error('Error updating specialization:', err);
          alert('Error updating specialization.');
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/admin-view/details-specialization', this.specializationCode]);
  }
}
