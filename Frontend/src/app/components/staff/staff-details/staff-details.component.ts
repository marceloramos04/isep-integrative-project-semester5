import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Staff } from 'src/app/interfaces/staff.interface';
import { StaffService } from 'src/app/services/staff.service';

@Component({
  selector: 'app-staff-details',
  standalone: false,

  templateUrl: './staff-details.component.html',
  styleUrl: './staff-details.component.css'
})
export class StaffDetailsComponent implements OnInit {

  route: ActivatedRoute = inject(ActivatedRoute);
  staff!: Staff;

  constructor(
    private service: StaffService) {

    const id = this.route.snapshot.params['id'];
    console.log(`Getting staff with id ${id}`);
    this.service.getStaffById(id).subscribe((staff) => {
      this.staff = staff;
      console.log(`Staff ${staff.id} loaded`, staff);
    },
      error => {
        console.error(`Error getting staff ${id}`, error);
      });
  }

  ngOnInit(): void {

  }

  editStaff() {
    alert("Not implemented yet");
    console.log("Editing staff");
    console.log("To do (not implemented yet)");
  }

  deleteStaff() {
    alert("Not implemented yet");
    console.log("Deleting staff");
    console.log("To do (not implemented yet)");
  }
}
