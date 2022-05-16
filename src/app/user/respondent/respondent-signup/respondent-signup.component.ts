import { ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { EducationLevels } from './../../../core/models/education-levels.interface';
import { Observable } from 'rxjs';

import { Occupations } from './../../../core/models/occupations.interface';
import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

interface Gender {
  name: string;
  value: string;
}
interface Region {
  name: string;
}


@Component({
  selector: 'app-respondent-signup',
  templateUrl: './respondent-signup.component.html',
  styleUrls: ['./respondent-signup.component.css']
})
export class RespondentSignupComponent implements OnInit {

  forms: FormGroup;
  passVal: string;
  
  hide2:boolean= true;
  //birth_date: string;
  genderVal: string;
  genders: Gender[] = [
    { name: 'Male', value: 'M' },
    { name: 'Female', value: 'F' },
  ];
  maxDate: Date;
  minDate: Date;
  birthYear: Date;
  birthMonth: Date;
  birthDay: Date;
  birthDate: string;
  occupations: Occupations[];

  educationLevels: EducationLevels[];
  invalidLogin: boolean = false;
  errorMessage: String;

  regions: Region[] = [
    { name: 'None' },
    { name: 'Addis Ababa' },
    { name: 'Afar' },
    { name: 'Oromia' },
    { name: 'Amhara' },
    { name: 'Tigray' },
    { name: 'Somali' },
    { name: 'Sidama' },
    { name: 'Harari' },
    { name: 'Gambela' },
    { name: 'Benishangul-Gumuz' },
    { name: 'Dire Dawa' },
    { name: 'South West Ethiopia Peoples' },
    { name: 'Southern Nations Nationalities and Peoples' },


  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
     private router: Router,
  ) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDay();


    this.maxDate = new Date(currentYear - 10, currentMonth, currentDay);//should be at least 10 year older
    this.minDate = new Date(currentYear - 100, currentMonth, currentDay);
  }


  ngOnInit(): void {
    this.forms = this.fb.group({
      username: ['', [Validators.required]],
      first_name: ['', [Validators.required, Validators.maxLength, Validators.pattern("[A-Za-z]{2,50}")]],
      last_name: ['', [Validators.required, Validators.pattern("[A-Za-z]{2,50}")]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required]],
      datePicker: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.maxLength]],
      confirmpassword: ['', [Validators.required,Validators.pattern]],
      region: ['', [Validators.required]],
      education_level: ['', [Validators.required]],
      occupation: ['', [Validators.required]],
      city: ['', []],
      phone_number: ['', [Validators.pattern("[0-9]{9,16}")]],




    });

    this.authService.getOccupation().subscribe(
      (result: any) => {
        this.occupations = result;
        console.log(this.occupations)
      }
    );
    this.authService.getEducationLevels().subscribe(
      (result: any) => {
        this.educationLevels = result;
        console.log(this.educationLevels)
      }
    )


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

  get email() {
    return this.forms.get('email');
  }

  get gender() {
    return this.forms.get('gender');
  }

  get datePicker() {
    return this.forms.get('datePicker');
  }

  get password() {
    return this.forms.get('password');
  }

  get confirmpassword() {
    return this.forms.get('confirmpassword');
  }


  get region() {
    return this.forms.get('region');
  }

  get education_level() {
    return this.forms.get('education_level');
  }

  get occupation() {
    return this.forms.get('occupation');
  }

  get city() {
    return this.forms.get('city');
  }
  get phone_number() {
    return this.forms.get('phone_number');
  }



  onSubmit() {

    this.birthYear = this.datePicker?.value.getFullYear();
    // console.log(this.birthYear)
    this.birthMonth = this.datePicker?.value.getMonth() + 1;
    // console.log(this.birthMonth)
    this.birthDay = this.datePicker?.value.getDate()
    // console.log(this.birthDay)

    this.birthDate = this.birthYear.toString() + '-' + this.birthMonth.toString() + '-' + this.birthDay.toString();
    // console.log(this.birthDate)

    this.forms.value.birth_date = this.birthDate;
    // console.log(this.forms.value,this.forms.valid);


      
      this.authService.register2(this.forms.value)
        .subscribe(
          (result) => {
            // console.log(result)
             this.router.navigate(['login']);          
          },(error)=>{
            if (error.status === 400) {

              this.errorMessage = "username or email already exists."
              this.invalidLogin = true;
  
  
            }
            else {
              this.errorMessage = "Unknown error occured. Please check your internet connection and try again."
              this.invalidLogin = true;
            }
  
          }
          )
          

          

    }

  }



