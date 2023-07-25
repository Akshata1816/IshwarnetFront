import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private _http:HttpClient) { }

  //add new customer
  public addCustomer(customer:any) {
    return this._http.post(`${baseUrl}/customer/add`,customer);
  }

  //load customer
  public viewCustomers(){
    return this._http.get(`${baseUrl}/customer/getAll`);
  }
}
