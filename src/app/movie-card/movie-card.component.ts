import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  
  user = localStorage.getItem('user');
  movies: any[] = [];
  favorites: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
     ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getUserDetails();

  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(this.movies);
        return this.movies;
      });
    }

     getUserDetails() : void {
      const user = JSON.parse(localStorage.getItem('user') || '');
      this.fetchApiData.getUser(user.Username).subscribe((res: any) => {
        this.user = res;
      });
    }

    addFavorite(MovieID: string, title: string): void {
      this.fetchApiData.addFavorite(MovieID).subscribe((resp: any) => { 
        this.favorites = resp;
        console.log(resp);
        this.snackBar.open(`${title} was added to favorites!`, 'OK!', 
          { duration: 1000, panelClass: 'snack-style' }
        );
      },  (result) => {
          console.log(result);
          this.snackBar.open(`Something went wrong. ${title} was not successfully added to favorites.`, 'Ok',
            { duration: 1000, panelClass: 'snack-style' }
          ); 
      });
    }
  
   
    deleteFavorite(MovieID: string, title: string): void {
      this.fetchApiData.deleteFavorite(MovieID).subscribe((resp: any) => { 
        this.favorites = resp;
        console.log(resp);
        this.snackBar.open(`${title} has been removed from your favourites!`, 'Ok',
          { duration: 1000, panelClass: 'snack-style' }
        );
      },  (result: any) => {
          console.log(result);
          this.snackBar.open(`Something went wrong. ${title} wasn't removed from favorites!`, 'Ok', 
            { duration: 1000, panelClass: 'snack-style' }
          ); 
      });
    }

    openMovieGenreDialog(Name: string, Description: string): void {
      this.dialog.open(MovieGenreComponent, {
        data: { Name, Description },
        width: '250px' 
      });
    } 
   
  
    openMovieDirectorDialog(Name: string, Bio: string, Birth: string, Death: string): void {
      this.dialog.open(MovieDirectorComponent, {
        data: { Name, Bio, Birth, Death },
        width: '250px' 
      });
    }
   
    openMovieDetailsDialog(Title: string, Description: string): void {
      this.dialog.open(MovieDetailsComponent, {
        data: { Title, Description },
        width: '250px' 
      });
    }

    }
