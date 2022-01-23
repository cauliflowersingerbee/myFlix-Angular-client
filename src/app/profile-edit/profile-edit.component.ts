import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
 

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  //user = localStorage.getItem('user') || '';
  

//decorator to define the component's input (user data)
@Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };
  constructor(

    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<ProfileEditComponent>,
    public snackBar: MatSnackBar
    
    ) { }

  ngOnInit(): void {
    
  }

  // This is the function responsible for sending the form inputs to the backend
editUser(): void {
  
  this.fetchApiData.updateUser(this.userData).subscribe((res: any) => {
       this.dialogRef.close(); // This will close the modal on success!
       console.log(res);
       localStorage.setItem('user', JSON.stringify(this.userData));
      this.snackBar.open('Profile successfully updated', 'OK', {
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

