import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsgComponent } from './esg.component';

describe('EsgComponent', () => {
  let component: EsgComponent;
  let fixture: ComponentFixture<EsgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EsgComponent]
    });
    fixture = TestBed.createComponent(EsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
