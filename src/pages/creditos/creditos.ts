import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { REFERENCIAS, AUTORES } from "../../data/data.referencias";


@IonicPage()
@Component({
  selector: 'page-creditos',
  templateUrl: 'creditos.html',
})
export class CreditosPage {

  referencia:any={};
  autor:any={};

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.referencia = REFERENCIAS;
    this.autor = AUTORES;


  }



}
