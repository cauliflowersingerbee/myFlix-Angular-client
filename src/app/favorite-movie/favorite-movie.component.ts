import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorite-movie',
  templateUrl: './favorite-movie.component.html',
  styleUrls: ['./favorite-movie.component.css']
})
export class FavoriteMovieComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  getFavoriteMovies() : void {
    const user = JSON.parse(localStorage.getItem('user') || '');
    this.fetchApiData.getUser(user.Username)
    .subscribe((resp: any) => { 
      this.favorites = user.FavoriteMovie 
    });
    console.log(user.FavoriteMovie);

  }
}
