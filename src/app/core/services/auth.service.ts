import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResearcherData } from './../models/researcher-data.interface';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from './http-error-handler.service';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})


export class AuthService {
private url = 'http://127.0.0.1:2000/auth/users/';

private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    ) { 
      this.handleError = httpErrorHandler.createHandleError('AuthService');
    }
 /** register researcher to the server */

register(researcherdata: ResearcherData): Observable<ResearcherData>{
  return this.http.post<ResearcherData>(this.url, researcherdata,httpOptions)
     .pipe(
       catchError(this.handleError('register', researcherdata))
     )}
// register(researcherdata: ResearcherData){
//   return this.http.post(this.url, researcherdata);
// }



}
