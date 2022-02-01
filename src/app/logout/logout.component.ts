/**
 * @file contains logic to enablea  user to sign out of their
 * profile.
 */

import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})


export class LogoutComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar, 
    public router: Router
    ) { }

  ngOnInit(): void {
  }

/**
 * We clear the local storage
 * Then user gets brief message informing them that they
 * successfully logged out
 * Then user is redirected to the welcome page which contains
 * registration and sign-in options
 * @method userLogout
 */
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


