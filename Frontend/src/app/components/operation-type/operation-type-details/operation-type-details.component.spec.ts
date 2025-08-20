import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationTypeDetailsComponent } from './operation-type-details.component';

describe('OperationTypeDetailsComponent', () => {
  let component: OperationTypeDetailsComponent;
  let fixture: ComponentFixture<OperationTypeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationTypeDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
