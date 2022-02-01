
/**
 * @file contains logic to build movie display cards. 
 * Connects movie-director, movie-genre, and movie-detail
 * components. 
 * Upon clicking on a particular movie, users will be 
 * taken to a single movie view, where additional movie 
 * details will be displayed. 
 */


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

  /**
   * using the http request to retrieve data about all movies
   * @function getMovies
   * @return movies in json format
   * then bind movies to local movie state
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(this.movies);
        return this.movies;
      });
    }

  /**
   * using the http request to retrieve data about all movies
   * @function getMovies
   * @return movies in json format
   * then store movies to local movie state
   */
     getUserDetails() : void {
      const user = JSON.parse(localStorage.getItem('user') || '');
      this.fetchApiData.getUser(user.Username).subscribe((res: any) => {
        this.user = res;
      });
    }

    /**
     * using the http request to add a movie to
     *  array of user's favorite movies
     * @function addFavorite
     * @param MovieID {string}
     * @param title {string}
     * Brief message pops up to inform user if 
     * movie was added to favorites or not
     */

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
  
   /**
    * using the http request to delete a movie from user's list of 
    * favorites
    * @function deleteFavorite
    * @param MovieID 
    * @param title 
    */
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

    /**
     * logic for popup message when user wants to see more
     * details about movie genre
     * @method openMovieGenreDialog
     * @param Name 
     * @param Description 
     */
    openMovieGenreDialog(Name: string, Description: string): void {
      this.dialog.open(MovieGenreComponent, {
        data: { Name, Description },
        width: '250px' 
      });
    } 
   
    /**
     * logic for popup message when user wants to see more
     * details about movie director
     * @method openMovieDirectorDialog
     * @param Name 
     * @param Bio 
     * @param Birth 
     * @param Death 
     */
    openMovieDirectorDialog(Name: string, Bio: string, Birth: string, Death: string): void {
      this.dialog.open(MovieDirectorComponent, {
        data: { Name, Bio, Birth, Death },
        width: '250px' 
      });
    }
   
    /**
     * logic for popup message when user wants to see more
     * details about single movie 
     * @method openMovieDetailsDialog
     * @param Title 
     * @param Description 
     */
    openMovieDetailsDialog(Title: string, Description: string): void {
      this.dialog.open(MovieDetailsComponent, {
        data: { Title, Description },
        width: '250px' 
      });
    }

    }
