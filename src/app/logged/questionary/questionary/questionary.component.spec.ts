import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EIndustryComponent } from './e-industry.component';

describe('EIndustryComponent', () => {
  let component: EIndustryComponent;
  let fixture: ComponentFixture<EIndustryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EIndustryComponent]
    });
    fixture = TestBed.createComponent(EIndustryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
