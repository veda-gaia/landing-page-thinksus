import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SServiceComponent } from './s-service.component';

describe('SServiceComponent', () => {
  let component: SServiceComponent;
  let fixture: ComponentFixture<SServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SServiceComponent]
    });
    fixture = TestBed.createComponent(SServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
