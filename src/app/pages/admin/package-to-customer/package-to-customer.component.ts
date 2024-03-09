import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from 'src/app/services/customer.service';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { PackageService } from 'src/app/services/package.service';
import { CustomerPlanService } from 'src/app/services/customer-plan.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';


export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

interface Customer{
  customer_id:number
   customer_name:string;
   username:string;
   mob_number:number;
   alt_mob_number:number;
   address:string;
   city:string;
   pincode:string;
}

interface Plan{
  plan_name: string,
  pin_rate: number,
  customer_amount: number,
}

@Component({
  selector: 'app-package-to-customer',
  templateUrl: './package-to-customer.component.html',
  styleUrls: ['./package-to-customer.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }]

})
export class PackageToCustomerComponent implements OnInit{
  packages: any[] = [];
  customers: any[] = [];
  // customerDetail: Customer = new Customer();
  // plandetail: Plan = new Plan();
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
  
  chosenDate: FormControl = new FormControl();


  constructor(private _cust:CustomerService, private _snack: MatSnackBar, private _plan:PackageService, private _customerPlan:CustomerPlanService){

  }

  ngOnInit(): void {
    this.packageList();
    this.customerList();
    
  }

  customerList() {
    this._cust.viewCustomers().subscribe(
      (data:any)=>{
        this.customers=data;
        console.log(this.customers);
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


  formSubmit()
  {
    // if(this.customerPlan.plan_name.trim()=='' || this.customerPlan.plan_name==null)
    // {
    //   this._snack.open("Please fill the Plan Name !!","Ok",{
    //     duration:3000
    //   });
    //   return;
    // }
    // if(this.customerPlan.customer_name.trim()=='' || this.customerPlan.customer_name==null)
    // {
    //   this._snack.open("Please fill the Customer Name !!","Ok",{
    //     duration:3000
    //   });
    //   return;
    // }
    if(this.customerPlan.startDate==null)
    {
      this._snack.open("Please fill the Start Date !!","Ok",{
        duration:3000
      });
      return;
    }
    if(this.customerPlan.packageType.trim()=='' || this.customerPlan.packageType==null)
    {
      this._snack.open("Please fill the Package Type !!","Ok",{
        duration:3000
      });
      return;
    }

    this._customerPlan.saveCustomerPlan(this.customerPlan).subscribe(
      (data:any)=>{
        // this.customerPlan.plan_name=''
        // this.customerPlan.customer_name=''
        // this.customerPlan.customerDetail = new Customer();
        this.customerPlan.customer = {} as Customer;
        this.customerPlan.plan = {} as Plan;
        this.customerPlan.comments=''
        this.customerPlan.discount=''
        this.customerPlan.packageType=''
        this.customerPlan.startDate=''
        this._snack.open("Package to Customer added Successfuly !!","Ok",{
          duration:4000
        });
      },
      (error)=>{
        console.log(error);
        this._snack.open("Error !!", "Ok",{
          duration:3000
        });
      }
    )
  }

  // Function to set the date format
  getDatePickerFormat() {
    return 'DD/MM/YYYY'; // This sets the date format as DD/MM/YYYY
  }

  onDateChange(event: any): void {
    // Handle the date change event here
    console.log('Selected Date:', event);
    // Perform actions with the selected date
  }

  onCustomerSelected(event: MatAutocompleteSelectedEvent): void {
    // event.option.value will contain the selected customer object
    this.customerPlan.customer = event.option.value;
    this.customerPlan.customer.customer_id = event.option.value.customer_id;
  }

  displayCustomerName(customer: any): string {
    return customer ? customer.customer_name : '';  // Display the customer's name
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
