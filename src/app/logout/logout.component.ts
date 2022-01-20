import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})


export class LogoutComponent implements OnInit {

  @Input() userData = { Username: '', Password: ''};
  
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<LogoutComponent>,
    public snackBar: MatSnackBar, 
    public router: Router
    ) { }

  ngOnInit(): void {
  }

userLogout(): void {
  localStorage.clear();
  console.log('user logged out successfully');
  this.snackBar.open('user logged out successfully', 'OK', {
    duration: 2000,
  });
  this.router.navigate(['/welcome']).then(() => {
    window.location.reload();
  });
} 

}


