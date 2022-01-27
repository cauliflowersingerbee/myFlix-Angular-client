
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

  //user: any = JSON.parse(localStorage.getItem('user') || '');
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
    this.getMovies();
    this.getFavoriteMovies();
    
  }

  getUserDetails() : void {
    const user = JSON.parse(localStorage.getItem('user') || '');
    this.fetchApiData.getUser(user.Username).subscribe((res: any) => {
      this.user = res;
    });
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies()
    .subscribe((resp: any) => {
        this.movies = resp;
        console.log(resp);
        
      });
    }

    

  getFavoriteMovies() : void {
    const user = JSON.parse(localStorage.getItem('user') || '');
    this.getMovies();
    this.fetchApiData.getUser(user.Username).subscribe((resp: any) => {
    this.favorites = resp.FavoriteMovie;
      console.log('this.favorites', this.favorites)
      console.log('this.movies', this.movies);
    if (this.favorites.length === 0) 
      {return 'You have no favorite movies'} 
    else if (this.movies.map((movie: any) => {movie._id ===
       this.favorites.find((fav) => fav === movie._id);
    })) 
    {let array = this.favorites.map((fav) => 
      {return this.movies.find((movie: any) => movie._id === fav);
    });
    console.log(array) ;
    return array;
    }
    return
  } )
}

}
