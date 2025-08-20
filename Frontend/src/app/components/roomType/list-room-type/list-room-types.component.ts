import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RoomType } from 'src/app/interfaces/roomType.interface';
import { RoomTypesService } from 'src/app/services/roomTypes.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-list-room-types',
  standalone: false,

  templateUrl: './list-room-types.component.html',
  styleUrl: './list-room-types.component.css'
})
export class ListRoomTypesComponent implements OnInit, AfterViewInit {


  types: RoomType[] = [];
  name: string[] = [];
  description: string[] = [];


  filterForm!: FormGroup;
  displayedColumns: string[] = [ 'name', 'description'];
  dataSource = new MatTableDataSource<RoomType>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private roomTypesService: RoomTypesService,
    private router: Router
  ) { 

    this.dataSource = new MatTableDataSource();
    this.filterForm = this.fb.group({
      name: [''],
      description: [''],
    
    });
  }

  ngOnInit(): void {
  
    this.loadRoomTypes();
  }


   ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  
  
      this.dataSource.filterPredicate = (data: RoomType, filter: string) => {
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

  
  loadRoomTypes() {
      var formValues = this.filterForm.value;
  
      this.roomTypesService.getFilteredRoomTypes(
        formValues.name,
        formValues.description,
      ).subscribe((types: RoomType[]) => {
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
 this.roomTypesService.searchRoomTypes(this.filterForm.value).subscribe(data => {
this.dataSource.data = data;
     });
    this.loadRoomTypes();
  }

  clearField(fieldName: string): void {
    this.filterForm.get(fieldName)?.setValue('');
  }

  onRowClicked(row: RoomType): void {
    console.log('Row clicked:', row);
    this.router.navigate(
      [
        '/admin-view/details-room-type',
        row.name,
      ]
    );

  }
}
