import { TestBed, inject } from '@angular/core/testing';

import { TestQuestionService } from './test-question.service';

describe('TestQuestionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestQuestionService]
    });
  });

  it('should ...', inject([TestQuestionService], (service: TestQuestionService) => {
    expect(service).toBeTruthy();
  }));
});
