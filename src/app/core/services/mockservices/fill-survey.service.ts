import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FillSurveyService {

  surveyIndex: number;

  changeSurveyIndex( value: number){
    this.surveyIndex = value;
  }
}
