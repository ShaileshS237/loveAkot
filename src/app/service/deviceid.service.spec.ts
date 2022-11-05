import { TestBed } from '@angular/core/testing';

import { DeviceidService } from './deviceid.service';

describe('DeviceidService', () => {
  let service: DeviceidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
