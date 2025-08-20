import { Component, inject, model } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';


@Component({
  selector: 'app-delete-request',
  standalone: false,
  templateUrl: './delete-request.component.html',
  styleUrl: './delete-request.component.css'
})
export class DeleteRequestComponent {

  readonly dialogRef = inject(MatDialogRef<DeleteRequestComponent>);
  readonly data = inject<boolean>(MAT_DIALOG_DATA);
  readonly confirmation = model(this.data);

  cancel() {
    this.dialogRef.close();
  }
}
