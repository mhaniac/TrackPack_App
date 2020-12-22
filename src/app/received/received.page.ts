
import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';
import { TrackingService } from '../services/tracking.service';

@Component({
  selector: 'app-received',
  templateUrl: './received.page.html',
  styleUrls: ['./received.page.scss'],
})
export class ReceivedPage implements OnInit {

  constructor(public alert: AlertController, private trackingService: TrackingService, private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {
  }

  clickByTracking(){
    this.showAlertForm();
  }

  async clickByBarcode(){
      this.barcodeScanner.scan().then(barcodeData => {
        const idCarga =  parseInt(barcodeData.text);
        this.trackingService.markAsDelivered(idCarga).then((res:any) => {
          this.showAlert('Correcto', res);
        }).catch((err: any) => {
          this.showAlert('error', err.error);
        })
       }).catch(err => {
           console.log('Error', err);
       });
    
  }

  
  async markPackageAsDelivered(idCarga: number){
    this.trackingService.markAsDelivered(idCarga).then((res: any) => {
      this.showAlert('Correcto', res);
    }).catch((err: any) => {
      this.showAlert('Error', err);
    })
  }


  async showAlertForm(){
    const alert = this.alert.create({
      header: 'Ingrese el numero de tracking',
      inputs:[
        {
          name: 'idCarga',
          type: 'number',
          placeholder: 'Numero de Tracking'
        }
      ],
      buttons:[
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Registrar',
          handler: (number: any) => {
            const idCarga = number.idCarga;
            this.markPackageAsDelivered(idCarga);
          }
        }
      ]
    });
    (await alert).present();
  };

  async showAlert(header: string, message: string){
    const alert = await this.alert.create({
      header,
      message,
      buttons:['Aceptar']
    });
    await alert.present();
  }

}
