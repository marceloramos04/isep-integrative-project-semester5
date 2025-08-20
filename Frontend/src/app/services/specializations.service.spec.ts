import { TestBed } from '@angular/core/testing';

import { SpecializationsService } from './specializations.service';

describe('SpecializationsService', () => {
  let service: SpecializationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecializationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
