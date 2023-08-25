import { Component, OnInit } from '@angular/core';
import { JoueurService } from '../service/joueur.service';
import { Observable, Observer } from 'rxjs';
import { Joueur } from '../model/joueur.model';

@Component({
  selector: 'app-liste-joueurs',
  templateUrl: './liste-joueurs.component.html',
  styleUrls: ['./liste-joueurs.component.css']
})
export class ListeJoueursComponent implements OnInit {
  nomOuPseudoJoueur: string
  //listeJoueurs: Observable<Joueur[]>
  joueursList : Joueur[]
  masterList : Joueur[]
  listeJoueurs = new Observable<Joueur[]>((observer: Observer<Joueur[]>) => {
    // setInterval(() => observer.next(this.listeJoueur.sort((a, b) => a.toString().localeCompare(b.toString()))), 1000);
    setInterval(() => observer.next(this.joueursList), 1000);
  });
  constructor(private joueurService: JoueurService) { }

  ngOnInit(): void {
    //this.listeJoueurs = this.joueurService.getAllJoueurs();
    this.joueurService.getAllJoueurs().subscribe(
      (resJoueurs) => {
        this.joueursList = resJoueurs
        this.masterList = resJoueurs
      }
    )
  }

  onKeyUpEvent(event: any){
    
    console.log(event.target.value);
    if(event.target.value == ""){
      this.joueursList = this.masterList
    }else{
    this.joueursList = []
    this.masterList.forEach(elt => {
      if(elt.nom.toUpperCase().includes(event.target.value.toUpperCase()) || (elt.pseudo != null && elt.pseudo.toUpperCase().includes(event.target.value.toUpperCase()))){
        this.joueursList.push(elt)
      }
    })
  }
  }
}
