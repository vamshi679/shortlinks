import { TestBed } from '@angular/core/testing';

import { CustonValidatorService } from './custon-validator.service';

describe('CustonValidatorService', () => {
  let service: CustonValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustonValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
