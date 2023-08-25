import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Partie } from '../model/partie.model';

// import { Http } from '@angular/http';

@Injectable()
export class PartieService {
    constructor(private httpClient: HttpClient/*,private http: Http*/) { }
    //private baseUrl = "http://51.77.212.229:8094"
    private baseUrl = "http://localhost:8094"
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    getAllParties() {
        return this.httpClient.get<Partie[]>(this.baseUrl + '/api/parties');
    }

    getPartiesForJoueur(idJoueur : number){
        return this.httpClient.get<Partie[]>(this.baseUrl + '/api/partie/' + idJoueur);
    }

    insertPartie(listeJoueurs : string[],idJeu : string) {
        let json : string;
        json = "{\"partie\": {\"listeIdJoueurs\":[";
        listeJoueurs.forEach(
            (j) => {
                json += "\"" + j + "\",";
            }
        )
        json = json.slice(0,json.length -1)
        json +="],\"idJeu\" : \""+ idJeu +"\"}}"
        console.log(json);
        return this.httpClient.post<Partie>(this.baseUrl + '/api/partie/save/',json, { headers: this.headers })
    }

    countPartiesForJoueur(idJoueur : number, type : string){
        return this.httpClient.get<Number>(this.baseUrl + '/api/partie/count/' + idJoueur + '/' + type);
    }

    getMaxParties(){
        return this.httpClient.get<number>(this.baseUrl + '/api/partie/max');
    }
}