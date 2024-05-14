import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprovementsComponent } from './improvements.component';

describe('ImprovementsComponent', () => {
  let component: ImprovementsComponent;
  let fixture: ComponentFixture<ImprovementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImprovementsComponent]
    });
    fixture = TestBed.createComponent(ImprovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
