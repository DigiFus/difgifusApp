import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController  } from "ionic-angular";

import { AutenticarProvider } from "../../providers/autenticar/autenticar";
//import { LoginPage } from "../index.paginas";

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  dataIng = {
    "nom_usuario":"",
    "email_usuario":"",
    "pass_usuario":"",
    "passconfirm_usu":"",
    "rolUsu":"",
    "estadoUsu":""

  }
  msgError:any = {};


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl:AlertController,
              private _aut:AutenticarProvider) {




  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  crearUsuario()
  {
    let data = {
      "nom_usuario":this.dataIng['nomb'],
      "email_usuario":this.dataIng['correo'],
      "pass_usuario":this.dataIng['pass'],
      "rol_usuario":"USUARIO",
      "estado_usuario":"ACTIVO"
    };

    if (this.validaPass(data['pass_usuario'],this.dataIng['confirmpass'])) {
      console.log(data);
      this._aut.crearUsuario(data).then((result)=>{
        console.log(result);
        if (result['response']) {
          //cierro esta ventana y muestro la notificacion
            this.navCtrl.pop();
            this.showAlert("Usuario registrado", "Bien, tu usuario fue registrado, ahora puedes loguearte en la app.")
        }
      },(err)=>{

        this.msgError =  err['error'];
        
        if(this.msgError.email_usuario){
          this.showAlert("Error en el correo", this.msgError.email_usuario[0]);
        }
        if (this.msgError.pass_usuario) {
          this.showAlert("Error en el correo", this.msgError.pass_usuario[0]);
        }
        

        
      });



    }else{
      this.showAlert("Error Validación","Hay un problema en las contraseñas, verifique que todo este bien antes de continuar.")
    }


  }

  showAlert(title:string,subtitle:string) {
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: subtitle,
        buttons: ['OK']
      });
      alert.present();
    }

  validaPass(pass:string, passconfirm:string)
  {
    if (pass != undefined && passconfirm != undefined ) {
      if (pass == passconfirm) {
          return true;

      }else{
        return false;
      }
    }else
    {
      return false;
    }


  }

}
