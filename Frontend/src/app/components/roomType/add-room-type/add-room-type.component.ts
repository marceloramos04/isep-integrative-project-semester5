import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomTypesService } from 'src/app/services/roomTypes.service';

@Component({
  selector: 'app-add-room-type',
  standalone: false,

  templateUrl: './add-room-type.component.html',
  styleUrl: './add-room-type.component.css'
})
export class AddRoomTypeComponent {

  roomTypeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private roomTypesService: RoomTypesService
  ) {
    this.roomTypeForm = this.formBuilder.group({

      name: [
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
    if (this.roomTypeForm.valid) {
      console.log('Form Data:', this.roomTypeForm.value); // Adicionando log para verificar os dados do formulário
      this.roomTypesService.createRoomType(this.roomTypeForm.value).subscribe({
        next: () => alert('The Room Type has been registered successfully!'),
        error: (error) => alert('Error creating the new Room Type: ' + error.message),
      });
    } else {
      alert('Please fill all the fields.');
    }

  }
}

