import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

//import {AlertController } from "ionic-angular";

import { URL_SERVICIOS } from '../../config/url.servicios'

@Injectable()
export class AutenticarProvider {

  toke:string;


  constructor(public http: HttpClient, ) {


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

}
