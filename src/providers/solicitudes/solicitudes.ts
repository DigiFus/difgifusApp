import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { URL_SERVICIOS } from '../../config/url.servicios';

@Injectable()
export class SolicitudesProvider {

  constructor(public http: HttpClient) {
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
  

}
