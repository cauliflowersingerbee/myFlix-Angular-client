import { Component, OnInit, Input, Inject } from '@angular/core';
// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
 

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  user: any = JSON.parse(localStorage.getItem('user') || '');
  

//decorator to define the component's input (user data)
@Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };
  constructor(

   @Inject(MAT_DIALOG_DATA)
    public data: { onSuccess: () => void },
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<ProfileEditComponent>,
    public snackBar: MatSnackBar
    
    ) { }

  ngOnInit(): void {
    
  }

  // This is the function responsible for sending the form inputs to the backend
editUser(): void {
  this.fetchApiData.editUser(this.user.Username, this.userData).subscribe((response) => {
// Logic for a successful user registration goes here! (To be implemented)
   this.dialogRef.close(); // This will close the modal on success!
   console.log(response);
   localStorage.setItem('user', JSON.stringify(response));
   this.snackBar.open('Profile successfully updated', 'OK', {
      duration: 2000
   });
  }, (response) => {
    console.log(response)
    this.snackBar.open(response, 'OK', {
      duration: 4000
    });
    setTimeout(() => {
      window.location.reload();
    }, 200000);
  });
}
}

