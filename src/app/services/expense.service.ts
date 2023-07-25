import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private _http: HttpClient) { }

  //load expense
  public viewexpenses(){
    return this._http.get(`${baseUrl}/expense/getAll`);
  }

  //add expenses
  public addexpenses(expense:any){
    return this._http.post(`${baseUrl}/expense/add`, expense);
  }
}
