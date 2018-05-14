import { HttpClient, URLSearchParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

//import {AlertController } from "ionic-angular";

import { URL_SERVICIOS } from '../../config/url.servicios'

@Injectable()
export class AutenticarProvider {

  toke:string;


  constructor(public http: HttpClient, ) {


  }

  autenticar(Correo:string, Password:string){

  let datos = { Correo:'david@gmail.com',Password:'12323123'}

  let options = {
    /*headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }*/
    headers:{
      'Content-Type':'application/json'
    }
  };
 var url = 'http://api.puffalexa.com/public/auth/autenticar';
 return new Promise(resolve => {
  this.http.post(url,JSON.stringify(datos),options)
     .subscribe(data => {
       resolve(data);
       console.log(data);
      });
 });

    /*let data = new URLSearchParams();

    data.append("Correo", Correo);
    data.append("Password", Password);

    let url = URL_SERVICIOS+"auth/autenticar";

    return this.http.post(url, data)
              .map( resp=>{
                let data_resp = resp.json();
                console.log(data_resp);
              })

    /*return new Promise((resolve, reject) => {
    this.http.post(URL_SERVICIOS+'auth/autenticar', JSON.stringify(data))
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });*/




  }

}
