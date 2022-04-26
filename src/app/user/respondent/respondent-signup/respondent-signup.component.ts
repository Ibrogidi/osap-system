import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Animal {
  name: string;
}

@Component({
  selector: 'app-respondent-signup',
  templateUrl: './respondent-signup.component.html',
  styleUrls: ['./respondent-signup.component.css']
})
export class RespondentSignupComponent implements OnInit {

forms: FormGroup;
genderVal: string;
animals: Animal[] = [
  {name: 'Male'},
  {name: 'Female'},

];
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
      gender_opt: ['',[Validators.required]],
      datepicker: ['',[Validators.required]],
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
  get gender_opt() {
    return this.forms.get('gender_opt');
  }
  get datepicker() {
    return this.forms.get('datepicker');
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
