import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-ask-to-go-admin-places',
  templateUrl: './dialog-ask-to-go-admin-places.component.html',
  styleUrls: ['./dialog-ask-to-go-admin-places.component.css']
})
export class DialogAskToGoAdminPlacesComponent implements OnInit {
  mdp:string
  constructor(public dialogRef: MatDialogRef<DialogAskToGoAdminPlacesComponent>) { }
  
  ngOnInit(): void {

  }

  onOKClick():void{
    this.dialogRef.close(this.mdp);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
