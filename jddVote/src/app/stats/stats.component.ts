import { Component, OnInit } from '@angular/core';
import { JoueurService } from '../service/joueur.service';
import { JeuService } from '../service/jeu.service';
import { VoteService } from '../service/vote.service';
import { PartieService } from '../service/partie.service';
import { Joueur } from '../model/joueur.model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  nbJoueurs: number
  premierJoueur: Joueur
  dernierJoueur : Joueur
  firstVoter: Joueur
  nbVotes : number
  nbMaxParties: number

  constructor(private joueurService: JoueurService,private jeuService: JeuService, private voteService: VoteService, private partieService: PartieService) { }

  ngOnInit(): void {

    this.joueurService.getAllJoueurs().subscribe(
      (resAllJoueurs) =>{
        this.nbJoueurs = resAllJoueurs.length
        this.premierJoueur = resAllJoueurs[0]
        this.dernierJoueur = resAllJoueurs[length-1]
      }
    )
    this.voteService.getAllVotes().subscribe(
      (resAllVotes) => {
        this.nbVotes = resAllVotes.length
        this.joueurService.getJoueur(resAllVotes[0].idJoueur).subscribe(
          (resJoueur) => {
            this.firstVoter = resJoueur
          }
        )
      }
    )

    this.partieService.getMaxParties().subscribe(
      (resMaxParties) => {
        this.nbMaxParties = resMaxParties;
      }
    )

  }

}
