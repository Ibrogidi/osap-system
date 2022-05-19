import { Occupations } from './../../core/models/occupations.interface';
import { EducationLevels } from './../../core/models/education-levels.interface';
import { AuthService } from './../../core/services/auth.service';
import {
  Component,
  OnInit,
} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Gender } from 'src/app/core/models/gender.interface';

import { Survey } from 'src/app/core/models/survey.interface';
import { Sections } from 'src/app/core/models/sections.interface';

@Component({
  selector: 'create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})
export class CreateSurveyComponent implements OnInit {
  panelOpenState = false;

  modeValue: any = "side"
  isPaid: boolean = false;
  x: string = "test 1";
  respondentNumber: number;
  minimumAge: number = 10;
  minDate: Date;
  budget: number;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  sections: Sections[] = [];
  occupations: Occupations[];
  surveys: Survey[] = [
    { name: 'payment free', value: false },
    { name: 'with payment', value: true },
  ];
  genderVal: string;
  genders: Gender[] = [
    { name: 'Male(only)', value: 'M' },
    { name: 'Female(only)', value: 'F' },
    { name: 'Both', value: 'both' },
  ];
  
  isEditable = false;
  educationLevels: EducationLevels[];
  constructor(private _formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDay();


    this.minDate = new Date(currentYear, currentMonth, currentDay + 8);

  }

  ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({
      survey_title: ['', Validators.required],
      description: ['', []],
      datePicker: ['', Validators.required],
      survey_type: ['', Validators.required],
      survey_budget: ['', [Validators.min]],
      respondent_number: ['', Validators.required],

    });
    this.secondFormGroup = this._formBuilder.group({
      gender: ['', Validators.required],
      maxAge: ['', [Validators.required, Validators.min, Validators.max]],
      education_level: ['', Validators.required],
      minAge: ['', [Validators.required, Validators.min, Validators.max]],
      occupation: ['', [Validators.required]],
      allow_unverified_respondents: ['', []],
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', []],
      section_title:['',[Validators.required]],
      section_description:['',[]],
      question_title:['',[]],
    });

    this.authService.getEducationLevels().subscribe(
      (result: any) => {
        this.educationLevels = result;
        console.log(this.educationLevels)
      }
    );

    this.authService.getOccupation().subscribe(
      (result: any) => {
        this.occupations = result;
        console.log(this.occupations)
      }
    );

  }


  get education_level() {
    return this.secondFormGroup.get('education_level')
  }
  get gender() {
    return this.secondFormGroup.get('gender');
  }
  get minAge() {
    return this.secondFormGroup.get('minAge');
  }
  get maxAge() {
    return this.secondFormGroup.get('maxAge')
  }
  get occupation() {
    return this.secondFormGroup.get('occupation');
  }


}
