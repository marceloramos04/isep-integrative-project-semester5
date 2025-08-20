import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Specialization } from 'src/app/interfaces/specialization.interface';
import { SpecializationsService } from 'src/app/services/specializations.service';

@Component({
  selector: 'app-list-specializations',
  standalone: false,

  templateUrl: './list-specializations.component.html',
  styleUrl: './list-specializations.component.css'
})
export class ListSpecializationsComponent {
  filterForm!: FormGroup;
  displayedColumns: string[] = ['specializationCode', 'designation', 'description'];
  dataSource = new MatTableDataSource<Specialization>();

  constructor(
    private fb: FormBuilder,
    private specializationsService: SpecializationsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      specializationCode: [''],
      designation: [''],
      description: ['']
    });
    this.search();
  }

  search(): void {
    const filterValues = this.filterForm.value;
    this.specializationsService.searchSpecializations(filterValues).subscribe(data => {
      this.dataSource.data = data;
    });
  }

  clearField(fieldName: string): void {
    this.filterForm.get(fieldName)?.setValue('');
  }

  onRowClicked(row: Specialization): void {
    console.log('Row clicked:', row);
    this.router.navigate(
      [
        '/admin-view/details-specialization',
        row.specializationCode,
      ]
    );

  }
}
