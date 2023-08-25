import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Joueur } from '../model/joueur.model';

// import { Http } from '@angular/http';

@Injectable()
export class JoueurService {
    constructor(private httpClient: HttpClient/*,private http: Http*/) { }
    //private baseUrl = "http://51.77.212.229:8094"
    private baseUrl = "http://localhost:8094"
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    getAllJoueurs() {
        return this.httpClient.get<Joueur[]>(this.baseUrl + '/api/joueurs');
    }

    getJoueur(id: number) {
        return this.httpClient.get<Joueur>(this.baseUrl + '/api/joueur/id/'+ id);
    }

    insertJoueur(joueur: Joueur) {
        return this.httpClient.post<Joueur>(this.baseUrl + '/api/joueur/save', joueur, { headers: this.headers })
    }
}