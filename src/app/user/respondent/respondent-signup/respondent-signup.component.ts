import { Router } from '@angular/router';
import { EducationLevels } from './../../../core/models/education-levels.interface';
import { Observable } from 'rxjs';

import { Occupations } from './../../../core/models/occupations.interface';
import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
genderVal: string;
genders: Gender[] = [
  {name: 'Male', value: 'M'},
  {name: 'Female', value: 'F'},

];
occupations: Occupations[];

educationLevels: EducationLevels[];

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
 

  }


  ngOnInit(): void {
    this.forms = this.fb.group({
      username: ['', [Validators.required]],
      first_name: ['', [Validators.required, Validators.maxLength]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      gender_opt: ['',[Validators.required]],   
      datepicker: ['',[Validators.required]],   
      // password: ['', [Validators.required, Validators.maxLength]],
  
      // region: ['',[Validators.required]],
      // education_levels: ['',[Validators.required]],
      // occupation: ['',[Validators.required]],
  
      // phonenumber: ['',[Validators.required]],
      // confirmpassword: ['', [Validators.required,Validators.pattern]],
    });
    // this.authService.getOccupation().subscribe( 
    //  ( result:any) =>{
    //     for(let r of result){
    //       console.log(r.work_type)
    //     }
    //   }
    // )
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

    get gender_opt() {
    return this.forms.get('gender_opt');
  }

  // get password() {
  //   return this.forms.get('password');
  // }



  // get region() {
  //   return this.forms.get('region');
  // }
  // get education_levels() {
  //   return this.forms.get('education_levels');
  // }
  get occupation() {
    return this.forms.get('occupation');
  }
  // get datepicker() {
  //   return this.forms.get('datepicker');
  // }
  // get city() {
  //   return this.forms.get('city');
  // }
  // get phonenumber() {
  //   return this.forms.get('phonenumber');
  // }
  // get confirmpassword() {
  //   return this.forms.get('confirmpassword');
  // }

  onSubmit() {
    console.log(this.forms.value,this.forms.valid);
    // this.authService.register2(this.forms.value)
    //   .subscribe(
    //     (result) => {
    //       console.log(result)
    //       this.router.navigate(['login']);          
    //     })

  }

}
