import { AuthService } from 'src/app/core/services/auth.service';
import { Component, VERSION } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';


///////////////////////////////////////////////////////////////////////////////////
// import { Questions } from './../../core/models/questions.interface';
// import { Choices } from './../../core/models/choices.interface';
// import { QuestionType } from './../../core/models/question-type.interface';
// import { Occupations } from './../../core/models/occupations.interface';
// import { EducationLevels } from './../../core/models/education-levels.interface';
// import { AuthService } from './../../core/services/auth.service';
// import {
//   Component,
//   OnInit,
// } from '@angular/core';

import {  Validators } from '@angular/forms';
import { Gender } from 'src/app/core/models/gender.interface';

import { Survey } from 'src/app/core/models/survey.interface';
import { Sections } from 'src/app/core/models/sections.interface';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Choices } from '../core/models/choices.interface';
import { Questions } from '../core/models/questions.interface';
import { Occupations } from '../core/models/occupations.interface';
import { QuestionType } from '../core/models/question-type.interface';
import { EducationLevels } from '../core/models/education-levels.interface';









@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})


export class ExampleComponent {
  empForm: FormGroup;
  sectionForm: FormGroup;



  constructor(private fb: FormBuilder, private auth: AuthService) {

   }

  ngOnInit() {
    this.empForm = this.fb.group({
      employees: this.fb.array([])
    });

    this.sectionForm = this.fb.group({
      sections: this.fb.array([])
    })
    this.auth.getQuestionType().subscribe( (result: any)=> {
      console.log(result)
    })
 }

  /////////////////////////////step 1/////////////////////////
  employees(): FormArray {
    return this.empForm.get('employees') as FormArray;
  }
  sections(): FormArray {
    return this.sectionForm.get('sections') as FormArray;
  }

  employeeSkills(empIndex: number): FormArray {
    return this.employees()
      .at(empIndex)
      .get('skills') as FormArray;
  }

  questionnaires(secIndex: number): FormArray {
    return this.sections()
      .at(secIndex)
      .get('questionnaires') as FormArray;
  }
  choices(secIndex:number,questionIndex: number): FormArray {
    return this.questionnaires(secIndex).at(questionIndex).get('choices') as FormArray;
  }
  ////////////////////////////////////step 2///////////////////////////////////////

  newEmployee(): FormGroup {
    return this.fb.group({
      firstName: '',
      lastName: '',
      skills: this.fb.array([])
    });
  }
  newSection(): FormGroup {
    return this.fb.group({
      title: '',
      description: '',
      order: '',
      questionnaires: this.fb.array([])
    })
  }


  newSkill(): FormGroup {
    return this.fb.group({
      skill: '',
      exp: ''
    });
  }

  newQuestions(): FormGroup {
    return this.fb.group({
      title: '',
      description: '',
      is_required: '',
      questionnaire_type: '',
      choices: this.fb.array([]),
      maximum_choice: '',
      minimum_integer_value: '',
      maximum_integer_value: '',
      minimum_decimal_value: '',
      maximum_decimal_value: '',
    })
  }
  newChoices(): FormGroup {
    return this.fb.group({
      name: '',
      next_section: '',
    })
  }

  /////////////////////////step 3//////////////////////////////////////////////////////////

  addEmployee() {
    this.employees().push(this.newEmployee());
  }
  addSection() {
    this.sections().push(this.newSection());
  }

  addEmployeeSkill(empIndex: number) {
    this.employeeSkills(empIndex).push(this.newSkill());
  }

  addQuestion(secIndex: number) {
    this.questionnaires(secIndex).push(this.newQuestions());
  }
  addChoice(secIndex: number,questionIndex:number) {
    this.choices(secIndex,questionIndex).push(this.newChoices())
  }

  ////////////////////////////////////step 4 ////////////////////////////////////////////////

  removeEmployee(empIndex: number) {
    this.employees().removeAt(empIndex);
  }

  removeSection(secIndex: number) {
    this.sections().removeAt(secIndex);
  }


  removeEmployeeSkill(empIndex: number, skillIndex: number) {
    this.employeeSkills(empIndex).removeAt(skillIndex);
  }

  removeQuestion(secIndex: number, questionIndex: number) {

    this.questionnaires(secIndex).removeAt(questionIndex);

  }

removeChoice(secIndex:number,questionIndex: number){
  this.choices(secIndex,questionIndex).removeAt(questionIndex)
}

  onSubmit() {
    console.log(this.empForm.value);
    console.log(this.sectionForm.value);
  }


}



