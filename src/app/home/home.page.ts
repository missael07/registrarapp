import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { User } from '../interfaces/user.interface';
import { Router } from '@angular/router';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user: User = {
    userName: '',
    password: '',
    email: '',
    userType: '',
    asignature: ''
  }
  elementType: NgxQrcodeElementTypes =  NgxQrcodeElementTypes.IMG;
  value: string = '';
  width: string = 'width: 100%';
  errorCorrectionLevel: NgxQrcodeErrorCorrectionLevels = NgxQrcodeErrorCorrectionLevels.LOW;
  loading: boolean = true;
  constructor(private storage: Storage, private router: Router, private service: AppService) {
    storage.get('loggedUser').then(resp => { 
      console.log(resp);
      this.user = resp;
    });
    setTimeout(() => {
      this.loading = false;
    }, 1500);

  }
  generarQR(){
    this.value =  `${new Date(Date.now())}, ${this.user.asignature}`;
    this.storage.get(this.user.asignature || '').then( resp => {
      if(!resp){
        this.storage.set(this.user.asignature!, []);
      }
    })

  }

  logOut(){
    this.service.logOut();
  }

}
