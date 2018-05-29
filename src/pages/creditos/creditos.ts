import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { REFERENCIAS, AUTORES } from "../../data/data.referencias";
import {LoginPage} from "../index.paginas";
import { AutenticarProvider } from "../../providers/autenticar/autenticar";

@IonicPage()
@Component({
  selector: 'page-creditos',
  templateUrl: 'creditos.html',
})
export class CreditosPage {

  referencia:any={};
  autor:any={};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _auth:AutenticarProvider) {

    this.referencia = REFERENCIAS;
    this.autor = AUTORES;


  }
  cerrarSesion(){
    this._auth.cerrarSesion();
    this.navCtrl.setRoot(LoginPage);
  }



}
