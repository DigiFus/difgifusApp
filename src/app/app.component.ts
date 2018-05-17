import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';



//importamos el servicion para validar si ya miro el tutorial
import { AjustesProvider } from "../providers/ajustes/ajustes";

import { LoginPage, IntroduccionPage, HomePage } from '../pages/index.paginas';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  //rootPage:any = TabsPage;
//Esto es lo primero que se ejecuta una vez termina de cargar la app de ionic
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private _ajustes:AjustesProvider) {
    platform.ready().then(() => {

      //Cuanto la app este lista hacemos lo siguiente
      this._ajustes.cargar_storage()
                  .then(()=>{

                    //Validamos si ya miro el tutorial, si es asi lo pasamos a la autenticacion
                    if (this._ajustes.ajustes.mostrar_tutorial) {
                        this.rootPage = IntroduccionPage;
                    }else
                    {
                      let dataVerifi = this.verifica_token();

                      if(dataVerifi){
                        this.rootPage = HomePage;
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
  verifica_token(){
    try{
        //let token = this._CtrStorange.cargar_storage('TOKEN');
        let token = JSON.parse(localStorage.getItem('TOKEN'));

        if (token === '') return;


        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');

        return JSON.parse(window.atob(base64)).data;
    }catch (err){
        //lo envia al home
        //$location.path('/');
        console.log(err);
    }

  }
}
