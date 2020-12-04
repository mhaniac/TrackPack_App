import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, public alertController: AlertController, private router: Router) {
    this.createForm()
  }

  onSubmit(){
    if(this.formGroup.valid){
      const userLogin = this.formGroup.get('userLogin').value;
      const passwd = this.formGroup.get('passwd').value;
      const user = { userLogin, passwd };
      this.loginService.login(user).subscribe((res: any) => {
        this.loginService.setToken(res.token);
        this.router.navigateByUrl('/index');
      }, (err: any) => {
        console.log(err);
        this.presentAlert('Error', err.error.error);
      })
    }
  }


  createForm(){
    this.formGroup = this.formBuilder.group({ 
      userLogin: ['', [Validators.required, Validators.minLength(5)]],
      passwd: ['', [Validators.required]]
     })
  }

  //Alert
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

}
