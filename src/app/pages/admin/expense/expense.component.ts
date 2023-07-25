import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent {

  expense = {
    expense_name : '',
    amount : '',
    expenseDate : '',
  }

  constructor(private _expense : ExpenseService, private _snack : MatSnackBar){}

  formSubmit(){
    if(this.expense.expense_name.trim() == '' || this.expense.expense_name==null)
    {
      this._snack.open("Please fill the Expense Name !!","Ok",{
        duration:3000
      });
      return;
    }
    if(this.expense.amount==null)
    {
      this._snack.open("Please fill the Amount !!","Ok",{
        duration:3000
      });
      return;
    }


    this._expense.addexpenses(this.expense).subscribe(
      (data:any)=>
      {
        this.expense.expense_name = '',
        this.expense.amount = '',
        this.expense.expenseDate = '',
        this._snack.open("Package is added Successfuly !!","Ok",{
          duration:4000
        });
      },
      (error:any)=>
      {
        console.log(error);
        this._snack.open("Error to add Expense","Ok",{
          duration:3000
        });
      }
    )
  }
}
