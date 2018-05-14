import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

//Importamos platform  para saber si estamos en un dispositivo o en un dispositivo movil
import { Platform } from "ionic-angular";

@Injectable()
export class AjustesProvider {

  ajustes = {
    mostrar_tutorial:true
  };

  constructor(private platform:Platform, private storage:Storage) {
    console.log('Hello AjustesProvider Provider');
  }

  cargar_storage(){

    let promesa = new Promise( (resolve, reject)=>{
      if (this.platform.is("cordova")) {
        //Estamos en el dispositivo
        console.log("Inicializando storange");
        this.storage.ready()
                  .then(()=>{
                    console.log("Storange Listo");
                      this.storage.get("ajustes")
                          .then(ajust=>{
                            if (ajust) {
                              this.ajustes = ajust;                              
                            }
                            resolve();
                          });
        });


      }else{
      //estamos en escritorio o desktop
        if (localStorage.getItem("ajustes")) {
            this.ajustes = JSON.parse(localStorage.getItem("ajustes"));
        }

        resolve();

      }
    });

    return promesa;



  }
  guardar_storage(){

    if (this.platform.is("cordova")) {
      //Estamos en el dispositivo
      this.storage.ready()
                .then(()=>{
                  this.storage.set("ajustes", this.ajustes);
                });
    }else{
    //estamos en escritorio o desktop
    localStorage.setItem("ajustes", JSON.stringify(this.ajustes));
    }

  }

}
