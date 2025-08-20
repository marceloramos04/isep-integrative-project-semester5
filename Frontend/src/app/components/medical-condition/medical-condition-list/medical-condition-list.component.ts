import { Component, AfterViewInit, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MedicalCondition } from 'src/app/interfaces/medical-condition.interface';
import { MedicalConditionService } from 'src/app/services/medical-condition.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-medical-condition-list',
  standalone: false,

  templateUrl: './medical-condition-list.component.html',
  styleUrl: './medical-condition-list.component.css'
})
export class MedicalConditionListComponent implements OnInit, AfterViewInit {

  @Input() selectable!: boolean;
  @Output() selected = new EventEmitter<MedicalCondition[]>();

  types: MedicalCondition[] = [];

  filterForm!: FormGroup;
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<MedicalCondition>();
  selection = new SelectionModel<MedicalCondition>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private mconditionService: MedicalConditionService,
  ) {

    this.dataSource = new MatTableDataSource();
    this.filterForm = this.fb.group({
      code: [''],
      name: [''],
      description: [''],
    });
  }

  ngOnInit(): void {
    if(this.selectable){
      this.displayedColumns=['select', 'code', 'name', 'description'];
    } else this.displayedColumns = ['code', 'name', 'description']; 
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  search() {
    const formValues = this.filterForm.value;
    console.log(formValues);

    this.mconditionService.searchMedicalConditions(
      formValues.code, 
      formValues.name, 
      formValues.description
    ).subscribe(data => {
      this.dataSource.data = data;
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    });
  }

  clearField(fieldName: string): void {
    this.filterForm.get(fieldName)?.setValue('');
  }

  isAllSelected() {
    const nSelected = this.selection.selected.length;
    const nRows = this.dataSource.data.length;
    return nSelected === nRows;
  }

  toggleAll(){
    if(this.isAllSelected()){
      this.selection.clear();
      return
    }

    this.selection.select(...this.dataSource.data);
  }

  emitSelected(){
    this.selected.emit(this.selection.selected);
  }
}
