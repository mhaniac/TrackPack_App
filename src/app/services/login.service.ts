import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../services/globals'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(user){
    return this.http.post(`${URL}/login/employee`, user);
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
