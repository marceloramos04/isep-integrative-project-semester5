import { Component, inject, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StaffService } from '../../../services/staff.service';
import { Staff } from '../../../interfaces/staff.interface';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-add-staff',
  standalone: false,
  templateUrl: './add-staff.component.html',
  styleUrl: './add-staff.component.css'
})

export class AddStaffComponent implements OnInit {

  submitted = false;
  specializations: string[] = [];
  availabilitySlots: { start: string; end: string }[] = [];
  displayedColumns = ['start', 'end', 'actions'];

  constructor(
    private staffService: StaffService,
    private userService: UserService,
    private router: Router) { }

  private fb = inject(FormBuilder);
  form = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    licenseNumber: [null, Validators.required],
    phoneNumber: [null, Validators.required],
    email: [null, Validators.required],
    specialization: [null, Validators.required],
    slotStart: [null],
    slotEnd: [null],
  });

  ngOnInit(): void {
    this.staffService.getSpecializations().subscribe(
      response => {
        this.specializations = response;
      },
      error => {
        console.error('Error getting specializations', error);
      }
    );
  }

  clearField(field: string) {
    this.form.get(field)?.setValue('');
  }

  // Adiciona um timeslot à lista
  addTimeSlot(): void {
    const slotStart = this.form.get('slotStart')?.value;
    const slotEnd = this.form.get('slotEnd')?.value;

    if (slotStart && slotEnd) {
      const startTime = new Date(slotStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
      const endTime = new Date(slotEnd).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
      console.log('Adding time slot', startTime, endTime);

      this.availabilitySlots = [
        ...this.availabilitySlots,
        { start: startTime, end: endTime },
      ]

      // Reseta os campos
      this.form.patchValue({ slotStart: null, slotEnd: null });
    } else {
      alert('Invalid time slot');
    }
  }

  // Remove um timeslot da lista
  removeTimeSlot(index: number): void {
    this.availabilitySlots = this.availabilitySlots.filter((_, i) => i !== index);
  }

  submit() {

    this.submitted = true;

    if (this.form.valid) {
      const formValues = this.form.value;
      console.log('Form Submitted', formValues);

      const newStaff: Staff = {
        id: '', // O ID é gerado automaticamente pelo backend
        firstName: formValues.firstName || '',
        lastName: formValues.lastName || '',
        licenseNumber: formValues.licenseNumber || '',
        email: formValues.email || '',
        phoneNumber: formValues.phoneNumber || '',
        specialization: formValues.specialization || '',
        availabilitySlots: this.availabilitySlots || [],
      }

      console.log('Adding staff', newStaff);

      const user: User = {
        id: '',
        userName: (`${newStaff.firstName}${newStaff.lastName}`).toLowerCase(),
        email: newStaff.email,
        role: 'Doctor',
      };

      this.userService.getUser(user).subscribe(user => {

        this.staffService.addStaff(newStaff).subscribe(
          response => {
            console.log('Staff added successfully', response);
            this.submitted = false;
            this.form.reset();
            this.availabilitySlots = [];
            const route = `admin-view/staff-details/${response.id}`;
            console.log('Route to staff details:', route);
            this.router.navigate([route]);
            // Aqui você pode adicionar lógica adicional para lidar com o sucesso, como redirecionar ou exibir uma mensagem
          },
          error => {
            console.error('Error adding staff', error);
            // Aqui você pode adicionar lógica adicional para lidar com o erro, como exibir uma mensagem de erro
          }
        );
      });



    }
  }
}
