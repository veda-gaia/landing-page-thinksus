import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssesmentQuestionaryComponent } from './assesment-questionary.component';

describe('AssesmentQuestionaryComponent', () => {
  let component: AssesmentQuestionaryComponent;
  let fixture: ComponentFixture<AssesmentQuestionaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssesmentQuestionaryComponent]
    });
    fixture = TestBed.createComponent(AssesmentQuestionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
