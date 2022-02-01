
/**
 * @file contains logic to build a favorite-movie component
 * where we fetch a user's details and retrieve their favorite 
 * movies.
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

  ngOnInit(): void {
    this.getUserDetails();
  } 

  getUserDetails() : void {
    const user = JSON.parse(localStorage.getItem('user') || '');
    this.fetchApiData.getUser(user.Username).subscribe((res: any) => {
      this.user = res;
      //adding list of favorite movies to local state
      this.favoriteIds = res.FavoriteMovie;
      console.log(this.favoriteIds);
      //callinf movies 
      this.getMovies();
    });
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies()
    .subscribe((resp: any) => {
        this.movies = resp;
        console.log(resp);
        //calling favorites
        this.getFavorites();
      });
    }

    getFavorites() : void {
          let favoriteMoviesList = this.favoriteIds.map((fav) => 
            {return this.movies.find((movie: any) => movie._id === fav);
          });
          //adding movieIDs to local state
          this.favoriteMoviesList = favoriteMoviesList;
          console.log(this.favoriteMoviesList);
    }
    
}


