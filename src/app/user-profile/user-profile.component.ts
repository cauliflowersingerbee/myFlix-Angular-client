/**
 * @file contains logic that allows users to 
 * view/edit their profile.
 */

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileDeleteComponent } from '../profile-delete/profile-delete.component';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';
import { FavoriteMovieComponent } from '../favorite-movie/favorite-movie.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: any = {};
  movies: any = [];
  favorites: any[] = [];
  
  

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  /**
   * On initializing, we get the user's details
   */
  ngOnInit(): void {
    this.getUserDetails();
  }

  /**
   * getting the user's details
   * @method getUserDetails
   * Then we store details in local user state
   */
  getUserDetails() : void {
    const user = JSON.parse(localStorage.getItem('user') || '');
    this.fetchApiData.getUser(user.Username).subscribe((res: any) => {
      this.user = res;
    });
  }

  /**
   * logic to allow user to click a button and 
   * delete their account
   * @method deregisterUser
   */
 
  deregisterUser(): void {
    this.dialog.open(ProfileDeleteComponent, {
      width: '280px',
    });
  }

  /**
   * logic to allow user to click a button and 
   * edit their account
   * @method openEditProfileDialog
   */
  openEditProfileDialog(): void {
    this.dialog.open(ProfileEditComponent, {
      width: '500px',
    });
  }

  /**
   * logic to allow user to click a button and 
   * see their favorite movies
   * @method openFavoriteMovieDialog
   */
  openFavoriteMovieDialog(): void {
    this.dialog.open(FavoriteMovieComponent, {
      width: '500px',
    });
  }

}
