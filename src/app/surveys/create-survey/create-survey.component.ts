import { Questions } from './../../core/models/questions.interface';
import { Choices } from './../../core/models/choices.interface';
import { QuestionType } from './../../core/models/question-type.interface';
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

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
@Component({
  selector: 'create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})
export class CreateSurveyComponent implements OnInit {
  choices: Choices[] = [
    { name: 'Option ' },
  ];

  choices2: Choices[] = [
    { name: 'Option' }
  ];

  choices3: Choices[] = [
    { name: 'Option' }
  ];
  choices4: Choices[] = [
    { name: 'Option' }
  ];
  choices5: Choices[] = [
    { name: 'Option' }
  ];
questions: Questions[] = [
{title: 'Untitled Question', choice_type: 
[
    {
        id: 1,
        type_name: "Multiple choice"
    },
    {
        id: 2,
        type_name: "Drop down"
    },
    {
        id: 3,
        type_name: "Check box"
    },
    {
        id: 4,
        type_name: "Integer"
    },
    {
        id: 5,
        type_name: "Decimal"
    },
    {
        id: 6,
        type_name: "Date"
    },
    {
        id: 7,
        type_name: "Time"
    },
    {
        id: 8,
        type_name: "Short answer"
    },
    {
        id: 9,
        type_name: "Paragraph"
    }
]}
];
  matIconArray: String[] = ['radio_button_unchecked', 'arrow_drop_down', 'check_box_outline_blank', 'tag', 'fiber_manual_record', 'calendar_today', 'timer', 'short_text', 'subject']
  panelOpenState = false;
  choiceMode: string;
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
  checkQuestionType: any;
  questionType: QuestionType[];
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
      section_title: ['', [Validators.required]],
      section_description: ['', []],
      question_title: ['', []],
      question_type: ['', []],
      choices: ['', []],
      maxChoice: ['', []],
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
    )


    this.authService.getQuestionType().subscribe(
      (result: any) => {
        this.questionType = result;
        console.log(this.questionType);
      }
    )

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
  get questionnaireType() {
    return this.thirdFormGroup.get('question_type')
  }

  drop(event: CdkDragDrop<Choices[]>) {
    moveItemInArray(this.choices, event.previousIndex, event.currentIndex);
  }

  drop2(event: CdkDragDrop<Choices[]>) {
    moveItemInArray(this.choices2, event.previousIndex, event.currentIndex);
  }

  drop3(event: CdkDragDrop<Choices[]>) {
    moveItemInArray(this.choices3, event.previousIndex, event.currentIndex);
  }
  drop4(event: CdkDragDrop<Choices[]>) {
    moveItemInArray(this.choices4, event.previousIndex, event.currentIndex);
  }
  drop5(event: CdkDragDrop<Choices[]>) {
    moveItemInArray(this.choices5, event.previousIndex, event.currentIndex);
  }
  
  addOption() {
    this.choices.push(
      {
        name: 'Option'
      }
    )
  }
  addOption2() {
    this.choices2.push(
      {
        name: 'Option'
      }
    )
  }
  addOption3() {
    this.choices3.push(
      {
        name: 'Option'
      }
    )
  }
  addOption4() {
    this.choices4.push(
      {
        name: 'Option'
      }
    )
  }
  addOption5() {
    this.choices5.push(
      {
        name: 'Option'
      }
    )
  }
  deleteTask(i: number) {
    this.choices.splice(i, 1);
  }
  deleteTask2(i: number) {
    this.choices2.splice(i, 1);
  }
  deleteTask3(i: number) {
    this.choices3.splice(i, 1);
  }
  deleteTask4(i: number) {
    this.choices4.splice(i, 1);
  }
  deleteTask5(i: number) {
    this.choices5.splice(i, 1);
  }

addQuestion(){
  this.questions.push(
    {title: 'Untitled Question', choice_type: 
[
    {
        id: 1,
        type_name: "Multiple choice"
    },
    {
        id: 2,
        type_name: "Drop down"
    },
    {
        id: 3,
        type_name: "Check box"
    },
    {
        id: 4,
        type_name: "Integer"
    },
    {
        id: 5,
        type_name: "Decimal"
    },
    {
        id: 6,
        type_name: "Date"
    },
    {
        id: 7,
        type_name: "Time"
    },
    {
        id: 8,
        type_name: "Short answer"
    },
    {
        id: 9,
        type_name: "Paragraph"
    }
]}
  )
}

}
