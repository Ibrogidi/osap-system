import { Router } from '@angular/router';
import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'researcher-signup',
  templateUrl: './researcher-signup.component.html',
  styleUrls: ['./researcher-signup.component.css']
})

export class ResearcherSignupComponent implements OnInit {


  confirmPasswordClass: string = 'form-control';
  forms: FormGroup;
  passVal: string;
  invalidLogin: boolean = false;
  errorMessage: string;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.forms = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      first_name: ['', [Validators.required, Validators.maxLength, Validators.pattern('[A-Z][a-z]{2,50}')]],
      last_name: ['', [Validators.required],  Validators.pattern('[A-Z][a-z]{2,50}')],
      password: ['', [Validators.required, Validators.maxLength]],
      confirmpassword: ['', [Validators.required]],
    });
  }

  get email() {
    return this.forms.get('email');
  }

  get password() {
    return this.forms.get('password');
  }

  get username() {
    return this.forms.get('username');
  }

  get first_name() {
    return this.forms.get('first_name');
  }

  get last_name() {
    return this.forms.get('last_name');
  }
  get confirmpassword() {
    return this.forms.get('confirmpassword');
  }



  onSubmit() {
    console.log(this.forms.value, this.forms.valid);
    console.log(this.password?.value, " ", this.confirmpassword?.value);
    if (this.password?.value === this.confirmpassword?.value) {
this.invalidLogin = false;

      this.authService.register(this.forms.value)
        .subscribe(
          (result) => {
            console.log(result)
            this.router.navigate(['/login']);


          }, (error: any) => {

console.log('myerrror',error)

          }

        )



    }
    else {
      this.errorMessage = "password and confirm password didn't match";
      this.invalidLogin = true;
    }


  }

}
