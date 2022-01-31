/**
 * @file contains logic to enable user 
 * to click a button and see more information about
 * a movie's genre.
 */

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-genre',
  templateUrl: './movie-genre.component.html',
  styleUrls: ['./movie-genre.component.css']
})
export class MovieGenreComponent implements OnInit {
/**
 * 
 * @param data 
 */
  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public data: { Name: string, Description: string } 
  ) { }

  ngOnInit(): void {
  }

}
