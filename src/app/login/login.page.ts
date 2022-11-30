import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { TEACHER, ALUMN } from '../helpers/constants';
import { User } from '../interfaces/user.interface';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userName: string = '';
  password: string = '';
  constructor(private storage: Storage, private router: Router, private service: AppService) { }

  ngOnInit() {
    this.storage.get('loggedUser').then(  (resp: User) => {
      if(resp === null) return;

      if(resp.userType.toUpperCase() === TEACHER) this.router.navigate(['/home']);
      else if(resp.userType.toUpperCase() === ALUMN) {
        this.router.navigate(['/home-alumno']);
      }

    });
  }

  signIn(){
    this.storage.get(this.userName).then( (resp: User) => { 
      if(resp == null) return console.log('No existe');

      if(this.password != resp.password) return console.log('Usuario/Contraseña incorrectos');

      console.log('Puedes Entrar');
      this.storage.set('loggedIn', true)
      this.storage.set('loggedUser', resp)
      this.service.user = resp; 

        if(resp.userType.toUpperCase() === TEACHER) 
        { 
          this.router.navigate(['/home']);}
        else 
        {this.router.navigate(['/home-alumno']);}
    });

  }

}
