/**
 * @file contains logic to enable app to make http requests
 * that connect client server to backend API in order to sign up 
 * for an account, sign in, edit profile, delete profile, etc
 */
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Declaring the api url that will provide data for 
 * the client app
 */
const apiUrl = 'https://kino-noir.herokuapp.com';

/**
 * service provided to root and therefore available
 * to all components
 */
@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  /**
   * Inject the HttpClient module to the constructor params
   * This will provide HttpClient to the entire class, making 
   * it available via this.http
   * @param http 
   */
   constructor(private http: HttpClient) {
  }

 /**
  * Making the api call for the user registration endpoint
  * @function userRegistration
  * @param userDetails 
  * @returns http POST request that sends user details to database
  */

  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
    .post(apiUrl + '/users', userDetails)
    /**
     * The pipe() function takes the functions you want to 
     * combine (in this case, there's one method, catchError) 
     * as its arguments and will return a new function that, 
     * when executed, runs the composed functions in sequence.
     */
    .pipe(catchError(this.handleError)
    );
  }

   /**
    * Making the api call for the user login endpoint
    * @function userLogin
    * @param userDetails 
    * @returns http POST request to send login details to database
    */
   public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
    .post(apiUrl + '/login', userDetails)
    .pipe(catchError(this.handleError)
    );
  }
 
   /**
    * Making the api call for getting all movies
    * @function getAllMovies
    * @returns http GET request that fetches list of all
    * movies
    */
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

  /**
   * Making the api call for getting one movie
   * @function getMovie
   * @param Title 
   * @returns http GET request that fetches a movie title
   */
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

   /**
    * Making the api call for getting movie director
    * @function getDirector
    * @param Name 
    * @returns http GET request that fetches a director's details
    */
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

  /**
   * Making the api call for getting movie genre
   * @function getGenre
   * @param Name 
   * @returns http GET request that returns a genre's details
   */
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

  /**
   * Making the api call for getting username
   * @function getUser
   * @param Username 
   * @returns http GET request that returns a user's details
   */
  getUser(Username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `/users/${Username}`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token, }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

   /**
    * Making the api call to access favorite movies list
    * @function getFavorites
    * @returns json object containing user's favorite movies
    */
   public getFavorites(): Observable<any> {
    const token = localStorage.getItem('token');
    const user: any = JSON.parse(localStorage.getItem('user') || '');
    const Username = user.Username;
    const response = this.http.get(apiUrl + `/users/${Username}/movies`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token, }),
      })
    return response.pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Making the api call to edit user
   * @function updateUser
   * @param userInfo 
   * @returns a user's updated details
   */
  public updateUser(userInfo: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user: any = JSON.parse(localStorage.getItem('user') || '');
    const Username = user.Username;

    const response = this.http.put(apiUrl + `/users/${Username}`, userInfo, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token, }), responseType: 'text'});
    
    return response.pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Making the api call to delete user
   * @function deleteUser
   * @returns http DELETE request that removes user from database
   */
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

  /**
   * Making the api call to add movie to favorites
   * @function addFavorite
   * @param MovieID 
   * @returns http POST request that updates user's favorites list
   */
  addFavorite(MovieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user: any = JSON.parse(localStorage.getItem('user') || '');
    const Username = user.Username;
    const resp = this.http.post(apiUrl + `/users/${Username}/movies/${MovieID}`, MovieID, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token, }), responseType: 'text'
      })
      return resp.pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Making the api call to delete movie from favorites
   * @param MovieID 
   * @returns http DELETE request that updates user's
   * list of favorite movies
   */
  deleteFavorite(MovieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('Username');
    const resp = this.http.delete(apiUrl + `/users/${Username}/movies/${MovieID}`, {
    headers: new HttpHeaders({ Authorization: 'Bearer ' + token,}), responseType: 'text'
    })
    return resp.pipe(map(this.extractResponseData), catchError(this.handleError));
  }

/**
 * Non-typed response extraction
 * @param response 
 * @returns a response body
 */
  private extractResponseData(response: any): any {
    const body = response;
    return body || { };
  }
 
/**
 * handling error responses from the http requests. 
 * error.error relates to network/client-side errors
 * console.error relates to server-side errors
 * @function handleError
 * @param error 
 * @returns a message that provides more details about the 
 * error that was encountered
 */
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

