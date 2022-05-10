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
passVal :string;
genderVal: string;
//birth_date: string;
dateVal: Date;
genders: Gender[] = [
  {name: 'Male', value: 'M'},
  {name: 'Female', value: 'F'},
];
maxDate: Date;
occupations: Occupations[];

educationLevels: EducationLevels[];
invalidLogin: boolean = false;
errorMessage: String;

regions: Region[] = [
  {name: 'None'},
  {name: 'Addis Ababa'},
  {name: 'Afar'},
  {name: 'Oromia'},
  {name: 'Amhara'},
  {name: 'Tigray'},
  {name: 'Somali'},
  {name: 'Sidama'},
  {name: 'Harari'},
  {name: 'Gambela'},
  {name: 'Benishangul-Gumuz'},
  {name: 'Dire Dawa'},
  {name: 'South West Ethiopia Peoples'},
  {name: 'Southern Nations Nationalities and Peoples'},


];

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    // private router: Router,
  ) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDay();
    
    console.log()
     this.maxDate = new Date(currentYear - 10, currentMonth, currentDay);//should be at least 10 year older

  }


  ngOnInit(): void {
    this.forms = this.fb.group({
      username: ['', [Validators.required]],
      first_name: ['', [Validators.required, Validators.maxLength]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['',[Validators.required]],   
      // birth_date: ['',[Validators.required]], 
      password: ['', [Validators.required, Validators.maxLength]],
    confirmpassword: ['', [Validators.required,Validators.pattern]],
      region: ['',[Validators.required]],
      education_level: ['',[Validators.required]],
      occupation: ['',[Validators.required]],
      city: ['',[]],
      phone_number: ['',[]],
      
  

      
    });

    this.authService.getOccupation().subscribe(
      (result:any) =>{
        this.occupations = result;
        console.log(this.occupations)
      }
    );
    this.authService.getEducationLevels().subscribe(
      (result:any)=>{
        this.educationLevels= result;
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

  // get birth_date() {
  //   return this.forms.get('birth_date')?.value.toGMTString();
  // }

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
    console.log(this.forms.value,this.forms.valid);
    // this.dateVal = this.datepicker?.value;
    // console.log(this.dateVal.getFullYear())
    // console.log(this.datepicker?.value.toDateString()) //7/5/1990
    // console.log(this.datepicker?.value.toGMTString()) //7/5/1990
    // console.log(this.datepicker?.value.toISOString()) //7/5/1990
    // console.log(this.datepicker?.value.toJSON()) //7/5/1990
    // console.log(this.datepicker?.value.toLocaleDateString()) //7/5/1990
    // console.log(this.datepicker?.value.toLocaleString()) //7/5/1990
    // console.log(this.datepicker?.value.toLocaleTimeString())
    // console.log(this.datepicker?.value.toString()) //7/5/1990
    // console.log(this.datepicker?.value.toTimeString()) //7/5/1990
    // console.log(this.datepicker?.value.toUTCString())
    // console.log(this.datepicker.getDate())
    // console.log(this.datepicker?.value.getDay())
    // console.log(this.datepicker.value.getFullYear())
    // console.log(this.datepicker?.value.getMonth())
    // console.log(this.datepicker?.value.getUTCDate())
    // console.log(this.datepicker?.value.getUTCDay())
    // console.log(this.datepicker?.value.getUTCFullYear())
    // console.log(this.datepicker?.value.getYear())
    if(this.password?.value !== this.confirmpassword?.value){
      this.errorMessage = "password don't match";
      this.invalidLogin = true;

    }
    else{
          this.authService.register2(this.forms.value)
      .subscribe(
        (result) => {
          console.log(result)
        //  this.router.navigate(['login']);          
        })

    }
    // console.log(this.datepicker?.value.toDateString())
    
    // this.authService.register2(this.forms.value)
    //   .subscribe(
    //     (result) => {
    //       console.log(result)
    //       this.router.navigate(['login']);          
    //     })

  }

}
