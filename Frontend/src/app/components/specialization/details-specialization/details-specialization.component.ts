import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Specialization } from 'src/app/interfaces/specialization.interface';
import { SpecializationsService } from 'src/app/services/specializations.service';

@Component({
  selector: 'app-details-specialization',
  standalone: false,
  templateUrl: './details-specialization.component.html',
  styleUrl: './details-specialization.component.css'
})
export class DetailsSpecializationComponent {

  specializationCode: string | null = null;
  specialization: Specialization | null = null;

  constructor(private specializationsService: SpecializationsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

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

    onEdit(): void {
      this.router.navigate(['/admin-view/edit-specialization', this.specialization?.specializationCode]);
    }

    onDelete(): void {
      if (!this.specializationCode) {
        alert('Specialization code not found.');
        return;
      }
    
      const confirmDelete = confirm('Are you sure you want to delete this specialization?');
      if (confirmDelete) {
        this.specializationsService.deleteSpecialization(this.specializationCode).subscribe({
          next: () => {
            console.log('Specialization deleted successfully!');
            alert('Specialization deleted successfully!');
            this.router.navigate(['/admin-view/list-specializations']); 
          },
          error: (err) => {
            console.error('Error deleting specialization:', err);
            alert('Error deleting specialization. Please try again.');
          }
        });
      }
    }

  }
