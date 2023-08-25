import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Joueur } from '../model/joueur.model';
import { Jeu } from '../model/jeu.model';

// import { Http } from '@angular/http';

@Injectable()
export class JeuService {
    constructor(private httpClient: HttpClient/*,private http: Http*/) { }
    //private baseUrl = "http://51.77.212.229:8094"
    private baseUrl = "http://localhost:8094" 
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    getAllJeux() {
        return this.httpClient.get<Jeu[]>(this.baseUrl + '/api/jeux');
    }

    getJeu(id: number) {
        return this.httpClient.get<Jeu>(this.baseUrl + '/api/jeu/id/'+ id);
    }

    getJeuxByCategorie(categorie : String, forVote : boolean){
        return this.httpClient.get<Jeu[]>(this.baseUrl + '/api/jeux/'+categorie + '/' + forVote);
    }

}