import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
@Component({
  selector: 'researcher-signup',
  templateUrl: './researcher-signup.component.html',
  styleUrls: ['./researcher-signup.component.css']
})

export class ResearcherSignupComponent implements OnInit {

  forms: FormGroup;

  constructor(
    private fb: FormBuilder, private authService: AuthService
  ) {

  }

  ngOnInit(): void {
    this.forms = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      first_name: ['', [Validators.required, Validators.maxLength]],
      last_name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.maxLength]],
      // confirmpassword: ['', [Validators.required,Validators.pattern]],
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
  // get confirmpassword() {
  //   return this.forms.get('confirmpassword');
  // }

  onSubmit() {
    // console.log(this.forms.value,this.forms.valid);
    this.authService.register(this.forms.value)
      .subscribe(result => console.log(result))

  }

}
