
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
  favorites: any[] = [];
  
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getFavoriteMovies();
    this.getMovies;
    
  }


  getMovies(): void {
    this.fetchApiData.getAllMovies()
    .subscribe((resp: any) => {
        this.movies = resp;
        console.log(this.movies);
        
      });
    }


  getFavoriteMovies() : void {
    const user = JSON.parse(localStorage.getItem('user') || '');
    this.fetchApiData.getUser(user.Username)
    .subscribe((resp: any) => { 
      this.favorites = resp.FavoriteMovie;
      if (this.favorites.length === 0) {
        `You have no favorite movies`
      } else if (this.favorites.length > 0 && 
        (this.movies.map((movie: any) => {movie._id ===
          this.favorites.find((fav) => fav === movie._id)}
    ))) {
      console.log(this.movies);
      return this.movies;
    }
   })
  }
}
