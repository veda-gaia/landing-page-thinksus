import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GServiceComponent } from './g-service.component';

describe('GServiceComponent', () => {
  let component: GServiceComponent;
  let fixture: ComponentFixture<GServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GServiceComponent]
    });
    fixture = TestBed.createComponent(GServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
