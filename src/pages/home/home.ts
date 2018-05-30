import { Component } from '@angular/core';
import { NavController, Platform, AlertController  } from 'ionic-angular';
import { Storage } from '@ionic/storage';


import { AutenticarProvider } from "../../providers/autenticar/autenticar";
//import { ControlStorangeProvider } from "../../providers/control-storange/control-storange";

import { SolicitudesProvider } from "../../providers/solicitudes/solicitudes";

import { LoginPage } from "../index.paginas";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  turnoActualUAE:string = "0";
  turnoActualFAC:string ="0";
  dataUsuario:any;
  turnStorage:any;
  turnStorageUAE:any;
  turnStorageFAC:any;
  usuario:string;
  fActual:any;

  data = {
      fecha_solicitud:"",
      acronimo_solicitud:"",
      consecutivo_solicitud:"",
      email_usuario:"",
      estado_solicitud:""
  }

  constructor(public navCtrl: NavController,
              private _solicitud:SolicitudesProvider,
              private platform:Platform,
              private _auth:AutenticarProvider,
              private storage:Storage,
              private alertCtrl: AlertController) {

                this.verificarToken();
                this.fActual = new Date();
                
                this.cargar_storageUAE('TurnUAE');
                this.cargar_storageFAC('TurnFAC');
                

  }

  verificarToken(){
    this._auth.cargar_token("TOKEN").then(()=>{
      let decripToken = this._auth.verifica_token(this._auth.datos.TOKEN);
      
      
      if(decripToken){
        this.usuario = decripToken.Usuario;
        
        
      }else{
        this._auth.cerrarSesion();
        this.navCtrl.setRoot(LoginPage);
      }
      
      
    })
  }

  solUAE(){
    
    
            let newFecha = this.fActual.getFullYear()+"-"+(this.fActual.getMonth()+1)+"-"+this.fActual.getDate();
            this._solicitud.obtenerTurnosDiaUAE(newFecha).then((result)=>{
              console.log('num turnos UAE '+result['numTurnos']);
              if(result['numTurnos'] > 0){
                this.alertConfirmUAE(result['numTurnos']*3, "");
                                
              }else{

                this.alertConfirmUAE(result['numTurnos']*3, "Eres el primero en la lista de espera, Pulsa en el boton Solicitar y dirigete al modulo de atención.");
              }
              
            })
  }
  solFAC(){
            let newFecha = this.fActual.getFullYear()+"-"+(this.fActual.getMonth()+1)+"-"+this.fActual.getDate();
            this._solicitud.obtenerTurnosDiaFAC(newFecha).then((result)=>{
              console.log('num turnos FAC '+result['numTurnos']);
              
              if(result['numTurnos'] > 0){

                
                

                this.alertConfirmFAC(result['numTurnos']*3, "");
                
                                
              }else{

                this.alertConfirmFAC(result['numTurnos']*3, "Eres el primero en la lista de espera, Pulsa en el boton Solicitar y dirigete al modulo de atención.");
              }
              
            })

  }
  

  solTurnoUae(){
    

    this.data = {
      "fecha_solicitud":"",
      "acronimo_solicitud":"UAE",
      "consecutivo_solicitud":"",
      "email_usuario":this.usuario,
      "estado_solicitud":"NUEVA"
    } 

    this._solicitud.registrar(this.data).then((result) => {
        
        if (result['response']) {
            this.turnoActualUAE = "UAE "+result['message'];
            this.guardar_storage('TurnUAE',this.turnoActualUAE);
            
        }


      },(err)=> {
        console.log(err);
    });


  }

  solTurnoFAC(){
    
    
    this.data = {
      "fecha_solicitud":"",
      "acronimo_solicitud":"FAC",
      "consecutivo_solicitud":"",
      "email_usuario":this.usuario,
      "estado_solicitud":"NUEVA"
    }
    
    
    this._solicitud.registrar(this.data).then((result) => {
        
        if (result['response']) {
            this.turnoActualFAC = "FAC "+result['message'];
            this.guardar_storage('TurnFAC',this.turnoActualFAC);

        }


      },(err)=> {
        console.log(err);
    });
  }


  alertConfirmUAE(minutos:any, mensaje:any) {

    if (mensaje ==""){
      mensaje = 'El tiempo aproximado de atención es de '+minutos+' minutos, Desea solicitar su turno?'; 
    }


    let alert = this.alertCtrl.create({
      title: 'Tiempo de atención',
      message: mensaje,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            return;
          }
        },
        {
          text: 'Solicitar',
          handler: () => {
            this.solTurnoUae();
            //console.log('Buy clicked '+f.getFullYear()+"/"+(f.getMonth()+1)+"/"+f.getDate());
          }
        }
      ]
    });
    alert.present();
  }
  alertConfirmFAC(minutos:any, mensaje:any) {

    if (mensaje ==""){
      mensaje = 'El tiempo aproximado de atención es de '+minutos+' minutos, Desea solicitar su turno?'; 
    }

    let alert = this.alertCtrl.create({
      title: 'Tiempo de atención',
      message: mensaje,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            return;
          }
        },
        {
          text: 'Solicitar',
          handler: () => {
            this.solTurnoFAC();
            //console.log('Buy clicked '+f.getFullYear()+"/"+(f.getMonth()+1)+"/"+f.getDate());
          }
        }
      ]
    });
    alert.present();
  }


  cerrarSesion(){
    this._auth.cerrarSesion();
    this.navCtrl.setRoot(LoginPage);
  }



  cargar_storageUAE(key:any){

      if (this.platform.is("cordova") || this.platform.is("android")) {
        //Estamos en el dispositivo
        console.log("Inicializando storange");
        this.storage.ready().then(()=>{
            console.log("Storange Listo");
            return new Promise((resolve)=>{
              
              this.storage.get(key).then(valObtenido=>{
                if(valObtenido){

                  this.turnoActualUAE = valObtenido;
                  resolve(valObtenido);
                }else{
                  this.turnoActualUAE = "0";
                }

              }).catch((err)=>{
                console.log(err);
                
              });
            })
        });


      }else{
      //estamos en desktop
        if (localStorage.getItem(key)) {
            this.turnoActualUAE =  JSON.parse(localStorage.getItem(key));
        }

     

      }

  }

  cargar_storageFAC(key:any){

    if (this.platform.is("cordova") || this.platform.is("android")) {
      //Estamos en el dispositivo
      console.log("Inicializando storange");
      this.storage.ready().then(()=>{
          console.log("Storange Listo");
          return new Promise((resolve)=>{
            
            this.storage.get(key).then(val=>{
              if(val){

                this.turnoActualFAC = val;
                resolve(val);
              }else{
                this.turnoActualFAC = "0";
              }
            }).catch((err)=>{
              console.log(err);
              
            });
          })
      });


    }else{
    //estamos en desktop
      if (localStorage.getItem(key)) {
          this.turnoActualFAC =  JSON.parse(localStorage.getItem(key));
      }

   

    }
  



}



  guardar_storage(key:any,data:any){

    if (this.platform.is("cordova") || this.platform.is("android")) {
      //Estamos en el dispositivo
      return new Promise((resolve)=>{
        console.log("iniciando a grabar storage native");
        
        this.storage.ready().then(()=>{
                this.storage.set(key, data).then(()=>{
                  console.log("los datos se grabaron storage native");
                  
                  resolve();
                }).catch((err)=>{
                  console.log("error al guardar los datos storage native");
                  
                  console.log(err);
                  
                })
        });
      })

    }else{
    //estamos en escritorio o desktop
    localStorage.setItem(key, JSON.stringify(data));
    }

  }



}
