import { Component } from '@angular/core';
import { Platform, MenuController,AlertController  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


//importamos el servicion para validar si ya miro el tutorial
import { AjustesProvider } from "../providers/ajustes/ajustes";
import { SolicitudesProvider } from "../providers/solicitudes/solicitudes";
import { AutenticarProvider } from "../providers/autenticar/autenticar";



import { LoginPage, 
        IntroduccionPage, 
        HomePage, 
        CreditosPage, 
        PerfilPage } from '../pages/index.paginas';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage:any;

  creditos = CreditosPage;
  perfil = PerfilPage;
  inicio = HomePage;

  showSplash = true;
  
  

  //rootPage:any = TabsPage;
//Esto es lo primero que se ejecuta una vez termina de cargar la app de ionic
  constructor(private platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private _ajustes:AjustesProvider,
              private _auth:AutenticarProvider,
              private menuCtrl:MenuController,
              private _solicitud:SolicitudesProvider,
              private alertCtrl: AlertController
            ) {
    this.platform.ready().then(() => {

      //Cuanto la app este lista hacemos lo siguiente
      this._ajustes.cargar_storage().then(()=>{

           //Validamos si ya miro el tutorial, si es asi lo pasamos a la autenticacion
          if (this._ajustes.ajustes.mostrar_tutorial) {
              this.rootPage = IntroduccionPage;
          }else{
              //let dataVerifi = this._auth.verifica_token();
            this._auth.cargar_token("TOKEN").then(()=>{

              
              if(this._auth.datos.TOKEN != undefined){
                this.rootPage = HomePage;
              }else {
              this.rootPage = LoginPage;
              }
            })
            
          }

            this.platform.resume.subscribe(()=>{
              
              this._solicitud.cargaUaeStorage('TurnUAE').then(()=>{
                if(this._solicitud.datos.UaeStorage){
                  let cadenaUAE = this._solicitud.datos.UaeStorage.split(" ",2);
                  
                  
                 this._solicitud.obtenerTurno('UAE',cadenaUAE[1]).then((result)=>{
                    
                    
                    if(result[0].estado_solicitud == "ATENTIDO" ){
                      this.alert("Dirigete al modulo de Unidad de Atencion al Estudiante, te antenderemos en seguida.",'TurnUAE');
                      
                    }

                    if (result[0].estado_solicitud == "OMITIDO") {
                      this.alert("Por algun motivo su turno fue cancelado, le invitamos a solicitar un turno nuevamente.",'TurnUAE');
                    }
                 })
                  
                }
              })
              this._solicitud.cargaFacStorage('TurnFAC').then(()=>{
                
                
                if(this._solicitud.datos.FacStorage){
                  let cadenaFAC = this._solicitud.datos.FacStorage.split(" ",2);
                  
                  
                  
                 this._solicitud.obtenerTurno('FAC',cadenaFAC[1]).then((result)=>{
                    
                    console.log(JSON.stringify(result));
                    
                    if(result[0].estado_solicitud == "ATENTIDO" ){
                      this.alert("Dirigete al modulo de Facturacion, te antenderemos en seguida.",'TurnFAC');
                      
                    }

                    if (result[0].estado_solicitud == "OMITIDO") {
                      this.alert("Por algun motivo su turno fue cancelado, le invitamos a solicitar un turno nuevamente.",'TurnFAC');
                    }
                 })
                  
                }
              })
              
            });

              statusBar.styleDefault();
              splashScreen.hide();

              

      });

    });
  }

  
  abrirPagina( pagina:any ){
    this.rootPage = pagina;
    this.menuCtrl.close();
  }
  cerrarSesion(){
    this._auth.cerrarSesion();
    this.menuCtrl.close();
    //this.rootPage = LoginPage;
  }

  alert(mensaje:any, key:any) {

    let alert = this.alertCtrl.create({
      title: 'Estamos listos para atenderte',
      message: mensaje,
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this._solicitud.eliminarStorage(key);  
            
                      
            //console.log('Buy clicked '+f.getFullYear()+"/"+(f.getMonth()+1)+"/"+f.getDate());
          }
        }
      ]
    });
    alert.present();
  }


}
