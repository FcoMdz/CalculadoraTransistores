import { TestBed } from '@angular/core/testing';

import { TransistoresService } from './transistores.service';

describe('TransistoresService', () => {
  let service: TransistoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransistoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
