import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SAgroComponent } from './s-agro.component';

describe('SAgroComponent', () => {
  let component: SAgroComponent;
  let fixture: ComponentFixture<SAgroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SAgroComponent]
    });
    fixture = TestBed.createComponent(SAgroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
