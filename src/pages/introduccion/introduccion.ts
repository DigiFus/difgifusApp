import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { AjustesProvider } from "../../providers/ajustes/ajustes";
import { LoginPage } from "../index.paginas";

@IonicPage()
@Component({
  selector: 'page-introduccion',
  templateUrl: 'introduccion.html',
})
export class IntroduccionPage {

  slides:any[] = [
    {
      title: "Bienvenido a <b>DigiFUS</b>",
      description: "Esta <b>aplicación</b> te facilita la solicitud de atención en los servicios de <b>Facturación</b> y <b>Unidad de Atención al estudiante</b>",
      image: "assets/imgs/ica-slidebox-img-1.png",
    },
    {
      title: "¿Como funciona?",
      description: "Te lo explicamos en tres simples pasos.<br> 1. Crea tu usuario<br> 2. Inicia sesion<br> 3. Listo, ahora puedes pulsar en el boton solicitar turno, te notificaremos cuando sea tu turno de atención.",
      image: "assets/imgs/ica-slidebox-img-2.png",
    },
    {
      title: "Bien ya lo tienes!!",
      description: "Gracias por hacer parte de nuestra mejora continua.",
      image: "assets/imgs/ica-slidebox-img-3.png",
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _ajustes:AjustesProvider) {



  }
  saltar_tutorial(){

    this._ajustes.ajustes.mostrar_tutorial = false;
    this._ajustes.guardar_storage();

    //Cambiamos el root que queremos definir a nuestra MyApp
    this.navCtrl.setRoot(LoginPage);


  }



}
