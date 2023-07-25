import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {

  customer= {
    customer_name:'',
	  username:'',
	  mob_number:'',
	  alt_mob_number:'',
	  address:'',
	  city:'',
	  pincode:'',
	  status:'true'
  }

  constructor(private _customer:CustomerService, private snack:MatSnackBar) {}

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
        this.snack.open("Customer Added Sucessfuly !!", "ok",{
          duration:3000
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
}
