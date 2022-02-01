/**
 * @file contains logic to enable a user to sign into their
 * profile
 */

import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

 /**
 * decorator to define the component's input and
 * bind it to userData object
 */

  @Input() userData = { Username: '', Password: ''};
  
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar, 
    public router: Router
    ) { }

  ngOnInit(): void {
  }

  /**
   * we invoke the http request that fetches the user data
   * @function loginUser
   * Then we store the user data in local storage
   * Then we display a brief message telling user if their
   * login attempt was successful
   * Then we use the router to direct them to the list of movies
   */
loginUser(): void {
  this.fetchApiData.userLogin(this.userData).subscribe((response) => {
   this.dialogRef.close();
   localStorage.setItem('token', response.token);
   localStorage.setItem('user', JSON.stringify(response.user));
   console.log(response);
   this.snackBar.open('user logged in successfully', 'OK', {
      duration: 2000
   });
   this.router.navigate(['home']);
  }, (response) => {
    console.log(response)
    this.snackBar.open(response, 'OK', {
      duration: 2000
    });
  });
}

}


