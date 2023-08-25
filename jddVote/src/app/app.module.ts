import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AjouterJoueurComponent } from './ajouter-joueur/ajouter-joueur.component';
import { EnregistrerPartieComponent } from './enregistrer-partie/enregistrer-partie.component';
import { EnregistrerVoteComponent } from './enregistrer-vote/enregistrer-vote.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JoueurService } from './service/joueur.service';
import { PartieService } from './service/partie.service';
import { VoteService } from './service/vote.service';
import { HttpClientModule } from '@angular/common/http';
import { JeuService } from './service/jeu.service';
import { ListeVoteComponent } from './liste-vote/liste-vote.component';
import { ListeJoueursComponent } from './liste-joueurs/liste-joueurs.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PoidsVoteService } from './service/poisvote.service';
import { BandeauStatusComponent } from './bandeau-status/bandeau-status.component';
import { PropertyService } from './service/property.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogAskToGoAdminPlacesComponent } from './dialog-ask-to-go-admin-places/dialog-ask-to-go-admin-places.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { StatsComponent } from './stats/stats.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    AjouterJoueurComponent,
    EnregistrerPartieComponent,
    EnregistrerVoteComponent,
    ListeVoteComponent,
    ListeJoueursComponent,
    BandeauStatusComponent,
    DialogAskToGoAdminPlacesComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [JoueurService,PartieService,VoteService,JeuService, PoidsVoteService,PropertyService,MatDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
