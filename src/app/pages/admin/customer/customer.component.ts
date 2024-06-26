import { Component } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from 'src/app/services/customer.service';
import { PackageService } from 'src/app/services/package.service';
import Swal from 'sweetalert2'

interface Package{
  code: string,
  name: string,
  predefinedId: number,
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {
  code: string = '';
  packageType: any[]=[];
  customer= {
    customer_id:'',
    customer_name:'',
	  username:'',
	  mob_number:'',
	  alt_mob_number:'',
	  address:'',
	  city:'',
	  pincode:'',
	  status:'true',
    packageType: {} as Package,
  }

  constructor(private _customer:CustomerService, private snack:MatSnackBar, private _plan:PackageService) {}

  ngOnInit() {
    this.packageTypeList();
  }

  formSubmit() 
  {
    if(this.customer.customer_name.trim()=='' || this.customer.customer_name==null)
    {
      this.snack.open("Please fill the Customer Name !!","Ok",{
        duration:3000
      });
      return;
    }
    if(this.customer.username.trim()=='' || this.customer.username==null)
    {
      this.snack.open("Please fill the username !!","Ok",{
        duration:3000
      });
      return;
    }
    if(this.customer.mob_number.trim()=='' || this.customer.mob_number==null)
    {
      this.snack.open("Please fill the Mobile Number !!","Ok",{
        duration:3000
      });
      return;
    }
    if(this.customer.address.trim()=='' || this.customer.address==null)
    {
      this.snack.open("Please fill the Address !!","Ok",{
        duration:3000
      });
      return;
    }


    this._customer.addCustomer(this.customer).subscribe(
      (data:any)=>{
        // this.snack.open("Customer Added Sucessfuly !!", "ok",{
        //   duration:3000
        // });
        Swal.fire({
          icon: 'success',
          title: 'Customer Added successfully',
          allowOutsideClick: false,
        });
      },
      (error)=>
      {
        console.log(error);
        this.snack.open("Error !!", "Ok",{
          duration:3000
        });
      }
    );
  }

  packageTypeList() {
    this.code = 'PACKAGE';
    this._plan.viewPackageType(this.code).subscribe(
      (data:any)=>{
        this.packageType=data;
        console.log(this.packageType, "Package type");
      },
      (error)=>{
        console.log(error);
        this.snack.open("Error !!","Ok");
      }
    )
  }

  onPlanSelected(event: MatAutocompleteSelectedEvent): void {
    // event.option.value will contain the selected customer object
    this.customer.packageType = event.option.value;
    // this.customer.packageType.plan_name = event.option.value.plan_name;
  }

  displayPlanName(packageType: any): string {
      return packageType ? packageType.name : '';  // Display the customer's name
    
  }

}
