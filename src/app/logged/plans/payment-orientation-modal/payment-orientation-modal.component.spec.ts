import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentOrientationModalComponent } from './payment-orientation-modal.component';

describe('PaymentOrientationModalComponent', () => {
  let component: PaymentOrientationModalComponent;
  let fixture: ComponentFixture<PaymentOrientationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentOrientationModalComponent]
    });
    fixture = TestBed.createComponent(PaymentOrientationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
