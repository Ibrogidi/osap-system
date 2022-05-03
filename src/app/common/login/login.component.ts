import { HttpErrorHandler } from './../../core/services/http-error-handler.service';
import { AuthorizeUsers } from './../../core/models/authorize-users.interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  forms: FormGroup;
  invalidLogin: boolean = false;
  tokenValue: String;
  userObj: any;
  errorMessage: String;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private errorHandler: HttpErrorHandler,
  ) { }

  ngOnInit(): void {
    this.forms = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  get email() {
    return this.forms.get('email');
  }

  get password() {
    return this.forms.get('password');
  }


  onSubmit() {
    console.log(this.forms.value, this.forms.valid);
    if (this.forms.valid) {
      // console.log('error handler: ',this.errorHandler.myError)
      this.auth.login(this.forms.value).subscribe(
       
        (tokenObj: any) => {

          this.tokenValue = "Token " + tokenObj.auth_token;
          console.log(this.tokenValue);

          this.auth.getUser(this.tokenValue).subscribe(
            (response: any) => {
              this.userObj = response;
              console.log(this.userObj.roll)
              if (this.userObj.roll === "Researcher") {
                //storing token on local storage
                localStorage.setItem('Researcher', tokenObj.auth_token);
                this.router.navigate(['/researcher/dashboard'])
              }

              // if(this.userObj.roll ==="Respondent"){

              // }
              // if(this.userObj.roll === "Admin"){

              // }

            },(error) =>{
              console.log("error 1: ",error)
              // console.log("error 2: ", this.errorHandler.myError)
            if(error.status===401){
              this.errorMessage = "Incorrect username or password";
              this.invalidLogin = true;
            }
            else{
              this.errorMessage = "Unknown error occured. Please check your internet connection and try again."
              this.invalidLogin = true;
            }
            }
          )

        }
        
        

      )
    }

  }

}
