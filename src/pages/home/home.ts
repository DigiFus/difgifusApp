import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { TabsPage } from "../index.paginas";

import { SolicitudesProvider } from "../../providers/solicitudes/solicitudes";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  turnoActualFac:any;
  turnoActualUAE:any;
  constructor(public navCtrl: NavController,
              private _solicitud:SolicitudesProvider,
              private platform:Platform) {
    /*this.turnoAcualFac = "0";
    this.turnoAcualUAE = "0";*/
    //this.rootPage = TabsPage;
    this.navCtrl.setRoot(TabsPage);


  }

  solTurnoUae(){

    let data = {
      "fecha_solicitud":"",
      "acronimo_solicitud":"UAE",
      "consecutivo_solicitud":"",
      "email_usuario":"david@gmail.com",
      "estado_solicitud":"NUEVA"
    }

    this._solicitud.registrar(data).then((result) => {
        console.log(result);
        if (result['response']) {
            this.turnoActualUAE = "UAE "+result['message'];
            console.log(this.turnoActualUAE);
        }


      },(err)=> {
        console.log(err);
    });


  }

  solTurnoFAC(){
    //this.turnoActualFAC = "UAE 123";
  }

  cerrarSesion(){
    localStorage.removeItem('TOKEN');
    //this.navCtrl.pop();
    //this.navCtrl.setRoot(LoginPage);
    this.platform.exitApp();
  }

}
