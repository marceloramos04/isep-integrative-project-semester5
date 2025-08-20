import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { OperationRequest } from '../../../interfaces/operation-request.interface';
import { OperationType } from '../../../interfaces/operation-type.interface';
import { OperationTypeService } from '../../../services/operation-type.service';
import { OperationRequestService } from '../../../services/operation-request.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-requests',
  standalone: false,
  // imports: [],
  templateUrl: './list-requests.component.html',
  styleUrls: ['./list-requests.component.css']
})

export class ListRequestsComponent implements OnInit, AfterViewInit {
  types: OperationType[] = [];
  priorities: string[] =[];
  statuses: string[]=[];
  requests: OperationRequest[] = [];
  dataSource: MatTableDataSource<OperationRequest>;
  filterForm: FormGroup;
  displayedColumns: string[] = ['patientName', 'operationTypeName', 'priority', 'status'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private operationTypeService: OperationTypeService,
    private operationRequestService: OperationRequestService,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource();
    this.filterForm = this.fb.group({
      patientName: [''],
      patientSurname: [''],
      typeId: [''],
      priority: [''],
      status: [''],
    });
  }

  ngOnInit() {
    this.loadOperationTypes();
    this.loadStatuses();
    this.loadPriorities();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadOperationTypes() {
    this.operationTypeService.getOperationTypes().subscribe((types: OperationType[]) => {
      this.types = types;
    });
  }

  loadStatuses(){
    this.operationRequestService.getStatuses().subscribe((statuses: string[]) => {
      this.statuses = statuses;
    })
  }

  loadPriorities(){
    this.operationRequestService.getPriorities().subscribe((priorities: string[]) => {
      this.priorities = priorities;
    })
  }

  loadOperationRequests() {
    var formValues=this.filterForm.value;

    this.operationRequestService.getOperationRequests(
      'D202400001', //doctorId
      formValues.patientName,       
      formValues.patientSurname,       
      formValues.typeId,
      formValues.priority,
      formValues.status,
    ).subscribe((requests: OperationRequest[]) => {
      this.requests = requests;
      console.log(this.requests)
      this.dataSource.data=this.requests;
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
    //this.dataSource.data
    this.loadOperationRequests();
  }

  onRowClicked(row: OperationRequest) {
    this.router.navigate(
      [
        '/doctor-view/request-details',
        row.id, 
      ]
    );
  }
}