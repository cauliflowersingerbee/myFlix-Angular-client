
/**
 * @file contains logic to enable user delete their profile 
 */

import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile-delete',
  templateUrl: './profile-delete.component.html',
  styleUrls: ['./profile-delete.component.css']
})
export class ProfileDeleteComponent implements OnInit {

  constructor( public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<ProfileDeleteComponent>,
    public snackBar: MatSnackBar,
    public router: Router
    ) { }

  ngOnInit(): void {
  }

  /**
   * using the http request to delete a user
   * @function deregisterUser
   * Then user gets dialog box informing them
   * that their profile was successfully deleted
   * Then user is redirected to welcome screen
   */
  deregisterUser(): void {
  
    this.fetchApiData.deleteUser().subscribe((res: any) => {
         this.dialogRef.close();
         console.log(res);
         localStorage.removeItem('user');
        this.snackBar.open('Profile successfully deleted', 'OK', {
           duration:2000
         });
        }),
        this.router.navigate(['/welcome']).then(() => {
          window.location.reload();
        });
        
  }
}


 
