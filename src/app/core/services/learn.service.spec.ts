import { TestBed, inject } from '@angular/core/testing';

import { LearnService } from './learn.service';

describe('LearnService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LearnService]
    });
  });

  it('should ...', inject([LearnService], (service: LearnService) => {
    expect(service).toBeTruthy();
  }));
});
