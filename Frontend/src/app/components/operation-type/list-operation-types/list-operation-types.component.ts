import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { OperationType } from '../../../interfaces/operation-type.interface';
import { OperationTypeService } from '../../../services/operation-type.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-operation-types',
  standalone: false,
  // imports: [],
  templateUrl: './list-operation-types.component.html',
  styleUrl: './list-operation-types.component.css'
})


export class ListOperationTypesComponent implements OnInit, AfterViewInit {

  types: OperationType[] = [];
  specializations: string[] = [];
  statuses: string[] = [];

  dataSource: MatTableDataSource<OperationType>;
  filterForm: FormGroup;
  displayedColumns: string[] = ['name', 'requiredStaff', 'estimatedDuration', 'status'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private operationTypeService: OperationTypeService,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource();
    this.filterForm = this.fb.group({
      name: [''],
      specialization: [''],
      status: [''],
    });
  }

  ngOnInit() {
    this.loadSpecializations();
    this.loadStatuses();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadSpecializations(){
    this.operationTypeService.getSpecializations().subscribe((specializations: string[]) => {
      this.specializations = specializations;
    })
  }

  loadStatuses(){
    this.operationTypeService.getStatuses().subscribe((statuses: string[]) => {
      this.statuses = statuses;
    })
  }

  loadOperationTypes() {
    var formValues=this.filterForm.value;

    this.operationTypeService.getFilteredOperationTypes(
      formValues.name,       
      formValues.specialization,       
      formValues.status,
    ).subscribe((types: OperationType[]) => {
      this.types = types;
      console.log('Data from Backend:', this.types);
      this.dataSource.data=this.types;
      console.log('Table Data Source:', this.dataSource.data);
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    });
  }

  clearField(field: string) {
    this.filterForm.get(field)?.setValue('');
  }

  search() {
    console.log(this.filterForm.value);
    this.loadOperationTypes();
  }

  // getStatusName(statusValue: boolean): string {
  //   const status = this.statuses.find(s => s.value === statusValue);
  //   return status ? status.name : 'Unknown';
  // }

  onRowClicked(row: OperationType) {
    this.router.navigate(
      [
        '/admin-view/operation-type-details',
        row.id, 
      ]
    );
  }
}