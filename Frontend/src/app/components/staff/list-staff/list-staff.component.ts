import { Component } from '@angular/core';
import { Staff } from '../../../interfaces/staff.interface';
import { StaffService } from '../../../services/staff.service';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-list-staff',
    imports: [
        RouterLink,
        MatCardActions,
        MatIcon,
        MatCard,
        MatCardHeader,
        MatCardContent,
        MatCardTitle,
        CommonModule
    ],
    templateUrl: './list-staff.component.html',
    styleUrl: './list-staff.component.css'
})
export class ListStaffComponent {
  staffList: Staff[] = [];

  constructor(private staffService: StaffService) { }

  ngOnInit(): void {
    this.staffService.getAllStaff().subscribe((data) => {
      console.log(data)
      this.staffList = data;
    });
  }

}
