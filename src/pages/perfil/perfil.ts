import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoadingController, AlertController  } from "ionic-angular";

import { PerfilProvider } from "../../providers/perfil/perfil";

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  data:any;
  nombre:string="";
  correo:string="";
  pass:string="";
  passConfirm:string="";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _perf:PerfilProvider,
              private alertCtrl:AlertController,
              private loadingCtrl: LoadingController) {

                this.obtenerPerfil();

          
  }

  obtenerPerfil(){
    this._perf.obtenerPerfil().then( (result)=>{
      //if (result['result'] != null) {
          console.log(result);
            //this.data = result;
            
            this.nombre = result['nom_usuario'];
            this.correo = result['email_usuario'];
      //}

  })
  }


  actualizar(){
    let data = {
      nom_usuario:this.nombre,
      pass_usuario:""
    };


    console.log(this.pass,this.passConfirm);
    
    if (this.pass == "" && this.passConfirm == "") {
      
      data.nom_usuario = this.nombre;
      this.Loading();
      this._perf.actualizarPerfil(data).then( (result)=>{
        
        if(result['response']){
          this.showAlert('Actualización correcta', 'Tus datos fueron actualizados correctamente');
        }
        
      })
      
      
    } else {
      
      if(this.validaPass(this.pass,this.passConfirm)){

        data.nom_usuario = this.nombre;
        data.pass_usuario = this.pass;
        this.Loading();
        this._perf.actualizarPerfil(data).then( (result)=>{
          console.log(result);
        },(err)=>{
                  
        
        if(err['error'].pass_usuario){
          this.showAlert('Error al Actualizar', err['error'].pass_usuario);
        }
        
      });

      } else {
        this.showAlert('Error al validar las contraseñas','Detectamos un error al modificar su contraseña, verifique y vuelva a intentar.');

      }
      
    }

    



  }

  validaPass(pass:string, passconfirm:string){
    if (pass != undefined && passconfirm != undefined) {
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

  showAlert(title:string,subtitle:string) {
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: subtitle,
        buttons: ['OK']
      });
      alert.present();
  }
  Loading() {
    let loader = this.loadingCtrl.create({
      content: "Estamos procesando sus datos ...",
      duration: 2000
    });
    loader.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

}
