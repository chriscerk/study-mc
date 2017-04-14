import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleReviewDataComponent } from './example-review-data.component';

describe('ExampleReviewDataComponent', () => {
  let component: ExampleReviewDataComponent;
  let fixture: ComponentFixture<ExampleReviewDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleReviewDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleReviewDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
