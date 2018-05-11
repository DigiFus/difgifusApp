import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  turnoAcualFac:string;
  turnoAcualUAE:string;
  constructor(public navCtrl: NavController) {
    this.turnoAcualFac = "0";
    this.turnoAcualUAE = "0";
  }

}
