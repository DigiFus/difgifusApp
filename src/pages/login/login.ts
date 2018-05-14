import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { RegistroPage } from "../index.paginas";

import { AutenticarProvider } from "../../providers/autenticar/autenticar";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  registro:any;

  Correo:string="";
  Password:string="";

  constructor(public navCtrl: NavController,
            public navParams: NavParams,
            private _aut:AutenticarProvider,
            private viewCtrl:ViewController) {
    this.registro = RegistroPage;
  }

  ingresar(){
    /*this.Correo = Correo;
    this.Password = Password;
    console.log(this.Correo, this.Password);*/
    this._aut.autenticar(this.Correo, this.Password);
    /*this._aut.autenticar(this.Correo, this.Password)
              .subscribe( ()=>{

              })*/

  }

}
