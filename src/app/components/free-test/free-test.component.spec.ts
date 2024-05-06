import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeTestComponent } from './free-test.component';

describe('FreeTestComponent', () => {
  let component: FreeTestComponent;
  let fixture: ComponentFixture<FreeTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FreeTestComponent]
    });
    fixture = TestBed.createComponent(FreeTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
