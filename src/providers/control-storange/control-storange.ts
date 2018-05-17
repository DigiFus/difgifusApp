import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Platform } from "ionic-angular";

/*
  Generated class for the ControlStorangeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ControlStorangeProvider {



  constructor(private platform:Platform, private storage:Storage) {
    console.log('Hello ControlStorangeProvider Provider');
  }

  cargar_storage(nomArreglo:any){
    console.log(nomArreglo);
    let promesa = new Promise( (resolve, reject)=>{
      if (this.platform.is("cordova")) {
        //Estamos en el dispositivo
        console.log("Inicializando storange");
        this.storage.ready()
                  .then(()=>{
                    console.log("Storange Listo");
                      this.storage.get(nomArreglo)
                          .then(ajust=>{
                            if (ajust) {
                              return JSON.parse(ajust);
                            }
                            resolve();
                          });
        });


      }else{
      //estamos en escritorio o desktop
        if (localStorage.getItem(nomArreglo)) {

            return JSON.parse(localStorage.getItem(nomArreglo));
        }

        resolve();

      }
    });

    return promesa;



  }
  guardar_storage(nomArreglo:any, data:any){
      //console.log(data);
    if (this.platform.is("cordova")) {
      //Estamos en el dispositivo
      this.storage.ready()
                .then(()=>{
                  this.storage.set(nomArreglo, data);
                });
    }else{
    //estamos en escritorio o desktop
    localStorage.setItem(nomArreglo,data);
    }

  }




}
