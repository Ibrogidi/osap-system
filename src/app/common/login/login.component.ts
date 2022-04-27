import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  forms: FormGroup;
  invalidLogin: boolean = false;
  tokenValue:String;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
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
if(this.forms.valid){
this.auth.login(this.forms.value).subscribe(
  (tokenObj:any)=>{
    //storing token on local storage
    localStorage.setItem('Token', tokenObj.auth_token);
    this.tokenValue= "Token "+tokenObj.auth_token;
    console.log(this.tokenValue);
   
    this.auth.getUser(this.tokenValue).subscribe(
      response => {
        console.log(response)
      }
    )

  }
)
}
    
  }

}
