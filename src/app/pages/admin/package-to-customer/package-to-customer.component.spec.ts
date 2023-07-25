import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageToCustomerComponent } from './package-to-customer.component';

describe('PackageToCustomerComponent', () => {
  let component: PackageToCustomerComponent;
  let fixture: ComponentFixture<PackageToCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackageToCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageToCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
