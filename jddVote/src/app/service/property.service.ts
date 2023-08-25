import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Joueur } from '../model/joueur.model';
import { Jeu } from '../model/jeu.model';
import { Property } from '../model/property.model';

// import { Http } from '@angular/http';

@Injectable()
export class PropertyService {
    constructor(private httpClient: HttpClient/*,private http: Http*/) { }
    //private baseUrl = "http://51.77.212.229:8094"
    private baseUrl = "http://localhost:8094"
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    getAllProperties() {
        return this.httpClient.get<Property[]>(this.baseUrl + '/api/properties');
    }

    getPropertiesByName(nom: string) {
        return this.httpClient.get<Property>(this.baseUrl + '/api/property/name/'+ nom);
    }

}