import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SIndustryComponent } from './s-industry.component';

describe('SIndustryComponent', () => {
  let component: SIndustryComponent;
  let fixture: ComponentFixture<SIndustryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SIndustryComponent]
    });
    fixture = TestBed.createComponent(SIndustryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
