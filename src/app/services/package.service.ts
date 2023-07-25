import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private _http:HttpClient) { }

  //load all packages
  public viewpackage() {
    return this._http.get(`${baseUrl}/plan/getAll`)
  }

  //add new package
  public addPackage(package1: any) {
    return this._http.post(`${baseUrl}/plan/add`, package1);
  }
}
