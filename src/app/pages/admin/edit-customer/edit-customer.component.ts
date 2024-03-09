import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, startWith } from 'rxjs';
import { CustomerService } from 'src/app/services/customer.service';
import { PackageService } from 'src/app/services/package.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Customer } from 'src/app/models/Customer.model';
import { Plan } from 'src/app/models/Plan.model';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit{
  options: string[] = ['One', 'Two', 'Three'];
  code: string = '';
  packageType: any[] = [];
  packages: any[] = [];
  customerPlan = {
    // customerDetail: this.customerDetail,
    customer: {} as Customer,
    plan: {} as Plan,
    // customer_name: '',
    // plan_name: '',
    comments: '',
    startDate: '',
    discount: '',
    packageType: 'MONTHLY',
  }

  constructor(private _cust:CustomerService, private _snack: MatSnackBar, private _plan:PackageService){

  }

  ngOnInit() {
    this.packageTypeList();
    this.packageList();
  }

  packageTypeList() {
    this.code = "PACKAGE";
    this._plan.viewPackageType(this.code).subscribe(
      (data:any)=>{
        this.packageType=data;
        console.log(this.packageType);
      },
      (error)=>{
        console.log(error);
        this._snack.open("Error !!","Ok");
      }
    )
  }

  packageList() {
    this._plan.viewpackage().subscribe(
      (data:any)=>{
        this.packages=data;
        console.log(this.packages);
      },
      (error)=>{
        console.log(error);
        this._snack.open("Error !!","Ok");
      }
    )
  }

  onPlanSelected(event: MatAutocompleteSelectedEvent): void {
    // event.option.value will contain the selected customer object
    this.customerPlan.plan = event.option.value;
    this.customerPlan.plan.plan_name = event.option.value.plan_name;
  }

  displayPlanName(plan: any): string {
    return plan ? plan.plan_name : '';  // Display the customer's name
  }


}
