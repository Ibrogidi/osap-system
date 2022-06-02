import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  loginStatus:boolean = false;
  isAdminLogged:boolean = false;
  isResearcherLogged:boolean = false;
  isRespondentLogged: boolean = false;
  isRespondentDashboard: boolean = false;
  isResearcherDashboard: boolean = false;
respondentUserName: string;
changeLoginStatus( truthValue: boolean){
  this.loginStatus = truthValue;

}
changeRespondentStatus(truthValue:boolean){
  this.isRespondentLogged = truthValue;
}


changeResearcherStatus(truthValue:boolean){
  this.isResearcherLogged = truthValue;
}

changeRespondentDashboardStatus(truthValue:boolean){
  this.isRespondentDashboard = truthValue;
}
changeRespondentName(name: string){
  this.respondentUserName = name;
}


}



