
/**
 * @file contains logic to build a favorite-movie component
 * where we fetch a user's details and retrieve their favorite 
 * movies.
 * @module FavoriteMovieComponent
 */

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-favorite-movie',
  templateUrl: './favorite-movie.component.html',
  styleUrls: ['./favorite-movie.component.css']
})
export class FavoriteMovieComponent implements OnInit {

  user: any = {};
  movies: any = [];
  favoriteIds: any[] = [];
  favoriteMoviesList: any[] = [];
  
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  /**
   * on initializing, we fetch the user's details
   * so we have access to their favorite movies. 
   */
  ngOnInit(): void {
    this.getUserDetails();
  } 

  /**
   * Retrieving the user's details
   * @method getUserDetails
   * Then we store them in the local user &
   * favorite movies states.
   * Then we call the next method in the call chain
   * 
   *  
   */
  getUserDetails() : void {
    const user = JSON.parse(localStorage.getItem('user') || '');
    this.fetchApiData.getUser(user.Username).subscribe((res: any) => {
      this.user = res;
      this.favoriteIds = res.FavoriteMovie;
      console.log(this.favoriteIds);
      this.getMovies();
    });
  }

  /**
   * Getting a list of all the movies 
   * @method getMovies
   * Then calling next method in call chain
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies()
    .subscribe((resp: any) => {
        this.movies = resp;
        console.log(resp);
        this.getFavorites();
      });
    }
    
    /**
     * Mapping through the favorite movie IDs and 
     * comparing them to the movie list so that we 
     * have an object containing actual movies rather 
     * than just movie IDs
     * @function getFavorites
     * @returns movie object
     * Then we add this object into local favorite 
     * movie state
     */
    getFavorites() : void {
          let favoriteMoviesList = this.favoriteIds.map((fav) => 
            {return this.movies.find((movie: any) => movie._id === fav);
          });
          this.favoriteMoviesList = favoriteMoviesList;
          console.log(this.favoriteMoviesList);
    }
    
}


