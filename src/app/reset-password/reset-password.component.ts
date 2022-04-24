import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  forms: FormGroup;
  invalidLogin: boolean = false;
  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.forms = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  get email() {
    return this.forms.get('email');
  }



  onSubmit() {

    
  }

}
