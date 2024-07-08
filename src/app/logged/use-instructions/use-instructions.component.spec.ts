import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseInstructionsComponent } from './use-instructions.component';

describe('UseInstructionsComponent', () => {
  let component: UseInstructionsComponent;
  let fixture: ComponentFixture<UseInstructionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UseInstructionsComponent]
    });
    fixture = TestBed.createComponent(UseInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
