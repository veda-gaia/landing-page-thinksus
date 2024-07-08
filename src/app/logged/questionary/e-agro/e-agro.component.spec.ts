import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EAgroComponent } from './e-agro.component';

describe('EAgroComponent', () => {
  let component: EAgroComponent;
  let fixture: ComponentFixture<EAgroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EAgroComponent]
    });
    fixture = TestBed.createComponent(EAgroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
