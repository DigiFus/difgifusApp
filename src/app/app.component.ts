import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

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
  consigueToken:any;

  //rootPage:any = TabsPage;
//Esto es lo primero que se ejecuta una vez termina de cargar la app de ionic
  constructor(private platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private _ajustes:AjustesProvider,
              private _auth:AutenticarProvider,
              private menuCtrl:MenuController,
              private storage:Storage) {
    this.platform.ready().then(() => {

      //Cuanto la app este lista hacemos lo siguiente
      this._ajustes.cargar_storage().then(()=>{

                    //Validamos si ya miro el tutorial, si es asi lo pasamos a la autenticacion
                    if (this._ajustes.ajustes.mostrar_tutorial) {
                        this.rootPage = IntroduccionPage;
                    }else{
                      //let dataVerifi = this._auth.verifica_token();

                      if(this.cargar_storage('TOKEN')){
                        this.rootPage = HomePage;
                        //this.navCtrl.push(HomePage, { 'dataUsu':dataVerifi });
                      }
                      else
                      {
                        this.rootPage = LoginPage;
                      }

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


  cargar_storage(key:any){

    let promesa = new Promise( (resolve, reject)=>{
      if (this.platform.is("cordova")) {
        //Estamos en el dispositivo
        console.log("Inicializando storange");
        this.storage.ready()
                  .then(()=>{
                    console.log("Storange Listo");
                      this.storage.get(key)
                          .then(valObtenido=>{

                            if (valObtenido) {
                              this.consigueToken = valObtenido;
                            }
                            resolve();
                          });
        });


      }else{
      //estamos en desktop
        if (localStorage.getItem(key)) {
            this.consigueToken =  JSON.parse(localStorage.getItem(key));
        }

        resolve();

      }
    });

    return promesa;



  }



}
