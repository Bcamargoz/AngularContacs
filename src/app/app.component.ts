import { Component } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title:string = 'app';
  nombre =  '';
  telefono = '';
  contactos = [];
  contacto = {};
  errorMessage = '';

  urlBase =  "http://localhost:33350";

  constructor(private _http: Http){}

  getAll(){
    this._http.get(`${this.urlBase}/api/Contacts/`).map(res => res.json()).subscribe(
      result => {
          this.contactos = result;
          console.log(this.contactos);
      },
      error => {
          this.errorMessage = <any>error;
           
          if(this.errorMessage !== null){
              console.log(this.errorMessage);
              alert("Error en la petición");
          }
      }
    );
  }

  getOne(id:number){
    console.log('get one');
    this._http.get(`${this.urlBase}/api/Contacts/${id}`).map(res => res.json()).subscribe(
      result => {
              this.contacto = result;
              console.log(this.contacto);
      },
      error => {
          this.errorMessage = <any>error;
           
          if(this.errorMessage !== null){
              console.log(this.errorMessage);
              alert("Error en la petición");
          }
      }
    );
  }

  create(){
    var data = {
      "nombre" :  this.nombre,
      "telefono"  :  this.telefono,
    }
    this._http.post(`${this.urlBase}/api/Contacts/`,data).map(res => res.json()).subscribe(
      result => {
          alert("Contacto creado");
          console.log(result);
      },
      error => {
          this.errorMessage = <any>error;
           
          if(this.errorMessage !== null){
              console.log(this.errorMessage);
              alert("Error en la petición");
          }
      }
    );
  }

  update(id:number){
    let data =  {
      "nombre" : this.nombre,
      "telefono"  : this.telefono,
    }
    this._http.put(`${this.urlBase}/api/Contacts/${id}`,data).map(res => res.json()).subscribe(
      result => {
          alert("Contacto actualizado");
          console.log(result);
      },
      error => {
          this.errorMessage = <any>error;
          if(this.errorMessage !== null){
              console.log(this.errorMessage);
              alert("Error en la petición");
          }
      }
    );
  }

  delete(id:number){
    this._http.delete(`${this.urlBase}/api/Contacts/${id}`).map(res => res.json()).subscribe(
      result => {
          alert("Contacto eliminado");
          console.log(result);
      },
      error => {
          this.errorMessage = <any>error;
           
          if(this.errorMessage !== null){
              console.log(this.errorMessage);
              alert("Error en la petición");
          }
      }
    );
  }

  log(){
    console.log('titulo : '+this.nombre);
    console.log('contenido : '+this.telefono);
  }

}
