import { Component, OnInit } from '@angular/core';
import { Jeu } from '../model/jeu.model';
import { Observable, Observer } from 'rxjs';
import { JeuService } from '../service/jeu.service';
import { Vote } from '../model/vote.model';
import { VoteService } from '../service/vote.service';
import { Resultat } from '../model/resultat.model';
import { PartieService } from '../service/partie.service';
import { PoidsVoteService } from '../service/poisvote.service';

@Component({
  selector: 'app-liste-vote',
  templateUrl: './liste-vote.component.html',
  styleUrls: ['./liste-vote.component.css']
})
export class ListeVoteComponent implements OnInit {

  listeJeuxObs: Observable<Jeu[]>
  listeJeuxExpertObs: Observable<Jeu[]>
  listeJeux: Jeu[]
  maxVotesFamille: number
  maxVotesExpert: number

  podiumFamille: Resultat[] = []
  podiumExpert: Resultat[] = []
  podiumFamilleMethode2: Resultat[] = []
  podiumExpertMethode2: Resultat[] = [] 
  winnerJeuFamille: Jeu 
  exAequoJeuxFamille: Jeu[]
  winnerJeuExpert: Jeu 
  exAequoJeuxExpert: Jeu[]
  listeCountVotes: Map<Jeu, number>
  listeCountVotesExpert: Map<Jeu, number>
  listeCountVotesFamille: Map<Jeu, number>
  listeCountVotesExpertMethode2: Map<Jeu, number>
  listeCountVotesFamilleMethode2: Map<Jeu, number>
  sortedListeCountVotesExpert: Map<Jeu, number>
  sortedListeCountVotesFamille: Map<Jeu, number>
  listeCountVotesObs = new Observable<Map<Jeu, number>>((observer: Observer<Map<Jeu, number>>) => {
    setInterval(() => observer.next(this.listeCountVotes), 1000);
  });
  podiumFamilleObs = new Observable<Resultat[]>((observer: Observer<Resultat[]>) => {
    setInterval(() => observer.next(this.podiumFamille), 1000);
  });
  podiumExpertObs = new Observable<Resultat[]>((observer: Observer<Resultat[]>) => {
    setInterval(() => observer.next(this.podiumExpert), 1000);
  });

  podiumFamilleObsMethode2 = new Observable<Resultat[]>((observer: Observer<Resultat[]>) => {
    setInterval(() => observer.next(this.podiumFamilleMethode2), 1000);
  });
  podiumExpertObsMethode2 = new Observable<Resultat[]>((observer: Observer<Resultat[]>) => {
    setInterval(() => observer.next(this.podiumExpertMethode2), 1000);
  });

  constructor(private jeuService: JeuService, private poidsVoteService: PoidsVoteService, private voteService: VoteService, private partieService: PartieService) { }

