import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://kino-noir.herokuapp.com';
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
 // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
 // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
    .post(apiUrl + 'users', userDetails)
    //The pipe() function takes the functions you want to combine (in this case, 
    //there's one method, catchError) as its arguments and will return a new 
    //function that, when executed, runs the composed functions in sequence.
    .pipe(
    catchError(this.handleError)
    );
  }

   // Making the api call for the user login endpoint
   public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
    .post(apiUrl + 'users', userDetails)
    .pipe(
    catchError(this.handleError)
    );
  }

private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}
