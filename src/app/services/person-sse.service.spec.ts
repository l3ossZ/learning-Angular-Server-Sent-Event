import { TestBed } from '@angular/core/testing';

import { PersonSseService } from './person-sse.service';

describe('PersonSseService', () => {
  let service: PersonSseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonSseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
