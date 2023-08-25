import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { AjouterJoueurComponent } from './ajouter-joueur/ajouter-joueur.component';
import { EnregistrerPartieComponent } from './enregistrer-partie/enregistrer-partie.component';
import { EnregistrerVoteComponent } from './enregistrer-vote/enregistrer-vote.component';
import { ListeVoteComponent } from './liste-vote/liste-vote.component';
import { ListeJoueursComponent } from './liste-joueurs/liste-joueurs.component';
import { StatsComponent } from './stats/stats.component';

const base = ""

const routes: Routes = [
  { path: base + '', component: AccueilComponent },
  { path: base + 'ajouterJoueur', component: AjouterJoueurComponent },
  { path: base + 'enregistrerPartie', component: EnregistrerPartieComponent },
  { path: base + 'enregistrerVote', component: EnregistrerVoteComponent },
  { path: base + 'listeVote', component: ListeVoteComponent },
  { path: base + 'listeJoueurs', component: ListeJoueursComponent },
  { path: base + 'stats', component: StatsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
