import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOperationTypeComponent } from './edit-operation-type.component';

describe('EditOperationTypeComponent', () => {
  let component: EditOperationTypeComponent;
  let fixture: ComponentFixture<EditOperationTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditOperationTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditOperationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
