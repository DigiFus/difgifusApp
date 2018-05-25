import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import {Platform } from "ionic-angular";

import { URL_SERVICIOS } from '../../config/url.servicios'

@Injectable()
export class AutenticarProvider {

  toke:string;


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
