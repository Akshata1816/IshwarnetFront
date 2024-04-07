import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, startWith } from 'rxjs';
import { CustomerService } from 'src/app/services/customer.service';
import { PackageService } from 'src/app/services/package.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { CustomerPlanService } from 'src/app/services/customer-plan.service';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerPlanData } from '../view-customer-plan/view-customer-plan.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit{
  customer_id:undefined;
  customer:any;
  options: string[] = ['One', 'Two', 'Three'];
  code: string = '';
  packageType: any[] = [];
  packages: any[] = [];
  customerActiveList: any[] = [];
  customerHistoryList: any[] = [];
  customerPlan:any;
  customerPlan1 = {
    // customerDetail: this.customerDetail,
    customer: {} as Customer,
    plan: {} as Plan,
    // customer_name: '',
    // plan_name: '',
    // plan : '',
    comments: '',
    startDate: '',
    endDate: '',
    remainingAmount: '',
    discount: '',
    paidAmount: '',
    currentPaidAmount: '',
    packageType: 'MONTHLY',
  }

  customerplans : any;

  public displayColumn: string[]=['customerPlanId','customer_name', 'plan_name','remainingAmount','endDate','code', 'action'];

  dataSource !: MatTableDataSource<CustomerPlanData>;


  //paginator
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  //Sort
  @ViewChild(MatSort) sort !: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  

  constructor(private customerService:CustomerService, private customerPlanService:CustomerPlanService, private _snack: MatSnackBar, private _plan:PackageService, private _router:ActivatedRoute){

  }

  ngOnInit() {

    this.customer_id = this._router.snapshot.params['customer_id'];
    console.log(this.customer_id, "data");
    this.getCustomerById();
    this.packageTypeList();
    this.packageList();
    this.getCustomerPlan();
    this.customerPlanActiveList();
    this.customerPlanHistoryList();

    // if(this.customerActiveList && this.customerActiveList.length > 0){
    //   this.customerPlan = this.customerActiveList[0];
    //   console.log(this.customerPlan, "Active Plan");
    // }
  }

  getCustomerPlan(){
    this.customerPlanService.viewCustomerPlans().subscribe((data:any)=>{
      this.customerplans = data;
      console.table(this.customerplans);
      // this.dataSource= new MatTableDataSource(this.customerplans);
      
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
      },
      (error)=>{
        console.log(error);
        // this.snack.open("Error !!"," Error in loading data !!");
      })

  }
  

  getCustomerById() {
    
    this.customerService.getCustomer(this.customer_id).subscribe(
      (data:any)=>{
        this.customer=data;
        console.log(this.customer);
      },
      (error)=>{
        console.log(error);
        this._snack.open("Error !!","Ok");
      }
    )
  }

  trackById(index: any, item: any) {
    return item.predefinedId;
  }

  packageTypeList() {
    this.code = "PACKAGE";
    this._plan.viewPackageType(this.code).subscribe(
      (data:any)=>{
        this.packageType=data;
        console.log(this.packageType, "package types");
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

  customerPlanActiveList() {
    this.customerPlanService.viewCustomerPlansActive(this.customer_id).subscribe(
      (data:any)=>{
        this.customerActiveList=data;
        console.log(this.customerActiveList);
        if(this.customerActiveList && this.customerActiveList.length > 0){
          this.customerPlan = this.customerActiveList[0];
          console.log(this.customerPlan, "Active Plan");
        }
      },
      (error)=>{
        console.log(error);
        this._snack.open("Error !!","Ok");
      }
    )
  }

  customerPlanHistoryList() {
    this.customerPlanService.viewCustomerPlansHistory(this.customer_id).subscribe(
      (data:any)=>{
        this.customerHistoryList=data;
        console.log(this.customerHistoryList);
        this.dataSource= new MatTableDataSource(this.customerHistoryList);
      
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error)=>{
        console.log(error);
        this._snack.open("Error !!","Ok");
      }
    )
  }

  onPlanSelected(event: MatAutocompleteSelectedEvent): void {
    // event.option.value will contain the selected customer object
    this.customer.packageType = event.option.value;
    this.customer.packageTypeId = event.option.value.predefinedId;
    // this.customer.packageType.plan_name = event.option.value.plan_name;
  }

  displayPlanName(packageType: any): string {
    if(this.customer && this.customer != null){
      console.log("custmer");
      return packageType = this.customer.packageType.name;
    }else{
      console.log(" else custmer");
      return packageType ? packageType.name : '';  // Display the customer's name
    }
  }

  onPackageSelected(event1: MatAutocompleteSelectedEvent): void {
    // event.option.value will contain the selected customer object
    this.customerPlan.plan = event1.option.value;
    this.customerPlan.id = event1.option.value.id;
    // this.customer.packageType.plan_name = event.option.value.plan_name;
  }

  displayPackageName(packages: any): string {
    if(this.customerPlan){
      console.log("plan");
      return packages = this.customerPlan.plan.plan_name;
    }else{
      return packages ? packages.plan_name : '';  // Display the customer's name
    }
  }

  onPlan1Selected(event: MatAutocompleteSelectedEvent): void {
    // event.option.value will contain the selected customer object
    this.customerPlan1.plan = event.option.value;
    this.customerPlan1.plan.plan_name = event.option.value.plan_name;
  }

  displayPlan1Name(plan: any): string {
    return plan ? plan.plan_name : '';  // Display the customer's name
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
    
    // if(this.customer.packageType.trim()=='' || this.customer.packageType==null)
    // {
    //   this._snack.open("Please fill the Package Type !!","Ok",{
    //     duration:3000
    //   });
    //   return;
    // }

    this.customerService.updateCustomer(this.customer).subscribe(
      (data:any)=>{
        // this.customerPlan.plan_name=''
        // this.customerPlan.customer_name=''
        // this.customerPlan.customerDetail = new Customer();
        // this.customerPlan.customer = {} as Customer;
        // this.customerPlan.plan = {} as Plan;
        // this.customerPlan.comments=''
        // this.customerPlan.discount=''
        // this.customerPlan.packageType=''
        // this.customerPlan.startDate=''
        Swal.fire({
          icon: 'success',
          title: 'Customer updated successfully',
          allowOutsideClick: false,
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

  savePackageToCutomer()
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
    if(this.customerPlan1.startDate==null)
    {
      this._snack.open("Please fill the Start Date !!","Ok",{
        duration:3000
      });
      return;
    }
    if(this.customerPlan1.packageType.trim()=='' || this.customerPlan1.packageType==null)
    {
      this._snack.open("Please fill the Package Type !!","Ok",{
        duration:3000
      });
      return;
    }

    this.customerPlan1.customer = this.customer;
    this.customerPlanService.saveCustomerPlan(this.customerPlan1).subscribe(
      (data:any)=>{
        // this.customerPlan.plan_name=''
        // this.customerPlan.customer_name=''
        // this.customerPlan.customerDetail = new Customer();
        this.customerPlan1.customer = this.customer;
        this.customerPlan1.plan = {} as Plan;
        this.customerPlan1.comments=''
        this.customerPlan1.discount=''
        this.customerPlan1.packageType=''
        this.customerPlan1.startDate=''
        Swal.fire({
          icon: 'success',
          title: 'Customer Package Added successfully',
          allowOutsideClick: false,
        });
        // this._snack.open("Package to Customer added Successfuly !!","Ok",{
        //   duration:4000
        // });
      },
      (error)=>{
        console.log(error);
        this._snack.open("Error !!", "Ok",{
          duration:3000
        });
      }
    )
  }

  updatePackageToCutomer()
  {
    // this.customerPlan.customer = this.customer;
    this.customerPlanService.updateCustomerPlan(this.customerPlan).subscribe(
      (data:any)=>{
        Swal.fire({
          icon: 'success',
          title: 'Paid Amount Added successfully',
          allowOutsideClick: false,
        });
        // this._snack.open("Package to Customer added Successfuly !!","Ok",{
        //   duration:4000
        // });
      },
      (error)=>{
        console.log(error);
        this._snack.open("Error !!", "Ok",{
          duration:3000
        });
      }
    )
  }

}
