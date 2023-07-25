import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PackageService } from 'src/app/services/package.service';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})
export class PackageComponent{

  plan = {
    plan_name: '',
    pin_rate: '',
    customer_amount: '',
    status: 'true'
  }

  constructor(private _plan: PackageService, private snack:MatSnackBar) {}

  formSubmit()
  {
    if(this.plan.plan_name.trim()=='' || this.plan.plan_name==null)
    {
      this.snack.open("Please fill the Plan Name !!","Ok",{
        duration:3000
      });
      return;
    }
    if(this.plan.pin_rate==null)
    {
      this.snack.open("Please fill the Pin Rate !!","Ok",{
        duration:3000
      });
      return;
    }
    if(this.plan.customer_amount==null)
    {
      this.snack.open("Please fill the Customer Amount !!","Ok",{
        duration:3000
      });
      return;
    }

    this._plan.addPackage(this.plan).subscribe(
      (data:any)=>{
        this.plan.plan_name=''
        this.plan.customer_amount=''
        this.plan.pin_rate=''
        this.snack.open("Package is added Successfuly !!","Ok",{
          duration:4000
        });
      },
      (error)=>{
        console.log(error);
        this.snack.open("Error !!", "Ok",{
          duration:3000
        });
      }
    )
  }
}
