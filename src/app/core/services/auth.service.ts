import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResearcherData } from './../models/researcher-data.interface';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from './http-error-handler.service';
import { HttpHeaders } from '@angular/common/http';
import { LoginData } from '../models/login-data.interface';
import { AuthorizeUsers } from '../models/authorize-users.interface';
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
  private resercherRegistrationUrl = 'http://127.0.0.1:2000/auth/users/';

  private loginUrl = 'http://127.0.0.1:2000/auth/token/login';
  private usersUrl = 'http://127.0.0.1:2000/auth/users/me';
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
