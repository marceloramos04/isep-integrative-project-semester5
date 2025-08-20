import { Component } from '@angular/core';
import { StaffService } from '../../../services/staff.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';

@Component({
    selector: 'app-deactivate-staff',
    imports: [MatCard,
        MatCardHeader,
        MatCardContent,
        MatCardActions,
        MatCardTitle
    ],
    templateUrl: './deactivate-staff.component.html',
    styleUrl: './deactivate-staff.component.css'
})
export class DeactivateStaffComponent {
  staffId!: string;

  constructor(
    private route: ActivatedRoute,
    private staffService: StaffService,
    private router: Router) { }

  ngOnInit() {
    this.staffId = this.route.snapshot.paramMap.get('staffId')!;
  }

  deactivateStaff(): void {
    const id = this.staffId;

    if (confirm('Are you sure you want to deactivate this staff profile?')) {
      this.staffService.deactivateStaff(id).subscribe({
        next: () => {
          alert('Staff profile deactivated successfully.');
          setTimeout(() => {
            this.router.navigate(['/admin-view/list-staff']);
          }, 1500);

        },
        error: (error) => {
          console.error('Error deactivating staff', error);
        },
      });
    }
  }

  cancel() {
    this.router.navigate(['/admin-view/list-staff']);
  }
}
