import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Platform } from "ionic-angular";

import { URL_SERVICIOS } from '../../config/url.servicios';

@Injectable()
export class SolicitudesProvider {

  datos = {
    UaeStorage:"",
    FacStorage:""
  }

  constructor(public http: HttpClient,
              private platform:Platform,
              private storage:Storage) {
    console.log('Hello SolicitudesProvider Provider');
  }

  registrar(data){

    return new Promise((resolve, reject) => {
    this.http.post(URL_SERVICIOS+'solicitud/registrar', JSON.stringify(data), {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      })
      .subscribe(res => {

        resolve(res);

      }, (err) => {
        reject(err);
      });
  });

  }
  obtenerTurnosDiaUAE(fecha){
    return new Promise( (resolve,reject)=>{
      this.http.get(URL_SERVICIOS+'solicitud/calcularTiempoUAE/'+fecha,{
        headers:new HttpHeaders().set('Content-Type', 'application/json')
      })
      .subscribe(res =>{
        resolve(res);
      }, (err) =>{
        reject(err);
      });

    });
  }

  obtenerTurnosDiaFAC(fecha){
      return new Promise( (resolve,reject)=>{
        this.http.get(URL_SERVICIOS+'solicitud/calcularTiempoFAC/'+fecha,{
          headers:new HttpHeaders().set('Content-Type', 'application/json')
        })
        .subscribe(res =>{
          resolve(res);
        }, (err) =>{
          reject(err);
        });
  
      });
  
  

  }
  obtenerTurno(acronimo, consecutivo){
    return new Promise( (resolve,reject)=>{
      this.http.get(URL_SERVICIOS+'solicitud/obtenerSolicitud/'+acronimo+'/'+consecutivo,{
        headers:new HttpHeaders().set('Content-Type', 'application/json')
      })
      .subscribe(res =>{
        resolve(res);
      }, (err) =>{
        reject(err);
      });

    });
  }

  cargaUaeStorage(key:any){

    let promesaUAE = new Promise((resolve,reject)=>{
      if (this.platform.is("cordova") || this.platform.is("android")) {
        //Estamos en el dispositivo
        
        this.storage.ready().then(()=>{
            
              this.storage.get(key).then(val=>{
                
                
                this.datos.UaeStorage = val;
                resolve();
                
                
              }).catch((err)=>{
                console.log(err);
                
              });
    
        });
  
  
      }else{
      //estamos en desktop
        if (localStorage.getItem(key)) {
            this.datos =  JSON.parse(localStorage.getItem(key));
        }
        resolve();
      }
    });
    return promesaUAE;

  }
  cargaFacStorage(key:any){

    let promesaFAC = new Promise((resolve,reject)=>{
      if (this.platform.is("cordova") || this.platform.is("android")) {
        //Estamos en el dispositivo
        
        this.storage.ready().then(()=>{
            
              this.storage.get(key).then(val=>{
                
                
                this.datos.FacStorage = val;
                
                resolve();
                
                
              }).catch((err)=>{
                console.log(err);
                
              });
    
        });
  
  
      }else{
      //estamos en desktop
        if (localStorage.getItem(key)) {
            this.datos =  JSON.parse(localStorage.getItem(key));
        }
        resolve();
      }
    });
    return promesaFAC;

  }


  eliminarStorage(key:any){
    if(this.platform.is("cordova") || this.platform.is("android")){
      console.log("se detecto android");
      
      this.storage.ready().then(()=>{
        return new Promise((resolve)=>{
          console.log("preparandono para remover el item");
          
            this.storage.remove(key).then(()=>{
              console.log("Listo item removido ");
              
              resolve();
            })
        }).catch((err)=>{
          console.log(err);
          
        })
      })

    }else{
      
      localStorage.removeItem('TOKEN');
    }
    
    
  }

  

}
