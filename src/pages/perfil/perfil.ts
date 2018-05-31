import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoadingController, AlertController  } from "ionic-angular";

import { PerfilProvider } from "../../providers/perfil/perfil";
import { AutenticarProvider } from "../../providers/autenticar/autenticar";

import {LoginPage} from "../index.paginas";


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
  usuario:string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _perf:PerfilProvider,
              private alertCtrl:AlertController,
              private loadingCtrl: LoadingController,
              private _auth:AutenticarProvider) {
                
                this.verificarToken();
                
                
                


          
  }
  verificarToken(){
    this._auth.cargar_token("TOKEN").then(()=>{
      let decripToken = this._auth.verifica_token(this._auth.datos.TOKEN);
      
      
      if(decripToken){
        this.usuario = decripToken.Usuario;
        this.Loading();
        this.obtenerPerfil(this.usuario);
        
        
        
      }else{
        this._auth.cerrarSesion();
        this.navCtrl.setRoot(LoginPage);
      }
      
      
    })
  }

  obtenerPerfil(usuario:any){
    
    
    this._perf.obtenerPerfil(usuario).then( (result)=>{
      //if (result['result'] != null) {
          
            //this.data = result;
            
            this.nombre = result['nom_usuario'];
            this.correo = result['email_usuario'];
      //}

  })
  }


  actualizar(){
    

    console.log(this.pass,this.passConfirm);
    
    if (this.pass == "" && this.passConfirm == "") {
      
      //data.nom_usuario = this.nombre;
      let datos = {
        nom_usuario:this.nombre
      }
      
      this.Loading();
      this._perf.actualizarPerfil(datos, this.usuario).then( (result)=>{
        console.log(result);
        
        if(result['response']){
          this.showAlert('Actualización correcta', 'Tus datos fueron actualizados correctamente');
        }
        
      })
      
      
    } else {
      
      if(this.validaPass(this.pass,this.passConfirm)){
        let data = {
          nom_usuario:this.nombre,
          pass_usuario:this.pass
        };
    
        
        
        this.Loading();
        this._perf.actualizarPerfil(data, this.usuario).then( (result)=>{
          this.showAlert('Actualización correcta', 'Tus datos fueron actualizados correctamente');
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
  cerrarSesion(){
    this._auth.cerrarSesion();
    this.navCtrl.setRoot(LoginPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

}
