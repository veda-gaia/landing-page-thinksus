import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingSystemComponent } from './rating-system.component';

describe('RatingSystemComponent', () => {
  let component: RatingSystemComponent;
  let fixture: ComponentFixture<RatingSystemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RatingSystemComponent]
    });
    fixture = TestBed.createComponent(RatingSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
