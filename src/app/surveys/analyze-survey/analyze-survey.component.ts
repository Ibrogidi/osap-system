import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { NavbarService } from 'src/app/core/services/mockservices/navbar.service';
// import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
// import { Label } from 'ng2-charts';

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
  analyzedData:any;
  panelOpenState = false;

  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'two', cols: 1, rows: 2, color: 'lightpink'},
    {text: 'three', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
  constructor(
    private authService: AuthService,
    private routerActive: ActivatedRoute,
    private router: Router,
    private navebarService: NavbarService,
  ) { 

  }

  ngOnInit(): void {
    this.routerActive.paramMap.subscribe((result)=>{
      // console.log(result)
      this.surveyIndex = result.get('id');
      console.log(this.surveyIndex)
      this.token = localStorage.getItem('Researcher');
      this.researcherToken = "Token " + this.token;
      this.authService.getAnalyzedData(this.researcherToken,this.surveyIndex).subscribe((analyzedData)=>{
        console.log(analyzedData);
        this.analyzedData = analyzedData;
      })
    });
    this.authService.getUser(this.researcherToken).subscribe((researcher:any)=>{
      this.username = researcher?.username;
      // console.log("researcher:", researcher)
      
    });
    this.authService.getServeyId(this.researcherToken, this.surveyIndex).subscribe((surveyData)=>{
      console.log(surveyData)
      this.surveyData = surveyData;
    })

  }

  
  logout(){
    this.navebarService.changeResearcherStatus(false);
    this.authService.logOut(this.token);
    this.router.navigate(['/login'])
    
      }


}
