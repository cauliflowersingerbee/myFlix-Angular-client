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
export class FetchApiDataService {
 // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

 // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
    .post(apiUrl + '/users', userDetails)
    //The pipe() function takes the functions you want to combine (in this case, 
    //there's one method, catchError) as its arguments and will return a new 
    //function that, when executed, runs the composed functions in sequence.
    .pipe(catchError(this.handleError)
    );
  }

   // Making the api call for the user login endpoint
   public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
    .post(apiUrl + '/login', userDetails)
    .pipe(catchError(this.handleError)
    );
  }
 
   // Making the api call for getting all movies
   getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + '/movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })})
      .pipe(map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for getting one movie
  getMovie(Title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + `movies/${Title}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })})
      .pipe(map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

   // Making the api call for getting movie director
   getDirector(Name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + `directors/${Name}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })})
      .pipe(map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for getting movie genre
  getGenre(Name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + `genres/${Name}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })})
      .pipe(map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for getting username
  getUser(Username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `/users/${Username}`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

   // Making the api call to add movie to favorites
   addFavorite(MovieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('Username');
    return this.http
      .post(apiUrl + `users/${Username}/movies/${MovieID}`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

   // Making the api call to access favorite movies list
   public getFavorites(): Observable<any> {
    const token = localStorage.getItem('token');
    const user: any = JSON.parse(localStorage.getItem('user') || '');
    const Username = user.Username;
    const response = this.http.get(apiUrl + `/users/${Username}/movies`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token, }),
      })
    return response.pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Making the api call to edit user
  public updateUser(userInfo: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user: any = JSON.parse(localStorage.getItem('user') || '');
    const Username = user.Username;

    const response = this.http.put(apiUrl + `/users/${Username}`, userInfo, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token, }), responseType: 'text'});
    
    return response.pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //Making the api call to delete user
  deleteUser( ): Observable<any> {
    const token = localStorage.getItem('token');
    const user: any = JSON.parse(localStorage.getItem('user') || '');
    const Username = user.Username;

    console.log(user);
    const response = this.http.delete(apiUrl + `/users/${Username}`, {
        headers: new HttpHeaders({ Authorization: 'bearer ' + token, }),
        responseType: 'text' });
     return response.pipe(map(this.extractResponseData), catchError(this.handleError));
 }

  // Making the api call to delete movie from favorites
  //deleteFavoriteMovie(MovieID: any): Observable<any> {
    //const token = localStorage.getItem('token');
   // const Username = localStorage.getItem('Username');
    //return this.http
    //  .delete(apiUrl + `users/${Username}/movies/${MovieID}`, {
    //    headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
    //  })
    //  .pipe(map(this.extractResponseData), catchError(this.handleError));
  //}

// Non-typed response extraction
  private extractResponseData(response: any): any {
    const body = response;
    return body || { };
  }


private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${JSON.stringify(error.error)}`
    );
   }
  return throwError(
   'Something bad happened; please try again later.');
  }
}

