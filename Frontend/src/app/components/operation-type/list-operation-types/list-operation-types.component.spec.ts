import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListOperationTypesComponent } from './list-operation-types.component';
import { OperationTypeService } from '../../../services/operation-type.service';
import { of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';
import * as jasmine from 'jasmine';

describe('ListOperationTypesComponent', () => {
  let component: ListOperationTypesComponent;
  let fixture: ComponentFixture<ListOperationTypesComponent>;
  let mockOperationTypeService: jasmine.SpyObj<OperationTypeService>;

  beforeEach(async () => {
    mockOperationTypeService = jasmine.createSpyObj('OperationTypeService', ['getSpecializations', 'getStatuses', 'getFilteredOperationTypes']);

    await TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        ReactiveFormsModule
      ],
      declarations: [ListOperationTypesComponent],
      providers: [
        { provide: OperationTypeService, useValue: mockOperationTypeService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOperationTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load specializations on init', () => {
    const specializations = ['Cardiology', 'Neurology'];
    mockOperationTypeService.getSpecializations.and.returnValue(of(specializations));

    component.ngOnInit();

    expect(component.specializations).toEqual(specializations);
  });

  it('should load statuses on init', () => {
    const statuses = ['Active', 'Inactive'];
    mockOperationTypeService.getStatuses.and.returnValue(of(statuses));

    component.ngOnInit();

    expect(component.statuses).toEqual(statuses);
  });

  it('should load operation types on search', () => {
    const operationTypes = [{ id: 1, name: 'Operation A', requiredStaff: [], estimatedDuration: 60, status: 'Active' }];
    mockOperationTypeService.getFilteredOperationTypes.and.returnValue(of(operationTypes));

    component.search();

    expect(component.types).toEqual(operationTypes);
    expect(component.dataSource.data).toEqual(operationTypes);
  });
});
