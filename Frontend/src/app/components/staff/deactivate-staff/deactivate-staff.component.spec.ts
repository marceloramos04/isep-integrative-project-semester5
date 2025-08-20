import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivateStaffComponent } from './deactivate-staff.component';

describe('DeactivateStaffComponent', () => {
  let component: DeactivateStaffComponent;
  let fixture: ComponentFixture<DeactivateStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeactivateStaffComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeactivateStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
