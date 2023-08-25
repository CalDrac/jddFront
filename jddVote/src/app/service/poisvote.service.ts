import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Joueur } from '../model/joueur.model';
import { Jeu } from '../model/jeu.model';
import { PoidsVote } from '../model/poidsvote.model';

// import { Http } from '@angular/http';

@Injectable()
export class PoidsVoteService {
    constructor(private httpClient: HttpClient/*,private http: Http*/) { }
    //private baseUrl = "http://51.77.212.229:8094"
    private baseUrl = "http://localhost:8094"
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    getAllPoidsVotes() {
        return this.httpClient.get<PoidsVote[]>(this.baseUrl + '/api/poidsvote');
    }


}