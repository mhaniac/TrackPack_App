import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';
import { TrackingService } from '../services/tracking.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  constructor(private loginService: LoginService, public userService: UserService,private barcodeScanner: BarcodeScanner, private alertController: AlertController, private trackingService: TrackingService) { }

  ngOnInit() {
    this.trackingService.getCurrentLocation().then((resp: any) => {
        this.userService.location = resp;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  async startScanner(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.trackingService.updateLocation(barcodeData.text, this.userService.location.lat, this.userService.location.lng).then((res:any) => {
        this.presentAlert('Correcto', res);
      }).catch((err: any) => {
        this.presentAlert('error', err.error);
      })
     }).catch(err => {
         console.log('Error', err);
     });
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
