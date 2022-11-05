import { TestBed } from '@angular/core/testing';

import { AnyalticsService } from './anyaltics.service';

describe('AnyalticsService', () => {
  let service: AnyalticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnyalticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
