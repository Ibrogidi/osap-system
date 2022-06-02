import { Sections } from './../../core/models/sections.interface';
import { FillSurveyService } from './../../core/services/mockservices/fill-survey.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'fill-survey',
  templateUrl: './fill-survey.component.html',
  styleUrls: ['./fill-survey.component.css']
})
export class FillSurveyComponent implements OnInit {
surveyIndex :number;
surveyLists: any[];
sectionList :any[];
questionLists: any[];
sortedArray:any[];
token :any;
respondentToken:any;
response_choice: string[];

  constructor(
    private fillSurveyService: FillSurveyService,
    private authService: AuthService,
    private fb: FormBuilder,
  ) { 


  }

  ngOnInit(): void {
    this.surveyIndex = this.fillSurveyService?.surveyIndex;
    this.token = localStorage.getItem('Respondent');
    this.respondentToken = "Token "+this.token;
    this.authService.getSurveyData(this.respondentToken).subscribe((surveyData:any)=>{
      this.surveyLists= surveyData;
      console.log(this.surveyLists[this.surveyIndex])
      this.sectionList= this.surveyLists[this.surveyIndex].sections
      console.log(this.sectionList)
      // this.questionLists = this.sectionList.quest
  // console.log(this.questionLists)
    this.sortedArray = this.sectionList?.sort((obj1:any, obj2:any) => {
      if (obj1.order > obj2.order) {
          return 1;
      }
    
      if (obj1.order < obj2.order) {
          return -1;
      }
    
      return 0;
    });
    console.log(this.sortedArray)
  
  
    });

    
// this.sectionList = this.surveyLists[this.surveyIndex]?.section;
// console.log(this.sectionList);
  }
  



  


}
