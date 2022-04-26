import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResearcherData } from './../models/researcher-data.interface';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from './http-error-handler.service';
import { HttpHeaders } from '@angular/common/http';
import { LoginData } from '../models/login-data.interface';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
    // Authorization: 'Token menkfefedfcdvkjd'
  })
};

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  private resercherRegistrationUrl = 'http://127.0.0.1:2000/auth/users/';


  // private url2 = "http://my-json-server.typicode.com/Ibrogidi/osap-system/users/"
private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    ) { 
      this.handleError = httpErrorHandler.createHandleError('AuthService');
    }
 /** register researcher to the server */

register(researcherdata: ResearcherData): Observable<ResearcherData>{
  return this.http.post<ResearcherData>(this.resercherRegistrationUrl, researcherdata,httpOptions)
     .pipe(
       catchError(this.handleError('register', researcherdata))
     )}
// register(researcherdata: ResearcherData){
//   return this.http.post(this.url2, researcherdata);
// }

login(logindata: LoginData): Observable<LoginData>{
  return this.http.post<LoginData>('login',logindata,httpOptions)
  .pipe(
    catchError(this.handleError('login',logindata))
  )
}




}
