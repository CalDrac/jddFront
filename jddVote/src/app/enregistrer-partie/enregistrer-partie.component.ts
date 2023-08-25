import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Joueur } from '../model/joueur.model';
import { JoueurService } from '../service/joueur.service';
import { PartieService } from '../service/partie.service';
import { JeuService } from '../service/jeu.service';
import { Jeu } from '../model/jeu.model';
import { Observable } from 'rxjs';
import { PropertyService } from '../service/property.service';
import { tryParse } from 'selenium-webdriver/http';
import { element } from 'protractor';

@Component({
  selector: 'app-enregistrer-partie',
  templateUrl: './enregistrer-partie.component.html',
  styleUrls: ['./enregistrer-partie.component.css']
})
export class EnregistrerPartieComponent implements OnInit {
  listeJoueurs = [''];
  //listeJoueurObjet: Joueur[] = []
  error: string
  constructor(private propertyService : PropertyService, private router: Router, private joueurService: JoueurService, private partieService: PartieService, private jeuService: JeuService) { }
  listeJeux: Observable<Jeu[]>
  selectedJeu: Jeu = null;
  siteOpen : boolean

  ngOnInit(): void {
    this.propertyService.getPropertiesByName("isOpen").subscribe(
      (resOpen) => {
        this.siteOpen = resOpen.valeur == "1"
      }
    )
    this.listeJeux = this.jeuService.getAllJeux()
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  ajouterJoueur() {
    this.listeJoueurs.push('');
  }

  onKeypressEvent(event: any){

    if(event.charCode < 48 || event.charCode > 57 ){
      event.preventDefault()
    }
  }

  retirerJoueur(index: number) {
    console.log("Index : " + index);
    let joueurToDelete: Joueur
    if (this.listeJoueurs.length > 1 || index != 0) {
      this.listeJoueurs.splice(index, 1)
    }
    else {
      this.listeJoueurs[index] = ''
    }
    this.error = ""
  }

  async enregistrerPartie() {
    //enregistrer partie
    
    if (this.selectedJeu != null) {
      console.log("Selected jeu : " + this.selectedJeu.id)
      //vérifier si joueur existe déjà
      this.error = "";
      for(const elt of this.listeJoueurs){
        console.log("log joueur " + elt )

        const joueur = await this.joueurService.getJoueur(Number.parseInt(elt)).toPromise()
        if(joueur == null){
          console.log("log joueur " + elt + " non trouvé" )
          this.error += "Joueur n°" + elt +  " n'existe pas ! <br> "
        }
        console.log("Post promise " + elt)
      };
      console.log("Post foreach")
      console.log(this.error)
      if(this.error.length == 0){
      this.partieService.insertPartie(this.listeJoueurs, this.selectedJeu.id.toString())
        .subscribe(
          () => {
            this.router.navigate(['/']);
          }
        )
      }
    }else{
      this.error = "Selectionner un jeu !"
    }
  }
}
