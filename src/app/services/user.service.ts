import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { URL } from './globals';
import { TrackingService } from '../services/tracking.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  public user = { name: '', lastName: '' };
  public location = { lat:0 ,lng: 0 }

  constructor(private http: HttpClient, private loginService: LoginService, private router: Router, private trackingService: TrackingService) {
    this.getUserProfile();
    this.getUSerLocation();
  }

  getUserProfile(){
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        token: this.loginService.getToken()
      })
      this.http.get(`${URL}/employee/profile`, { headers }).subscribe((res:any) => {
        this.user = {name:res.results.nombre, lastName: res.results.apellido};
        resolve(this.user);
      });
    });
  }

  getUSerLocation(){
      this.trackingService.getCurrentLocation().then((resp: any) => {
        this.location = resp;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

}
