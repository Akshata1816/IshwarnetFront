import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatButton } from '@angular/material/button';
import { CustomerService } from 'src/app/services/customer.service';
import { Router } from '@angular/router';


export interface PackageData{
    customer_name: string,
	  username: string,
	  mob_number: number,
	  alt_mob_number: number,
	  address: string,
	  city: string,
	  pincode: string,
    action: MatButton;
}


@Component({
  selector: 'app-view-customers',
  templateUrl: './view-customers.component.html',
  styleUrls: ['./view-customers.component.css']
})
export class ViewCustomersComponent implements OnInit{

  customer= {
    customer_id:'',
    customer_name:'',
	  username:'',
	  mob_number:'',
	  alt_mob_number:'',
	  address:'',
	  city:'',
	  pincode:'',
	  status:'true'
  }
  
  customers : any;

  public displayColumn: string[]=['id','customer_name','mob_number','address','action'];

  dataSource !: MatTableDataSource<PackageData>;


  //paginator
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  //Sort
  @ViewChild(MatSort) sort !: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private _customer:CustomerService, private snack:MatSnackBar, private router:Router) {}

  ngOnInit(): void {
    this._customer.viewCustomers().subscribe((data:any)=>{
      this.customers = data;
      console.table(this.customers);
      this.dataSource= new MatTableDataSource(this.customers);
      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      },
      (error)=>{
      console.log(error);
      this.snack.open("Error !!"," Error in loading data !!");
      })
  }

  getCustomer(id: any){
    
    this._customer.getCustomer(id).subscribe((data:any)=>{
      this.customers = data;
      console.log(this.customers);
      this.router.navigate(['/dashboard/customer']);
    },
    (error)=>{
      console.log(error);
      this.snack.open("Error !!"," Error in loading data !!");
    })
  }

  updateCustomer(){
    
    this._customer.updateCustomer(this.customer).subscribe(
    (data:any)=>{
      this.customers = data;
      console.log(this.customers);
    },
    (error)=>{
      console.log(error);
      this.snack.open("Error !!"," Error in loading data !!");
    })
  }
}
