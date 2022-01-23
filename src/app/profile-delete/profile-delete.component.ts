import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-profile-delete',
  templateUrl: './profile-delete.component.html',
  styleUrls: ['./profile-delete.component.css']
})
export class ProfileDeleteComponent implements OnInit {

  //user = localStorage.getItem('user') || '';

  constructor( public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<ProfileDeleteComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  deregisterUser(): void {
  
    this.fetchApiData.deleteUser().subscribe((res: any) => {
         this.dialogRef.close(); // This will close the modal on success!
         console.log(res);
         localStorage.removeItem('user');
        this.snackBar.open('Profile successfully deleted', 'OK', {
           duration:82000
         });
        }, (response) => {
          console.log(response)
          this.snackBar.open(response, 'OK', {
            duration: 4000
          });
        });
   }
}


 
