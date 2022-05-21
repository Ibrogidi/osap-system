import { QuestionType } from './../models/question-type.interface';
import { RespondentData } from './../models/respondent-data.interface';
import { EducationLevels } from './../models/education-levels.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResearcherData } from './../models/researcher-data.interface';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from './http-error-handler.service';
import { HttpHeaders } from '@angular/common/http';
import { LoginData } from '../models/login-data.interface';
import { AuthorizeUsers } from '../models/authorize-users.interface';
import { Occupations } from '../models/occupations.interface';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
    // Authorization: 'Token menkfefedfcdvkjd'
  })
};

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  private tokenValue:string;
  private surverUrl = 'http://127.0.0.1:2000'
  private resercherRegistrationUrl = this.surverUrl+'/auth/users/';
  private respondentRegistrationUrl = this.surverUrl+'/auth/users/respondents/';
  private loginUrl = this.surverUrl+'/auth/token/login';
  private usersUrl = this.surverUrl+'/auth/users/me';
  private occupationUrl = this.surverUrl+'/requirements/occupations/';
  private educationUrl =this.surverUrl+'/requirements/education-levels/';
private logoutUrl =this.surverUrl+ '/auth/token/logout/';
private questionTypeUrl = this.surverUrl + '/surveys/questionnaire-types/';
  // private url2 = "http://my-json-server.typicode.com/Ibrogidi/osap-system/users/"
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
  ) {
    this.handleError = httpErrorHandler.createHandleError('AuthService');
  }
  /** register researcher to the server */

  register(researcherdata: ResearcherData): Observable<ResearcherData> {
    return this.http.post<ResearcherData>(this.resercherRegistrationUrl, researcherdata, httpOptions)
      .pipe(
        catchError(this.handleError('register', researcherdata))
      )
  }

  register2(respondentdata: RespondentData): Observable<RespondentData> {
    return this.http.post<RespondentData>(this.respondentRegistrationUrl, respondentdata)
      .pipe(
        catchError(this.handleError('register2', respondentdata))
      )
  }
  // register(researcherdata: ResearcherData){
  //   return this.http.post(this.url2, researcherdata);
  // }

  login(logindata: LoginData): Observable<LoginData> {
    return this.http.post<LoginData>(this.loginUrl, logindata, httpOptions)
      .pipe(
        catchError(this.handleError('login', logindata))
      )
  }



  getUser(myToken:any){
    httpOptions.headers = httpOptions.headers.set('Authorization', myToken);
    return this.http.get(this.usersUrl,httpOptions);
  }

  
// getOccupation()  {
  
//   return this.http.get(this.occupationUrl);
//   }
  getOccupation() : Observable<Occupations[]>  {
  
    return this.http.get<Occupations[]>(this.occupationUrl)
      .pipe(
        catchError(this.handleError('getOccupation', []))
      );
  }

  getEducationLevels() : Observable<EducationLevels[]>  {
  
    return this.http.get<EducationLevels[]>(this.educationUrl)
      .pipe(
        catchError(this.handleError('getEducationLevels', []))
      );
  }

  
  getQuestionType() : Observable<QuestionType[]>  {
  
    return this.http.get<QuestionType[]>(this.questionTypeUrl)
      .pipe(
        catchError(this.handleError('getQuestionType', []))
      );
  }

  get isResearcherLoggedIn():boolean{
    const user =(localStorage.getItem('Researcher')!);
    // console.log(user);
    if(user){
      return true
    }
    else return false;
  }
  get isRespondentLoggedIn():boolean{
    const user =(localStorage.getItem('Respondent')!);
    //  console.log(user);
    if(user){
      return true
    }
    else return false;
  }


  logOut(token:string){
    localStorage.removeItem("Researcher");
    return this.http.post(this.logoutUrl,token)
  }
  logOut2(token:string){
    localStorage.removeItem("Respondent");
    return this.http.post(this.logoutUrl,token)
  }
  // getData(myToken:string) : Observable<ResearcherData[]>  {
  //   httpOptions.headers = httpOptions.headers.set('Authorization', myToken);
  //   return this.http.get<ResearcherData[]>(this.usersUrl)
  //     .pipe(
  //       catchError(this.handleError('getData', []))
  //     );
  // }

  // getUser(term: string): Observable<AuthorizeUsers[]> {
  //   term = term.trim();

  //   // Add safe, URL encoded search parameter if there is a search term
  //   const options = term ?
  //    { params: new HttpParams().set('Authorization', term) } : {};

  //   return this.http.get<AuthorizeUsers[]>(this.usersUrl, options)
  //     .pipe(
  //       catchError(this.handleError<AuthorizeUsers[]>('searchHeroes', []))
  //     );
  // }




}
