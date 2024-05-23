import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GAgroComponent } from './g-agro.component';

describe('GAgroComponent', () => {
  let component: GAgroComponent;
  let fixture: ComponentFixture<GAgroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GAgroComponent]
    });
    fixture = TestBed.createComponent(GAgroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
