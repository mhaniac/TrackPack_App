import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../services/globals'
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  constructor(private loginService: LoginService, private http: HttpClient) { }

  updateLocation(idCarga: any, lat: number, lng: number){
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        token: this.loginService.getToken()
      });
      this.http.post(`${URL}/tracking/updateLocation`, { idCarga, lat, lng }, { headers }).subscribe((res: any) => {
        console.log(res);
        resolve(res.message);
      }, (err: any) => {
        console.log(err);
        reject(err.error);
      })
    });
  }
 
  markAsDelivered(idCarga: number){
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        token: this.loginService.getToken()
      })
      this.http.put(`${URL}/tracking/delivered`, { idCarga }, { headers }).subscribe((res: any) => {
        console.log(res);
        resolve(res.message);
      }, (err: any) => {
        console.log(err);
        reject(err.error.error);
      })
    })
  }

getCurrentLocation(){
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((coords)=>{
      resolve({ lat: coords.coords.latitude, lng: coords.coords.longitude });
    }, () => {
      reject('Debes permitir la ubicacion para completar esta operacion')
    }, { enableHighAccuracy: true })
  })
}
}
