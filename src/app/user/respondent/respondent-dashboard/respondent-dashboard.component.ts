import { Router } from '@angular/router';
import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'respondent-dashboard',
  templateUrl: './respondent-dashboard.component.html',
  styleUrls: ['./respondent-dashboard.component.css']
})
export class RespondentDashboardComponent implements OnInit {

  
  token: any;
  username:any;
  respondentToken:any;
  
  
  constructor(
    private authService: AuthService,
    private router: Router,
    
    ) {
   
   }

  ngOnInit(): void {
    this.token = localStorage.getItem('Respondent');
    this.respondentToken = "Token "+this.token;
    this.authService.getUser(this.respondentToken).subscribe((respondent:any)=>{
      this.username = respondent.username;
    })
    

  }
  logout(){
this.authService.logOut2(this.token);
this.router.navigate(['/login'])

  }
  

}

