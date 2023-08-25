import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../service/property.service';

@Component({
  selector: 'app-bandeau-status',
  templateUrl: './bandeau-status.component.html',
  styleUrls: ['./bandeau-status.component.css']
})
export class BandeauStatusComponent implements OnInit {

  siteOuvert: boolean = false
  fermetureProche : boolean = false
  constructor(private propertyService : PropertyService) { }

  ngOnInit(): void {
    this.propertyService.getPropertiesByName("isOpen").subscribe(
      (resOpen) => {
        this.siteOuvert = (resOpen.valeur == "1");
      }
    )
    this.propertyService.getPropertiesByName("closingSoon").subscribe(
      (resClosingSoon) =>{
        this.fermetureProche = (resClosingSoon.valeur == "1");
      }
    )
  }

}
