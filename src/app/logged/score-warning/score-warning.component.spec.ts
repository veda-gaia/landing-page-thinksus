import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreWarningComponent } from './score-warning.component';

describe('ScoreWarningComponent', () => {
  let component: ScoreWarningComponent;
  let fixture: ComponentFixture<ScoreWarningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScoreWarningComponent]
    });
    fixture = TestBed.createComponent(ScoreWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
