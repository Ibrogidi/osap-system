import { FillSurveyService } from './../../../core/services/mockservices/fill-survey.service';
import { Router } from '@angular/router';
import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'repondent-home',
  templateUrl: './repondent-home.component.html',
  styleUrls: ['./repondent-home.component.css']
})
export class RepondentHomeComponent implements OnInit {
  value: any = "over";
  isHandset: boolean = false;
  title: string = "OSAP";
  // isAdminLogged: boolean = true;
  token: any;
  username:any;
  respondentToken:any;
  displayedColumns: string[] = ['id','Survey', 'Created at', 'Expired at','Status','budget'];
  surveyLists: any[];
  surveySections: any[];
  isNoneLogged= false;
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
  constructor(
    private authService: AuthService,
    private router: Router,
    private fillSurveyService: FillSurveyService,
    ) {
   
   }

  ngOnInit(): void {
    this.token = localStorage.getItem('Respondent');
    this.respondentToken = "Token "+this.token;
    this.authService.getUser(this.respondentToken).subscribe((respondent:any)=>{
      this.username = respondent.username;
    })
    this.authService.getSurveyData(this.respondentToken).subscribe((surveyData:any)=>{
      this.surveyLists= surveyData;
      
      console.log(surveyData)
    });

  }
  logout(){
this.authService.logOut2(this.token);
this.router.navigate(['/login'])

  }
  fill(surveyIndex: number){
    this.fillSurveyService.changeSurveyIndex(surveyIndex)
    console.log(this.fillSurveyService.surveyIndex)
  }


}
