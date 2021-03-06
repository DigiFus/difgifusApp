import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import {Platform } from "ionic-angular";

import { URL_SERVICIOS } from '../../config/url.servicios'


@Injectable()
export class AutenticarProvider {

  toke:string;
  datos = {
      TOKEN:""
  }


  constructor(public http: HttpClient,
              private platform:Platform,
              private storage:Storage ) {


  }

  autenticar(data){
    return new Promise((resolve, reject) => {
    this.http.post(URL_SERVICIOS+'auth/autenticar', JSON.stringify(data), {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      })
      .subscribe(res => {

        resolve(res);

      }, (err) => {
        reject(err);
      });
    });
  }

  cerrarSesion(){
    if(this.platform.is("cordova") || this.platform.is("android")){
      this.storage.ready().then(()=>{
        return new Promise((resolve)=>{
            this.storage.remove('TOKEN').then(()=>{
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
  crearUsuario(data){
      return new Promise((resolve, reject) => {
      this.http.post(URL_SERVICIOS+'usudisconnect/registrar', JSON.stringify(data), {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
        })
        .subscribe(res => {

          resolve(res);

        }, (err) => {
          reject(err);
        });
    });


  }

  guardar_storage(key:any,data:any){

    if (this.platform.is("cordova") || this.platform.is("android")) {
      //Estamos en el dispositivo
      return new Promise((resolve)=>{
        
        this.storage.ready().then(()=>{
                this.storage.set(key, data).then(()=>{
                    
                  resolve();
                }).catch((err)=>{
                 
                  console.log(err);
                  
                })
        });
      })

    }else{
    //estamos en escritorio o desktop
    localStorage.setItem(key, JSON.stringify(data));
    }

  }

  cargar_token(key:any){
    
    
    let promesaToken = new Promise( (resolve, reject)=>{

      if (this.platform.is("cordova") || this.platform.is("android")) {
        //Estamos en el dispositivo
        
        this.storage.ready().then(()=>{
            
              this.storage.get(key).then(val=>{
                
                
                this.datos.TOKEN = val;
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
    return promesaToken;
  }



  verifica_token(token:any){
    try{
        //let token = this._CtrStorange.cargar_storage('TOKEN');
        //let token = JSON.parse(localStorage.getItem('TOKEN'));

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
