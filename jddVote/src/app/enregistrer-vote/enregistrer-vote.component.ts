import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Jeu } from '../model/jeu.model';
import { JeuService } from '../service/jeu.service';
import { Joueur } from '../model/joueur.model';
import { JoueurService } from '../service/joueur.service';
import { Observable, Observer, of } from 'rxjs';
import { VoteService } from '../service/vote.service';
import { Vote } from '../model/vote.model';
import { PartieService } from '../service/partie.service';
import { PropertyService } from '../service/property.service';

@Component({
  selector: 'app-enregistrer-vote',
  templateUrl: './enregistrer-vote.component.html',
  styleUrls: ['./enregistrer-vote.component.css']
})
export class EnregistrerVoteComponent implements OnInit {

  siteOpen: boolean
  dejaVote = false
  joueur: Joueur;
  voteJeuFamilleAvailable = false;
  voteJeuExpertAvailable = false;
  joueurChecked = false;
  jeuxFamille: Jeu[] = []
  jeuxExpert: Jeu[] = []
  idJoueur: string =""
  jeuFamilleVoted: number = null
  jeuExpertVoted: number = null
  rechercheEnCours : boolean = false
  listeJeuxFamille = new Observable<Jeu[]>((observer: Observer<Jeu[]>) => {
    // setInterval(() => observer.next(this.listeJoueur.sort((a, b) => a.toString().localeCompare(b.toString()))), 1000);
    setInterval(() => observer.next(this.jeuxFamille), 1000);
  });
  listeJeuxExpert = new Observable<Jeu[]>((observer: Observer<Jeu[]>) => {
    // setInterval(() => observer.next(this.listeJoueur.sort((a, b) => a.toString().localeCompare(b.toString()))), 1000);
    setInterval(() => observer.next(this.jeuxExpert), 1000);
  });

  constructor(private propertyService : PropertyService, private router: Router, private jeuService: JeuService, private joueurService: JoueurService, private voteService: VoteService, private partieService: PartieService) { }


  ngOnInit(): void {

    this.propertyService.getPropertiesByName("isOpen").subscribe(
      (resOpen) => {
        this.siteOpen = resOpen.valeur == "1"
      }
    )
    //répartir jeux
    /*
    this.jeuService.getAllJeux().subscribe(
      (resJeux) => {
        resJeux.forEach(
          (jeu) => {
            if (jeu.categorie == "Famille") {
              this.jeuxFamille.push(jeu)
            } else {
              this.jeuxExpert.push(jeu)
            }
          }
        )
      }
    )*/
  }

  valuechange(newValue:string) {
    
    this.idJoueur = newValue
    this.joueurChecked = false
    this.voteJeuExpertAvailable = false;
    this.voteJeuFamilleAvailable = false;
    this.joueur = null;
  }

  onKeypressEvent(event: any){

    if(event.charCode < 48 || event.charCode > 57 ){
      event.preventDefault()
    }
  }

  onChangeEvent(event: any){

    console.log(event.target.value);

  }

  checkVotesJoueur() {
    this.rechercheEnCours = true;
    this.joueurChecked = true;
if(!Number.isInteger(Number.parseInt(this.idJoueur))){
  alert("Erreur dans le numéro renseigné.")
}
    this.joueurService.getJoueur(Number(this.idJoueur)).subscribe(
      (resJoueur) => {
        this.rechercheEnCours = false;
        this.joueur = resJoueur
          this.voteService.getVotesForJoueur(resJoueur.id).subscribe(
            (resVotes) => {
              this.voteJeuExpertAvailable = true;
              this.voteJeuFamilleAvailable = true;
              if (resVotes.length != 0) {
                resVotes.forEach(
                  (vote) => {
                    this.jeuService.getJeu(vote.idJeu).subscribe(
                      (resJeu) => {
                        if (resJeu.categorie == "Famille") {
                          this.voteJeuFamilleAvailable = false;
                        }
                        if (resJeu.categorie == "Expert") {
                          this.voteJeuExpertAvailable = false;
                        }
                      }
                    )
                  }
                )
              }
            }
          )
          this.partieService.getPartiesForJoueur(Number(this.idJoueur)).subscribe(
            (resParties) => {
              resParties.forEach(
                (itemPartie) => {
                  this.jeuService.getJeu(itemPartie.idJeu).subscribe(
                    (resJeu) => {
                      if (resJeu.categorie == "Famille") {
                        this.jeuxFamille.push(resJeu)
                      }
                      if (resJeu.categorie == "Expert") {
                        this.jeuxExpert.push(resJeu);
                      }
                    }
                  )
                }
              )
            }
          )
      }
    )
  }



  enregistrerVote() {
    //enregistrer vote
    let vote: Vote;
    if (this.jeuFamilleVoted != null) {
      vote = new Vote()
      vote.idJeu = this.jeuFamilleVoted
      vote.idJoueur = Number(this.idJoueur)
      this.voteService.insertVote(vote).subscribe();
    }
    if (this.jeuExpertVoted != null) {
      vote = new Vote();
      vote.idJeu = this.jeuExpertVoted
      vote.idJoueur = Number(this.idJoueur)
      this.voteService.insertVote(vote).subscribe();
    }
    this.valuechange("")
    //this.router.navigate(['/']);
  }

}
