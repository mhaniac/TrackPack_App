import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../services/globals'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }

  login(user){
    return this.http.post(`${URL}/login/employee`, user);
  }

  logout(){
    this.removeToken();
    this.router.navigateByUrl('/tabs/tab1');
  }

  setToken(token:string){
    localStorage.setItem('token', token);
  }

  getToken(){
    const token = localStorage.getItem('token')? localStorage.getItem('token') : 'null';
    return token;
  }

  removeToken(){
    localStorage.removeItem('token');
  }

}
