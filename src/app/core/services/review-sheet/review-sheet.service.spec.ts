import { TestBed, inject } from '@angular/core/testing';

import { ReviewSheetService } from './review-sheet.service';

describe('ReviewSheetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReviewSheetService]
    });
  });

  it('should ...', inject([ReviewSheetService], (service: ReviewSheetService) => {
    expect(service).toBeTruthy();
  }));
});
