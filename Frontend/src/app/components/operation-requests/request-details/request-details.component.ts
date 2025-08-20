import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OperationRequest } from '../../../interfaces/operation-request.interface';
import { OperationRequestService } from '../../../services/operation-request.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DeleteRequestComponent } from '../delete-request/delete-request.component';


@Component({
  selector: 'app-request-details',
  standalone: false,
  // imports: [],
  templateUrl: './request-details.component.html',
  styleUrl: './request-details.component.css'
})
export class RequestDetailsComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  readonly dialog = inject(MatDialog);
  request!: OperationRequest;

  constructor(private service: OperationRequestService) {
    const requestId = parseInt(this.route.snapshot.params['id'], 10);
    this.service.getRequestById(requestId).subscribe((request: OperationRequest) => {
      this.request = request;
      console.log(this.request);
    });
  }

  editRequest() {
    alert('Not implemented yet');
    console.log(`Editing request ${this.request.id}`);
    console.error("Not implemented yet");
  }

  deleteRequest() {
    const thisConfirm=signal('');
    const dialogRef = this.dialog.open(DeleteRequestComponent, {data: {confirm: thisConfirm()}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result) {
        console.log(`Deleting ${this.request.id}`);
        this.service.deleteRequest(this.request.id).subscribe(() => {
          console.log('Request deleted successfully');
          this.router.navigate(['/doctor-view/list-requests'])
        });
      }
    });
    
  }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(DeleteRequestComponent, {});
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(result)
  //     return result;
  //   });
  // }

}
