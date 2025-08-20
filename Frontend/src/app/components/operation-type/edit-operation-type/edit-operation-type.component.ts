import { Component, inject } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { RequiredStaff } from '../../../interfaces/operation-type.interface';
import { OperationTypeService } from '../../../services/operation-type.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-edit-operation-type',
  standalone: false,
  // imports: [],
  templateUrl: './edit-operation-type.component.html',
  styleUrl: './edit-operation-type.component.css'
})

export class EditOperationTypeComponent {

  form: FormGroup;
  requiredStaff: RequiredStaff[] = [];
  roles: string[] = [];
  specializations: string[] = [];
  dataSource: MatTableDataSource<RequiredStaff>;

  constructor(
    private fb: FormBuilder,
    private operationTypeService: OperationTypeService,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource();
    this.form = this.fb.group({
      name: [''],
      requiredStaff: [''],
      estimatedDuration: ['']
    });
  }

  ngOnInit() {
    this.loadRoles();
    this.loadSpecializations();
  }

  loadRoles() {
    this.operationTypeService.getRoles().subscribe((roles: string[]) => {
      this.roles = roles;
    })
  }

  loadSpecializations() {
    this.operationTypeService.getSpecializations().subscribe((specializations: string[]) => {
      this.specializations = specializations;
    })
  }

  submit() { }

}
