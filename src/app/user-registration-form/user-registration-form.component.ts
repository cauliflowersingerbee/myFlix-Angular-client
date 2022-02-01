/**
 * @file contains logic to allow a user to register
 * for an account
 * @module UserRegistrationFormComponent
 */

import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

/**
 * decorator to define the component's input and bind it to 
 * userData object
 */

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }


ngOnInit(): void {
}

/**
 * we invoke the http request to register a user using the userData
 * bound in the input. 
 * @function registerUser
 * Then we inform the user if they were successfully registered or not
 */
registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
  // Logic for a successful user registration goes here! (To be implemented)
     this.dialogRef.close(); // This will close the modal on success!
     console.log(response);
     this.snackBar.open('user registered successfully', 'OK', {
        duration: 2000
     });
    }, (response) => {
      console.log(response)
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }

  }
