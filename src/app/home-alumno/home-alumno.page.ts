import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { User } from '../interfaces/user.interface';
import { Attendance } from '../interfaces/asitencia.interface';
import { AppService } from '../services/app.service';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

@Component({
  selector: 'app-home-alumno',
  templateUrl: './home-alumno.page.html',
  styleUrls: ['./home-alumno.page.scss'],
})
export class HomeAlumnoPage implements OnInit, OnDestroy {

  user: User = {
    userName: '',
    password: '',
    email: '',
    userType: ''
  }
  userName = '';
  loading: boolean = true;
  constructor(private storage: Storage, private router: Router, private service:AppService, private barcodeScanner: BarcodeScanner) {
    console.log('entra');
    this.getLoggedUser().then( (user: User) => {
      setTimeout(() => {
        this.userName = user.userName
        this.loading = false;
        console.log(this.loading)
      }, 1500);
    });
  }

  async ngOnInit() {
    await this.getLoggedUser().then( (user: User) => {
      setTimeout(() => {
        this.userName = user.userName
        console.log(this.loading)
      }, 1500);
    });
    console.log(this.loading)
  }
  ngOnDestroy(): void {
    this.user= {
      userName: '',
      password: '',
      email: '',
      userType: ''
    }
    this.userName = '';
    this.loading = true;
    console.log('destroy')
  }

  async registrarAsistencia(){
    const asistencia: Attendance = {
      name: this.userName,
      date: new Date(Date.now()),
      asignature: 'Desarrollo de Aplicaciones Moviles',
    }
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      const data = barcodeData.text.split(',');
      asistencia.date = new Date(data[0]);
      asistencia.asignature = data[1];
    }).catch(err => {
      console.log('Error', err);
    });
    this.service.registrarAsistencia(asistencia);
  }

  logOut(){
    this.service.logOut();
  }

  async getLoggedUser() {
    const name = await this.storage.get('loggedUser');
    return name;
  }
}
