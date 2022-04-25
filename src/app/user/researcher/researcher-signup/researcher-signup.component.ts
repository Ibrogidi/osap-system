import { Component, OnInit } from '@angular/core';





import { FormBuilder, FormGroup, Validators } from '@angular/forms'


@Component({
  selector: 'researcher-signup',
  templateUrl: './researcher-signup.component.html',
  styleUrls: ['./researcher-signup.component.css']
})
export class ResearcherSignupComponent implements OnInit {

  forms: FormGroup;
  invalidLogin: boolean = false;
  checked: boolean = false;
  // passVal: string;
  constructor(
    private fb: FormBuilder,
  ) {
   
   }

  ngOnInit(): void {
    this.forms = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      firstname: ['', [Validators.required,Validators.maxLength]],
      lastname: ['', [Validators.required]],
      password: ['', [Validators.required,Validators.maxLength]],
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
  get firstname() {
    return this.forms.get('firstname');
  }
  get lastname() {
    return this.forms.get('lastname');
  }
  // get confirmpassword() {
  //   return this.forms.get('confirmpassword');
  // }

  onSubmit() {
    console.log(this.forms.value,this.forms.valid);
    

    
  }

}
