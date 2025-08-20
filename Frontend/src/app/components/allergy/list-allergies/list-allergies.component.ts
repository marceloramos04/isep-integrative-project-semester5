import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Allergy } from 'src/app/interfaces/allergy.interface';
import { AllergiesService } from 'src/app/services/allergies.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-list-allergies',
  standalone: false,

  templateUrl: './list-allergies.component.html',
  styleUrl: './list-allergies.component.css'
})
export class ListAllergiesComponent implements OnInit, AfterViewInit {


  types: Allergy[] = [];
  code: string[] = [];
  name: string[] = [];
  description: string[] = [];


  filterForm!: FormGroup;
  displayedColumns: string[] = ['code', 'name', 'description'];
  dataSource = new MatTableDataSource<Allergy>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private allergiesService: AllergiesService,
    private router: Router
  ) { 

    this.dataSource = new MatTableDataSource();
    this.filterForm = this.fb.group({
      code: [''],
      name: [''],
      description: [''],
    
    });
  }

  ngOnInit(): void {
  
    this.loadAllergies();
  }


   ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  
  
      this.dataSource.filterPredicate = (data: Allergy, filter: string) => {
        const transformedFilter = filter.trim().toLowerCase();
        return Object.values(data).some(
          (value) => value.toString().toLowerCase().includes(transformedFilter)
        );
      };
    }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
    loadAllergies() {
      var formValues = this.filterForm.value;
  
      this.allergiesService.getFilteredAllergies(
        formValues.code,
        formValues.name,
        formValues.description,
      ).subscribe((types: Allergy[]) => {
        this.types = types;
        console.log('Data from Backend:', this.types);
        this.dataSource.data = this.types;
        console.log('Table Data Source:', this.dataSource.data);
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      });
    }
  
  search() {
    console.log(this.filterForm.value);
 this.allergiesService.searchAllergies(this.filterForm.value).subscribe(data => {
this.dataSource.data = data;
     });
    this.loadAllergies();
  }

  clearField(fieldName: string): void {
    this.filterForm.get(fieldName)?.setValue('');
  }

  onRowClicked(row: Allergy): void {
    console.log('Row clicked:', row);
    this.router.navigate(
      [
        '/doctor-view/details-allergy',
        row.code,
      ]
    );

  }
}
