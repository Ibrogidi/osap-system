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

import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
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
  ////////////////////////////////////////hryyyyyyyyyyyyyyyyyyyyyyyyyyruuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
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
  questions: Questions[] =
    [
      {
        title: 'Untitled Question', choice_type:
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
          ]
      }
    ];
  sections: Sections[] = [
    {
      section_title: 'Section Title', questions:
        [
          {
            title: 'Untitled Question', choice_type:
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
              ]
          }
        ]
    }
  ];
  expiredYear: Date;
  expiredMonth: Date;
  expiredDay: Date;
  expiredDate: string;
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
  generalFormGroup: FormGroup;
  mergedObject: any;
  occupations: Occupations[];
  checked: boolean;
  token: any;
  researcherToken: any;
  surveys: Survey[] = [
    { name: 'payment free', value: false },
    { name: 'with payment', value: true },
  ];
  genderVal: string;
  genders: Gender[] = [
    { name: 'Male(only)', value: 'M' },
    { name: 'Female(only)', value: 'F' },
    { name: 'Both', value: 'Both' },
  ];
  checkQuestionType: any;
  questionType: QuestionType[];
  isEditable = false;
  educationLevels: EducationLevels[];
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  panelOpenState1 = false;
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthService
  ) {


  }

  ngOnInit() {

    this.authService.getQuestionType().subscribe(
      (result: any) => {
        this.questionType = result;
        console.log(this.questionType);
      }
    );

    // this.generalFormGroup = this._formBuilder.group({
    //   survey_title: ['', Validators.required],
    //   description: ['', []],
    //   datePicker: ['', Validators.required],
    //   survey_type: ['', Validators.required],
    //   survey_budget: ['', [Validators.min]],
    //   respondent_number: ['', Validators.required],
    //   gender: ['', Validators.required],
    //   maxAge: ['', [Validators.required, Validators.min, Validators.max]],
    //   education_level: ['', Validators.required],
    //   minAge: ['', [Validators.required, Validators.min, Validators.max]],
    //   occupation: ['', [Validators.required]],
    //   allow_unverified_respondents: ['', []],
    //   sections: this._formBuilder.array([]),
    // })
    this.firstFormGroup = this._formBuilder.group({
      title: ['', Validators.required],
      description: ['', []],
      expired_date: ['', Validators.required],
      is_paid: ['', Validators.required],
      budget: [0, [Validators.min]],
      required_number_of_respondent: ['', Validators.required],


    });
    this.secondFormGroup = this._formBuilder.group({

      requirements: this._formBuilder.group({
        gender: ['', Validators.required],
        maximum_age: ['', [Validators.required, Validators.min, Validators.max]],
        education_levels: ['', Validators.required],
        minimum_age: ['', [Validators.required, Validators.min, Validators.max]],
        occupations: ['', [Validators.required]],
        allow_unverified_respondents: [false, []],
      })
    });
    this.thirdFormGroup = this._formBuilder.group({
      sections: this._formBuilder.array([

      ])
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


  }


  get expired_date() {
    return this.firstFormGroup.get('expired_date')
  }
  get requirements() {
    return this.secondFormGroup.get('requirements')
  }
  get education_levels() {
    return this.secondFormGroup.get('requirements.education_levels')
  }
  get gender() {
    return this.secondFormGroup.get('requirements.gender');
  }
  get minimum_age() {
    return this.secondFormGroup.get('requirements.minimum_age');
  }
  get maximum_age() {
    return this.secondFormGroup.get('requirements.maximum_age')
  }
  get occupation1() {
    return this.secondFormGroup.get('requirements.occupations');
  }
  // get questionnaireType() {
  //   return this.thirdFormGroup.get('question_type')
  // }
  //////////////////////////step 1//////////////////////////////////
  sections1(): FormArray {
    return this.thirdFormGroup.get('sections') as FormArray;
  }

  questionnaires(secIndex: number): FormArray {
    return this.sections1()
      .at(secIndex)
      .get('questionnaires') as FormArray;
  }
  choices1(secIndex: number, questionIndex: number): FormArray {
    return this.questionnaires(secIndex).at(questionIndex).get('choices') as FormArray;
  }
  /////////////////////////////////step 2////////////////////////////////////
  newSection(): FormGroup {
    return this._formBuilder.group({
      title: '',
      description: '',
      order: 0,
      questionnaires: this._formBuilder.array([])
    })
  }


  newQuestions(): FormGroup {
    return this._formBuilder.group({
      title: '',
      description: '',
      is_required: false,
      questionnaire_type: '',
      choices: this._formBuilder.array([]),
      maximum_choice: 1,
      minimum_integer_value: 0,
      maximum_integer_value: 0,
      minimum_decimal_value: 0,
      maximum_decimal_value: 0,
    })
  }
  newChoices(): FormGroup {
    return this._formBuilder.group({
      name: '',
    })
  }

  // ///////////////////////////////////////////////step 3///////////////////////////////////////////////////
  addSection1() {
    this.sections1().push(this.newSection());
  }

  addQuestion1(secIndex: number) {
    this.questionnaires(secIndex).push(this.newQuestions());
  }
  addChoice(secIndex: number, questionIndex: number) {
    this.choices1(secIndex, questionIndex).push(this.newChoices())
  }

  //////////////////////////////////////step 4 ////////////////////////////////////////////////


  removeSection(secIndex: number) {
    this.sections1().removeAt(secIndex);
  }



  removeQuestion(secIndex: number, questionIndex: number) {

    this.questionnaires(secIndex).removeAt(questionIndex);

  }

  removeChoice(secIndex: number, questionIndex: number) {
    this.choices1(secIndex, questionIndex).removeAt(questionIndex)
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  log(value: any) {
    console.log(value)
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
  drop5(event: CdkDragDrop<Choices[]>, val1: number, val2: number) {
    moveItemInArray(this.choices5, event.previousIndex, event.currentIndex);
  }
  drop_questions(event: CdkDragDrop<Questions[]>, s: any) {
    moveItemInArray(this.sections[s].questions, event.previousIndex, event.currentIndex);
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

  addQuestion(s: number) {
    this.sections[s].questions.push(

      {
        title: 'Untitled Question', choice_type:
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
          ]
      }

    )
  }

  addSection() {
    this.sections.push({
      section_title: 'Section Title', questions:
        [
          {
            title: 'Untitled Question', choice_type:
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
              ]
          }
        ]

    })
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

  deleteQuestion(s: number, k: number) {
    this.sections[s].questions.splice(k, 1);
  }
  deleteSection(s: number) {
    this.sections.splice(s, 1)
  }



  onSubmit() {
    this.token = localStorage.getItem('Researcher');
    this.researcherToken = "Token " + this.token;
    this.expiredYear = this.expired_date?.value.getFullYear();
    // console.log(this.birthYear)
    this.expiredMonth = this.expired_date?.value.getMonth() + 1;
    // console.log(this.birthMonth)
    this.expiredDay = this.expired_date?.value.getDate()
    // console.log(this.birthDay)

    this.expiredDate = this.expiredYear.toString() + '-' + this.expiredMonth.toString() + '-' + this.expiredDay.toString();
    console.log(this.expiredDate)
    this.firstFormGroup.value.expired_date = this.expiredDate;
    console.log(this.thirdFormGroup.value)
    this.mergedObject = Object.assign(this.firstFormGroup.value, this.secondFormGroup.value, this.thirdFormGroup.value)
    console.log(this.mergedObject)
    this.authService.createSurvey(this.mergedObject, this.researcherToken).subscribe((result) => {
      console.log(result)
    })
  }

}
