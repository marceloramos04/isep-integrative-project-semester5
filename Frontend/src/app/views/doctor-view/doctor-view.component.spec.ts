import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorViewComponent } from './doctor-view.component';

describe('DoctorViewComponent', () => {
  let component: DoctorViewComponent;
  let fixture: ComponentFixture<DoctorViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
