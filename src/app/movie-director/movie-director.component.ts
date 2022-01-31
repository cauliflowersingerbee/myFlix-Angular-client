/**
 * @file contains logic to build movie director component. 
 * UI will show a button that, when clicked, takes a user 
 * to the director view, where details about the
 director of that particular movie will be displayed.
 */

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'; 


@Component({
  selector: 'app-movie-director',
  templateUrl: './movie-director.component.html',
  styleUrls: ['./movie-director.component.css']
})
export class MovieDirectorComponent implements OnInit {
   /**
   *
   * @param data
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)  
    public data: { Name: string, Bio: string, Birth: string, Death: string }
   
  ) { }

  ngOnInit(): void {
  }

}
