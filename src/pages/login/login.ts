import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { RegistroPage,HomePage } from "../index.paginas";

import { LoadingController, AlertController  } from "ionic-angular";

import { AutenticarProvider } from "../../providers/autenticar/autenticar";
import { ControlStorangeProvider } from "../../providers/control-storange/control-storange";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  registro:any;
  msg:string = "";


  userData = {"Correo": "","Password": ""};

  constructor(public navCtrl: NavController,
            public navParams: NavParams,
            private _aut:AutenticarProvider,
            private _CtrStorange:ControlStorangeProvider,
            private viewCtrl:ViewController,
            private alertCtrl:AlertController,
            private loadingCtrl: LoadingController) {
    this.registro = RegistroPage;
  }

  ingresar(){

    console.log(this.userData);
    //pasamos los datos capturados en el arreglo de datos a enviar
    let data= {
      "Correo":this.userData['Correo'],
      "Password":this.userData['Password']
    }
    this.Loading();
    if (this.userData['Correo'] =="" || this.userData['Password'] =="") {
        this.showAlert("Error", "Valide que diligencio el correo y la contraseña");
        return;
    }else{
       this._aut.autenticar(data).then((result) => {

         //validamos si se creo el token
         if (result['result'] != null) {
          this._CtrStorange.guardar_storage('TOKEN',JSON.stringify(result['result']));
          //localStorage.setItem('TOKEN',JSON.stringify(result['result']))
          //this.navCtrl.push(HomePage);
          this.navCtrl.setRoot(HomePage);
         }else{
           this.msg = result['message'];
         }

       }, (err) => {
         console.log(err);

       });
    }

   }

   cerrarSesion(){
     localStorage.removeItem('TOKEN');
     this.navCtrl.pop();
   }

   Loading() {
    let loader = this.loadingCtrl.create({
      content: "Por favor espere ...",
      duration: 3000
    });
    loader.present();
  }

  showAlert(title:string,subtitle:string) {
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: subtitle,
        buttons: ['OK']
      });
      alert.present();
    }




}
