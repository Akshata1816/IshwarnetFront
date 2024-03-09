import { AfterViewInit,Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PackageService } from 'src/app/services/package.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatButton } from '@angular/material/button';

export interface PackageData{
  id: number;
  plan_name: string;
  pin_rate: number;
  customer_amount: number;
  status: string;
  action: MatButton;
}

@Component({
  selector: 'app-view-packages',
  templateUrl: './view-packages.component.html',
  styleUrls: ['./view-packages.component.css'],
})
export class ViewPackagesComponent implements OnInit {
  packages : any;

  public displayColumn: string[]=['id','plan_name','pin_rate','customer_amount','status','action'];

  dataSource !: MatTableDataSource<PackageData>;


  //paginator
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  //Sort
  @ViewChild(MatSort) sort !: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  


  constructor(private _package:PackageService, private snack:MatSnackBar) {}

  ngOnInit(): void {
      
    this._package.viewpackage().subscribe((data:any)=>{
    this.packages = data;
    console.table(this.packages);
    this.dataSource= new MatTableDataSource(this.packages);
    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    },
    (error)=>{
    console.log(error);
    this.snack.open("Error !!"," Error in loading data !!");
    })
  }
}

