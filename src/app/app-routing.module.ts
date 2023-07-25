import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { PackageComponent } from './pages/admin/package/package.component';
import { CustomerComponent } from './pages/admin/customer/customer.component';
import { ViewPackagesComponent } from './pages/admin/view-packages/view-packages.component';
import { PackageToCustomerComponent } from './pages/admin/package-to-customer/package-to-customer.component';
import { ViewCustomersComponent } from './pages/admin/view-customers/view-customers.component';
import { ExpenseComponent } from './pages/admin/expense/expense.component';

const routes: Routes = [
  {path: '', component: LoginComponent, pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard], 
  children:[
    {
      path: 'addpackage', component: PackageComponent
    },
    {
      path: 'viewpackage', component: ViewPackagesComponent
    },
    {
      path: 'customer', component: CustomerComponent
    },
    {
      path: 'packagetocustomer', component: PackageToCustomerComponent
    },
    {
      path: 'viewcustomers', component: ViewCustomersComponent
    },
    {
      path: 'expense', component: ExpenseComponent
    }
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
