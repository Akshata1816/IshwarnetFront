import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from 'src/app/services/customer.service';


@Component({
  selector: 'app-package-to-customer',
  templateUrl: './package-to-customer.component.html',
  styleUrls: ['./package-to-customer.component.css'],

})
export class PackageToCustomerComponent implements OnInit{

  customers: any[] = [];

  constructor(private _cust:CustomerService, private _snack: MatSnackBar){}

  ngOnInit(): void {
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
}
