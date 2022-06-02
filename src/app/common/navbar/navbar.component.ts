import { NavbarService } from './../../core/services/mockservices/navbar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
tooltip:string = "Online Survey Analyzer Platform";
respondentRouter: string = '/respondent/dashboard';
researcherRouter: string = '/researcher/dashboard'
isResearcher: boolean;
isRespondent: boolean;
isRespondentDashboard: boolean;
isResearcherDashboard: boolean;
isLogged: boolean ;
username:string;
token:any;
respondentToken: string;

active = 1;
  constructor(
    
    private navbarService: NavbarService,
    
  ) { }

  ngOnInit(): void {
    this.isLogged = this.navbarService.loginStatus;
    this.isResearcher = this.navbarService.isResearcherLogged;
    this.isRespondent = this.navbarService.isRespondentLogged;
    this.isRespondentDashboard = this.navbarService.isRespondentDashboard;
 

  
  }

   // Step 1:
  // Create a property to track whether the menu is open.
  // Start with the menu collapsed so that it does not
  // appear initially when the page loads on a small screen!
  public isMenuCollapsed = true;


}
