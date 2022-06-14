import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { NavbarService } from 'src/app/core/services/mockservices/navbar.service';

import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}


@Component({
  selector: 'app-analyze-survey',
  templateUrl: './analyze-survey.component.html',
  styleUrls: ['./analyze-survey.component.css']
})

export class AnalyzeSurveyComponent implements OnInit {
  surveyIndex: any;
  token: any;
  researcherToken: any;
  value: any = "over";
  username: any;
  surveyData: any;
  analyzedData: any;
  panelOpenState = false;
  choiceLable: Label[] = [];
  choiceResponseData: SingleDataSet = [];
arrayVal = [10,12,7,79]
max:number;
  tiles: Tile[] = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'two', cols: 1, rows: 2, color: 'lightpink' },
    { text: 'three', cols: 2, rows: 1, color: '#DDBDF1' },
  ];

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['a', 'b', 'c'];
  public pieChartData: SingleDataSet = [3, 1, 1];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  constructor(
    private authService: AuthService,
    private routerActive: ActivatedRoute,
    private router: Router,
    private navebarService: NavbarService,

  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();

  }

  ngOnInit(): void {
    this.routerActive.paramMap.subscribe((result) => {
      // console.log(result)
      this.surveyIndex = result.get('id');
      console.log(this.surveyIndex)
      this.token = localStorage.getItem('Researcher');
      this.researcherToken = "Token " + this.token;
      this.authService.getAnalyzedData(this.researcherToken, this.surveyIndex).subscribe((analyzedData) => {
        console.log(analyzedData);
        this.analyzedData = analyzedData;
        this.analyzedData.questionnaires.forEach((question: any) => {
          if (question.questionnaire_type === 'Check box') {
            question.choices.forEach((choiceVal: any) => {
              this.choiceLable.push(choiceVal.name);
              this.choiceResponseData.push(choiceVal.total_selected)


            });
          }
        });
      })
    });
    this.authService.getUser(this.researcherToken).subscribe((researcher: any) => {
      this.username = researcher?.username;
      // console.log("researcher:", researcher)

    });
    this.authService.getServeyId(this.researcherToken, this.surveyIndex).subscribe((surveyData) => {
      console.log(surveyData)
      this.surveyData = surveyData;
    })

  }


  logout() {
    this.navebarService.changeResearcherStatus(false);
    this.authService.logOut(this.token);
    this.router.navigate(['/login'])

  }


  log(value: any) {
    console.log(value);
  }

  minVal(intVal: number[]){
    this.max = intVal.reduce((a, b)=>Math.max(a, b));
    console.log(this.max)
  }
  
}
