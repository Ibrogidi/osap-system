import { AuthService } from 'src/app/core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


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
  dataSource = ELEMENT_DATA;
  surveyLists: any;
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
    });
    this.authService.getSurveyData(this.researcherToken).subscribe((surveyData:any)=>{
      this.surveyLists= surveyData;
    })
  }


  logout(){
this.authService.logOut(this.token);
this.router.navigate(['/login'])

  }
 

}
