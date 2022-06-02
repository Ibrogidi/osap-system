import { NavbarService } from './../../../core/services/mockservices/navbar.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'


@Component({
  selector: 'researcher-dashboard',
  templateUrl: './researcher-dashboard.component.html',
  styleUrls: ['./researcher-dashboard.component.css']
})
export class ResearcherDashboardComponent implements OnInit {
  value: any = "over";
  isHandset: boolean = false;
  title: string = "OSAP";
  isAdminLogged: boolean = true;
  token: any;
  username:string;
  researcherToken:any;
  displayedColumns: string[] = ['Survey', 'Status', 'Created at', 'Expired at','isActive'];
  surveyLists: object[];
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private navebarService: NavbarService,
    ) {
   
   }

  ngOnInit(): void {
    this.token = localStorage.getItem('Researcher');
    this.researcherToken = "Token "+this.token;
    this.authService.getUser(this.researcherToken).subscribe((researcher:any)=>{
      this.username = researcher?.username;
    });
    this.authService.getSurveyData(this.researcherToken).subscribe((surveyData:any)=>{
      this.surveyLists= surveyData;
    })
  }


  logout(){
this.navebarService.changeResearcherStatus(false);
this.authService.logOut(this.token);
this.router.navigate(['/login'])

  }
 

}
