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
  favorites: any[] = [];: any = {};

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
  
    toggleFavorite(movieID: string, title: string): void {
      let movieIds = this.favorites.map(fav => { return fav._id });
      if (movieIds.includes(movieID)) {
        this.deleteFavorite(movieID, title);
      } else {
        this.addFavorite(movieID, title);
      }
    }

    toggleLikeIcon(movieID: string): string {
      let movieIds = this.favorites.map(fav => { return fav._id });
      return movieIds.includes(movieID) ? 'warn' : 'accent';
    }

    addFavorite(movieID: string, title: string): void {
      this.fetchApiData.addFavourite(this.username!, movieID).subscribe((resp: any) => { 
        this.favourites = resp;
        this.snackBar.open(`${title} has been added to your favourites!`, 'Cool!', 
          { duration: 4000, panelClass: 'snack-style' }
        );
      },  (result) => {
          console.log(result);
          this.snackBar.open(`Hmm, we couldn't add ${title} to favourites. Please try again`, 'Ok',
            { duration: 4000, panelClass: 'snack-style' }
          ); 
      });
    }
  
   
    deleteFavorite(movieID: string, title: string): void {
      this.fetchApiData.deleteFavourite(this.username!, movieID).subscribe((resp: any) => { 
        this.favourites = resp;
        this.snackBar.open(`${title} has been removed from your favourites!`, 'Ok',
          { duration: 4000, panelClass: 'snack-style' }
        );
      },  (result) => {
          console.log(result);
          this.snackBar.open(`Hmm, we couldn't unfavourite ${title}. Please try again`, 'Ok', 
            { duration: 4000, panelClass: 'snack-style' }
          ); 
      });
    }

    openGenreDialog(Name: string, Description: string): void {
      this.dialog.open(MovieGenreComponent, {
        data: { Name: Name, Description: Description },
        width: '250px' 
      });
    } 
   
  
    openDirectorDialog(Name: string, Bio: string, Birth: string, Death: string): void {
      this.dialog.open(MovieDirectorComponent, {
        data: { Name: Name, Bio: Bio, Birth: Birth, Death: Death },
        width: '250px' 
      });
    }
   
    openMovieDetailsDialog(Title: string, Description: string): void {
      this.dialog.open(MovieDetailsComponent, {
        data: { Title: Title, Description: Description },
        width: '250px' 
      });
    }

    }
