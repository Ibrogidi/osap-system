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
        this.sortedArray.forEach( (data:any)=>{
          
          // console.log(data.questionnaires)
          this.questionLists = data.questionnaires;
          this.questionLists.forEach((qdata:any)=>{
            // console.log(qdata)
            // this.addResponses(qdata);
          })
        })
        // console.log(this.loopSortedArray(this.sortedArray))
      });

      
    this.surveyFillForm = this.fb.group({
      survey_id: this.surveyIndex,
      responses: this.fb.array([{}]),
    });

    })



  }

// auditResponse(obj: any){
//   return this.fb.group({
//     questionnaire_id: obj.id,
//     response_choice: ['', []],
//     response_date: ['', []],
//     response_time: ['', []],
//     response_text: ['', []],
//     response_integer: ['', []],
//     response_decimal: ['', []],
//   })
// }

//   addResponses(obj: any[]){
// this.responses.push(this.auditResponse(obj))
//   }
//   newQuestion(): FormGroup {
//     return this.fb.group({
//       questionnaire_id: this.qId,
//       response_choice: ['', []],
//       response_date: ['', []],
//       response_time: ['', []],
//       response_text: ['', []],
//       response_integer: ['', []],
//       response_decimal: ['', []],
//     })
//   }
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

  }




}
