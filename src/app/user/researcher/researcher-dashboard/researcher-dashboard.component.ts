import { AuthService } from 'src/app/core/services/auth.service';



import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
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
  constructor(
    private authService: AuthService,
    private router: Router,
    ) {
   
   }

  ngOnInit(): void {
    this.token = localStorage.getItem('Researcher');
    this.researcherToken = "Token "+this.token;
    this.authService.getUser(this.researcherToken).subscribe((researcher:any)=>{
      this.username = researcher?.username;
    })
  }
  logout(){
this.authService.logOut(this.token);
this.router.navigate(['/login'])

  }
 

}
