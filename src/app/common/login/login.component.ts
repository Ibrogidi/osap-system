import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  forms: FormGroup;
  invalidLogin: boolean = false;
  constructor(
    private fb: FormBuilder,
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
console.log(this.forms.value)
    
  }

}
