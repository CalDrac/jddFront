import { Component, OnInit } from '@angular/core';
import { Joueur } from '../model/joueur.model';
import { JoueurService } from '../service/joueur.service';
import { PropertyService } from '../service/property.service';

@Component({
  selector: 'app-ajouter-joueur',
  templateUrl: './ajouter-joueur.component.html',
  styleUrls: ['./ajouter-joueur.component.css']
})
export class AjouterJoueurComponent implements OnInit {

  addedJoueur: Joueur;
  prenomJoueur: string;
  nomJoueur: string;
  pseudoJoueur: string;
  error: string;
  siteOpen : boolean
  constructor(private joueurService: JoueurService,private propertyService : PropertyService) { }

  ngOnInit(): void {
    this.propertyService.getPropertiesByName("isOpen").subscribe(
      (resOpen) => {
        this.siteOpen = resOpen.valeur == "1"
      }
    )
  }

  enregistrerJoueur() {
    if (this.nomJoueur.trim().length == 0 && this.prenomJoueur.trim().length == 0) {
      this.error = "Merci de renseigner nom, prénom et pseudo du joueur."
    } else {
      this.error = "";
      let joueur: Joueur = new Joueur();
      joueur.nom = this.prenomJoueur + " " + this.nomJoueur
      joueur.pseudo = this.pseudoJoueur;
      this.joueurService.insertJoueur(joueur).subscribe(
        (j) => {
          this.addedJoueur = j;
          this.nomJoueur = ""
          this.prenomJoueur = ""
          this.pseudoJoueur = ""
        }
      )
    }
  }

}
