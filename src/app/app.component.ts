import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


//importamos el servicion para validar si ya miro el tutorial
import { AjustesProvider } from "../providers/ajustes/ajustes";
import { AutenticarProvider } from "../providers/autenticar/autenticar";

import { LoginPage, IntroduccionPage, HomePage, CreditosPage, PerfilPage } from '../pages/index.paginas';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  creditos = CreditosPage;
  perfil = PerfilPage;
  inicio = HomePage;
  
  

  //rootPage:any = TabsPage;
//Esto es lo primero que se ejecuta una vez termina de cargar la app de ionic
  constructor(private platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private _ajustes:AjustesProvider,
              private _auth:AutenticarProvider,
              private menuCtrl:MenuController
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

              statusBar.styleDefault();
              splashScreen.hide();

      });

    });
  }

  
  abrirPagina( pagina:any ){
    this.rootPage = pagina;
    this.menuCtrl.close();
  }


}
