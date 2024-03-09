import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCustomerPlanComponent } from './view-customer-plan.component';

describe('ViewCustomerPlanComponent', () => {
  let component: ViewCustomerPlanComponent;
  let fixture: ComponentFixture<ViewCustomerPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCustomerPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCustomerPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
