import { TestBed } from '@angular/core/testing';

import { CmcHttpService } from './cmc-http.service';

describe('CmcHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CmcHttpService = TestBed.get(CmcHttpService);
    expect(service).toBeTruthy();
  });
});
