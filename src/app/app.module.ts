import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NavbarComponent } from './component/navbar/navbar.component';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { AuthInterceptorProviders } from './services/auth.interceptor';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {NgIf, NgFor} from '@angular/common';
import { PackageComponent } from './pages/admin/package/package.component';
import {MatMenuModule} from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { CustomerComponent } from './pages/admin/customer/customer.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ViewPackagesComponent } from './pages/admin/view-packages/view-packages.component';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ViewCustomersComponent } from './pages/admin/view-customers/view-customers.component';
import { PackageToCustomerComponent } from './pages/admin/package-to-customer/package-to-customer.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatRadioModule} from '@angular/material/radio';
import { ExpenseComponent } from './pages/admin/expense/expense.component';
import { ViewCustomerPlanComponent } from './pages/admin/view-customer-plan/view-customer-plan.component';
import { EditCustomerComponent } from './pages/admin/edit-customer/edit-customer.component';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    DashboardComponent,
    SidebarComponent,
    PackageComponent,
    CustomerComponent,
    ViewPackagesComponent,
    ViewCustomersComponent,
    PackageToCustomerComponent,
    ExpenseComponent,
    ViewCustomerPlanComponent,
    EditCustomerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    FormsModule,
    MatSnackBarModule,
    HttpClientModule,
    MatListModule,
    MatSidenavModule,
    NgIf, NgFor,
    MatMenuModule,
    RouterModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatRadioModule,
  ],
  providers: [AuthInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
