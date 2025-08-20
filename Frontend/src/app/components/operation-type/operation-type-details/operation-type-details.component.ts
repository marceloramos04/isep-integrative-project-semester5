import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OperationType } from '../../../interfaces/operation-type.interface';
import { OperationTypeService } from '../../../services/operation-type.service';

@Component({
  selector: 'app-operation-type-details',
  standalone: false,
  // imports: [],
  templateUrl: './operation-type-details.component.html',
  styleUrl: './operation-type-details.component.css'
})
export class OperationTypeDetailsComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  type!: OperationType;

  constructor(private service: OperationTypeService){
    const id = parseInt(this.route.snapshot.params['id'], 10);
    this.service.getOperationTypeById(id).subscribe((type: OperationType) => {
      this.type = type;
      console.log("Get OperationType by Id", this.type);
    });
  }

  ngOnInit() {}

  edit(){
    this.router.navigate(['/admin-view/edit-operation-type', this.type.id]);
  }

  deactivate(){
    alert("Not implemented yet");
    // console.log(`Deactivating ${this.type.id}`);
    // this.service.deactivateOperationType(this.type.id).subscribe(() => {
    //   console.log('Type deactivated successfully');
    //   // this.router.navigate(['/admin-view/list-types'])
    // });
  }
}
