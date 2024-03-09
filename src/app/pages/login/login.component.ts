import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

constructor(private snack:MatSnackBar, private login:LoginService){}
// loginData : FormGroup | undefined;
loginData = {
  username: '',
  password:'',
};

ngOnInit(): void {
// this.loginData = new FormGroup({
//   username: new FormControl("", Validators.required),
//   password: new FormControl("", Validators.required),
// });


}

formSubmit(){
  console.log('login form submit');

  if(this.loginData.username.trim()=='' || this.loginData.username==null)
  {
    this.snack.open('Username is Required !!','', {
      duration:3000,
    });
    return;
  }
  if(this.loginData.password.trim()=='' || this.loginData.password==null)
  {
    this.snack.open('Password is Required !!','', {
      duration:3000,
    });
    return;
  }

  //request to server to genrate token
  this.login.generateToken(this.loginData).subscribe(
    (data:any)=>{
      console.log("Success");
      console.log(data);

      //Login
      this.login.loginUser(data.token);

      this.login.getCurrentUser().subscribe(
        (user:any)=>{
          this.login.setUser(user);
          console.log(user);

          //redirect to dashboard
          if(this.login.getUserRole()=="ROLE_ADMIN")
          {
              window.location.href='/dashboard'
              //this.login.loginStatusSubject.next(true);
          }
          else{
            this.login.logout();
          }

        }
      )
    },
    (error)=>{
      console.log("Error !!");
      console.log(error);
      this.snack.open("Invalid Username and Password !! Try Again !!");
      duration:3000;
    }
    );
  }
}
