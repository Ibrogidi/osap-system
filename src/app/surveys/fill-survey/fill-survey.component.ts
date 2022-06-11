import { ActivatedRoute, Router } from '@angular/router';
import { Sections } from './../../core/models/sections.interface';
import { FillSurveyService } from './../../core/services/mockservices/fill-survey.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'fill-survey',
  templateUrl: './fill-survey.component.html',
  styleUrls: ['./fill-survey.component.css']
})
export class FillSurveyComponent implements OnInit {
  surveyIndex: any;
  surveyLists: any;
  sectionList: any;

  questionLists: any[];
  questionObj: any[];
  sortedArray: any[];
  token: any;
  respondentToken: any;
  response_choice: string[];
  surveyFillForm: FormGroup;
  qId: number;

  constructor(
    private fillSurveyService: FillSurveyService,
    private authService: AuthService,
    private fb: FormBuilder,
    private routerActive: ActivatedRoute,
  ) {


  }
  setQId(value: number) {
    // console.log(value);
    this.qId = value;
    // console.log(this.qId)
  }
  ngOnInit(): void {
    // this.surveyIndex = this.fillSurveyService?.surveyIndex;

    // this.authService.getSurveyData(this.respondentToken).subscribe((surveyData:any)=>{
    //   this.surveyLists= surveyData;
    //   console.log(this.surveyLists[this.surveyIndex])
    //   this.sectionList= this.surveyLists[this.surveyIndex].sections
    //   console.log(this.sectionList)

    // this.sortedArray = this.sectionList?.sort((obj1:any, obj2:any) => {
    //   if (obj1.order > obj2.order) {
    //       return 1;
    //   }

    //   if (obj1.order < obj2.order) {
    //       return -1;
    //   }

    //   return 0;
    // });
    // console.log(this.sortedArray)
    // });


    // this.sectionList = this.surveyLists[this.surveyIndex]?.section;
    // console.log(this.sectionList);


    // console.log(this.surveyIndex);



    this.routerActive.paramMap.subscribe((param) => {
      // console.log(param.get('id'))
      this.surveyIndex = param.get('id');
      this.token = localStorage.getItem('Respondent');
      this.respondentToken = "Token " + this.token;

      this.authService.getServeyId(this.respondentToken, this.surveyIndex).subscribe((surveyData: any) => {
        // console.log(surveyData)
        this.surveyLists = surveyData;
        this.sectionList = this.surveyLists.sections
        // console.log(this.sectionList)

        this.sortedArray = this.sectionList?.sort((obj1: any, obj2: any) => {
          if (obj1.order > obj2.order) {
            return 1;
          }

          if (obj1.order < obj2.order) {
            return -1;
          }

          return 0;
        });
        // console.log(this.sortedArray)
        this.sortedArray.forEach((data: any) => {

          // console.log(data.questionnaires)
          this.questionLists = data.questionnaires;
        //  console.log(this.questionLists)
          this.questionLists.forEach((qdata: any) => {
            // console.log(qdata.questionnaire_type.type_name)
            // console.log(qdata)
            this.addResponses(qdata.questionnaire_type.type_name)
            // this.addResponses(qdata);
          })
        })
        // console.log(this.loopSortedArray(this.sortedArray))
      });


      this.surveyFillForm = this.fb.group({
        survey_id: this.surveyIndex,
        responses: this.fb.array([]),
      });

    })



  }

  //////////////////////////////step 1////////////////////////////
  responses1(): FormArray {
    return this.surveyFillForm.get('responses') as FormArray;
  }
  /////////////////////step 2/////////
  newText(): FormGroup {
    return this.fb.group({
      questionnaire_id: '',
      response_text: '',
    })
  }

  newDate(): FormGroup {
    return this.fb.group({
      questionnaire_id: '',
      response_date: '',
    })
  }
  newTime(): FormGroup {
    return this.fb.group({
      questionnaire_id: '',
      response_time: '',
    })
  }

  newInteger(): FormGroup {
    return this.fb.group({
      questionnaire_id: '',
      response_integer: '',
    })
  }
  newDecimal(): FormGroup {
    return this.fb.group({
      questionnaire_id: '',
      response_decimal: '',
    })
  }
  newChoices(): FormGroup {
    return this.fb.group({
      questionnaire_id: '',
      response_choice: this.fb.array([]),
    })
  }
  ////////////////////////////step 3/////////////////////////
  addResponses(response: any) {
    // this.sections1().push(this.newSection());
    if (response == 'Short answer' || response == 'Paragraph') {
  //  console.log('text clicked')
      this.responses1().push(this.newText());

    }
    if (response === 'Date') {
      this.responses1().push(this.newDate());

    }
    if (response === 'Time') {
      this.responses1().push(this.newTime());

    }
    if (response === 'Decimal') {
      this.responses1().push(this.newDecimal());

    }
    if (response === 'Integer') {
      this.responses1().push(this.newInteger());

    }
    if ((response === 'Multiple choice')||(response === 'Check box')|| (response === 'Drop down')) {
      this.responses1().push(this.newChoices());

    }

  }
///////////////////////////////////////////////////////////////////////////


  //////////////////////////////////////
  log(value: any) {
    console.log(value)
  }
  get surveyId() {
    return this.surveyFillForm.get('survey_id')
  }

  get responses(): FormArray {
    return this.surveyFillForm.get('responses') as FormArray
  }


  onSubmit() {
    console.log(this.surveyFillForm.value)
  }




}
