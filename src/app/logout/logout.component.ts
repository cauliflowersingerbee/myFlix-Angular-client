import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// This import is used to display notifications back to the user
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


