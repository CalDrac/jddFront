import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../service/property.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogAskToGoAdminPlacesComponent } from '../dialog-ask-to-go-admin-places/dialog-ask-to-go-admin-places.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  siteOpen : boolean
  voteVisible : boolean
  statsVisible : boolean
  mdp:string

  constructor(private propertyService : PropertyService, public dialog : MatDialog,private router: Router) { }

  ngOnInit(): void {
    this.propertyService.getPropertiesByName("isOpen").subscribe(
      (resOpen) => {
        this.siteOpen = resOpen.valeur == "1"
      }
    )
    this.propertyService.getPropertiesByName("displayVoteButton").subscribe(
      (resOpen) => {
        this.voteVisible = resOpen.valeur == "1"
      }
    )

    this.propertyService.getPropertiesByName("displayStatsButton").subscribe(
      (resOpen) => {
        this.statsVisible = resOpen.valeur == "1"
      }
    )
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAskToGoAdminPlacesComponent, {
      width: '250px',
      data: {mdp: this.mdp},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.mdp = result
      if(result == '1234'){
        //goTo Liste vote
        this.router.navigate(['/listeVote/']);
      }else{
        alert("C'est non")
      }
    });
  }

  openDialogStats(): void {
    const dialogRef = this.dialog.open(DialogAskToGoAdminPlacesComponent, {
      width: '250px',
      data: {mdp: this.mdp},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.mdp = result
      if(result == '1234'){
        //goTo Liste vote
        this.router.navigate(['/stats/']);
      }else{
        alert("C'est non")
      }
    });
  }

}
