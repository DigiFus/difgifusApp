import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { URL_SERVICIOS } from '../../config/url.servicios';

@Injectable()
export class PerfilProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PerfilProvider Provider');
  }

  obtenerPerfil(usuario:any){
    return new Promise( (resolve,reject)=>{
      this.http.get(URL_SERVICIOS+'usuario/obtener/'+usuario,{
        headers:new HttpHeaders().set('Content-Type', 'application/json')
      })
      .subscribe(res =>{
        resolve(res);
      }, (err) =>{
        reject(err);
      });

    });


  }
  actualizarPerfil(data:any){
    return new Promise( (resolve,reject)=>{
      this.http.put(URL_SERVICIOS+'usuario/actualizar/'+'david@gmail.com',JSON.stringify(data),{
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
