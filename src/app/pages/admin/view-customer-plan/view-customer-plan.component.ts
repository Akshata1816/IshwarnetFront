import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { CustomerPlanService } from 'src/app/services/customer-plan.service';

export interface CustomerPlanData{
  customerPlanId: number;
  plan_name: string;
  remainingAmount: number;
  customer_name: string;
  endDate: Date;
  code:string;
  action: MatButton;
}

@Component({
  selector: 'app-view-customer-plan',
  templateUrl: './view-customer-plan.component.html',
  styleUrls: ['./view-customer-plan.component.css']
})
export class ViewCustomerPlanComponent implements OnInit{

  customerplans : any;

  public displayColumn: string[]=['customerPlanId','customer_name', 'plan_name','remainingAmount','endDate','code','action'];

  dataSource !: MatTableDataSource<CustomerPlanData>;


  //paginator
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  //Sort
  @ViewChild(MatSort) sort !: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  constructor(private _customerPlan:CustomerPlanService, private snack:MatSnackBar) {}

  ngOnInit(): void {

    this._customerPlan.viewCustomerPlans().subscribe((data:any)=>{
      this.customerplans = data;
      console.table(this.customerplans);
      this.dataSource= new MatTableDataSource(this.customerplans);
      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      },
      (error)=>{
      console.log(error);
      this.snack.open("Error !!"," Error in loading data !!");
      })

  }

}
