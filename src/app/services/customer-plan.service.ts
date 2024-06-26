import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CustomerPlanService {

  constructor(private _http:HttpClient) { }

  //add new customer plan
  public saveCustomerPlan(customerplan:any) {
    return this._http.post(`${baseUrl}/customer-plan/save`,customerplan);
  }

  //add new customer plan
  public updateCustomerPlan(customerplan:any) {
    return this._http.put(`${baseUrl}/customer-plan/update`,customerplan);
  }

  //load customer plan
  public viewCustomerPlans(){
    return this._http.get(`${baseUrl}/customer-plan/getList`);
  }

  public viewCustomerPlansActive(customerId: any){
    return this._http.get(`${baseUrl}/customer-plan/getList/status/${customerId}`);
  }

  public viewCustomerPlansHistory(customerId: any){
    return this._http.get(`${baseUrl}/customer-plan/geCustomerList/${customerId}`);
  }
}
