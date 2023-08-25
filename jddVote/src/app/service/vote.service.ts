import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Vote } from '../model/vote.model';
import { Resultat } from '../model/resultat.model';

// import { Http } from '@angular/http';

@Injectable()
export class VoteService {
    constructor(private httpClient: HttpClient/*,private http: Http*/) { }
    private baseUrl = "http://51.77.212.229:8094"
    //private baseUrl = "http://localhost:8094"
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    getAllVotes() {
        return this.httpClient.get<Vote[]>(this.baseUrl + '/api/votes');
    }

    getVotesForJoueur(idJoueur : number){
        return this.httpClient.get<Vote[]>(this.baseUrl + "/api/vote/id/" + idJoueur);
    }

    insertVote(vote: Vote) {
        return this.httpClient.post<Vote>(this.baseUrl + '/api/vote/save', vote, { headers: this.headers })
    }

    getResultats(){
        return this.httpClient.get<Resultat[]>(this.baseUrl + '/api/vote/summary')
    }
}