  ngOnInit(): void { 
    this.listeJeuxObs = this.jeuService.getJeuxByCategorie("Famille", true)
    this.listeJeuxExpertObs = this.jeuService.getJeuxByCategorie("Expert", true) 
   /* 
    this.listeCountVotes = new Map<Jeu, number>()
    this.listeCountVotesExpert = new Map<Jeu, number>()
    this.listeCountVotesFamille = new Map<Jeu, number>()
    this.listeCountVotesExpertMethode2 = new Map<Jeu, number>()
    this.listeCountVotesFamilleMethode2 = new Map<Jeu, number>()
    this.listeJeuxObs = this.jeuService.getAllJeux()
    this.poidsVoteService.getAllPoidsVotes().subscribe(
      (resInfos) => {

      
    this.listeJeuxObs.subscribe(
      (resListeJeux) => {
        this.listeJeux = resListeJeux
        resListeJeux.forEach(
          (jeu) => {
            if (jeu.categorie == "Famille") {
              
              this.listeCountVotesFamille.set(jeu, 0)
              this.listeCountVotesFamilleMethode2.set(jeu,0)
            }
            if (jeu.categorie == "Expert") {
              this.listeCountVotesExpert.set(jeu, 0)
              this.listeCountVotesExpertMethode2.set(jeu,0)
            }
            this.listeCountVotes.set(jeu, 0)
          }
        )
        this.voteService.getAllVotes().subscribe(
          (resListeVote) => {
            resListeVote.forEach(
              (vote) => {
                this.listeCountVotes.forEach((val, key, map) => {
                  if (key.id == vote.idJeu) {
                    let nb = this.listeCountVotes.get(key)
                    nb = nb + 1;
                    this.listeCountVotes.set(key, nb)
                  }
                }
                )
                this.listeCountVotesFamille.forEach((val, key, map) => {
                  if (key.id == vote.idJeu) {
                    let nb = this.listeCountVotesFamille.get(key)
                    nb = nb + 1;
                    this.listeCountVotesFamille.set(key, nb)
                  }
                }
                )
                this.listeCountVotesExpertMethode2.forEach((val, key, map) => {
                  if (key.id == vote.idJeu) {
                    this.partieService.countPartiesForJoueur(vote.idJoueur,"Expert").subscribe(
                      (resCount) => {
                        let valeurVote = 0;
                        if(resCount > resInfos.length){
                          valeurVote = resInfos[resInfos.length -1].valeurVote
                        }else{
                          valeurVote = resInfos[resCount.valueOf() -1].valeurVote
                        }
                        let nb = this.listeCountVotesExpertMethode2.get(key)
                        nb = nb + valeurVote;
                        this.listeCountVotesExpertMethode2.set(key, nb)
                      }
                    )

                  }
                }
                )

                this.listeCountVotesFamilleMethode2.forEach(
                  (val, key, map) => {
                    if (key.id == vote.idJeu) {
                      this.partieService.countPartiesForJoueur(vote.idJoueur,"Famille").subscribe(
                        (resCount) => {
                          let valeurVote = 0;
                          if(resCount > resInfos.length){
                            valeurVote = resInfos[resInfos.length -1].valeurVote
                          }else{
                            valeurVote = resInfos[resCount.valueOf() -1].valeurVote
                          }
                          let nb = this.listeCountVotesFamilleMethode2.get(key)
                          nb = nb + valeurVote;
                          this.listeCountVotesFamilleMethode2.set(key, nb)
                        }
                      )
                    }
                  }
                )
                this.listeCountVotesExpert.forEach((val, key, map) => {
                  if (key.id == vote.idJeu) {
                    let nb = this.listeCountVotesExpert.get(key)
                    nb = nb + 1;
                    this.listeCountVotesExpert.set(key, nb)
                  }
                }
                )
              }
            )

            setTimeout(()=>{



              this.maxVotesFamille = -1;
              let resultatVoteFamille: Resultat;
              this.listeCountVotesFamille.forEach((val, key, map) => {
                resultatVoteFamille = new Resultat()
                resultatVoteFamille.jeu = key;
                resultatVoteFamille.nombreVotes = val;
                this.podiumFamille.push(resultatVoteFamille)

              })
              this.podiumFamille.sort((resA, resB) => resB.nombreVotes - resA.nombreVotes)
  
              this.maxVotesExpert = -1;
              let resultatVoteExpert: Resultat;
              this.listeCountVotesExpert.forEach((val, key, map) => {
                resultatVoteExpert = new Resultat()
                resultatVoteExpert.jeu = key;
                resultatVoteExpert.nombreVotes = val;
                this.podiumExpert.push(resultatVoteExpert)

              })
              this.podiumExpert.sort((resA, resB) => resB.nombreVotes - resA.nombreVotes)
  
  
              this.maxVotesFamille = -1;
              let resultatVoteFamilleMethode2: Resultat;
              this.listeCountVotesFamilleMethode2.forEach((val, key, map) => {
                resultatVoteFamilleMethode2 = new Resultat()
                resultatVoteFamilleMethode2.jeu = key;
                resultatVoteFamilleMethode2.nombreVotes = val;
                this.podiumFamilleMethode2.push(resultatVoteFamilleMethode2)

              })
              this.podiumFamilleMethode2.sort((resA, resB) => resB.nombreVotes - resA.nombreVotes)
  
              this.maxVotesExpert = -1;
              let resultatVoteExpertMethode2: Resultat;
              this.listeCountVotesExpertMethode2.forEach((val, key, map) => {
                resultatVoteExpertMethode2 = new Resultat()
                resultatVoteExpertMethode2.jeu = key;
                resultatVoteExpertMethode2.nombreVotes = val;
                this.podiumExpertMethode2.push(resultatVoteExpertMethode2)

              })
              this.podiumExpertMethode2.sort((resA, resB) => resB.nombreVotes - resA.nombreVotes)



            }, 2000);
            
            


          }
        )
      }
    )
      })
*/
  }

}
