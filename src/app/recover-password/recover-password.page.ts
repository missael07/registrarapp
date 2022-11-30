import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user.interface';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
})
export class RecoverPasswordPage implements OnInit {
  user: User = {
    userName: '',
    password: '',
    email: '',
    userType: ''
  }
  constructor(private router: Router, private storage: Storage) { }

  ngOnInit() {
    this.storage.get('loggedIn').then( (resp: Boolean) => {
      if(resp) this.router.navigate(['/home'])
    });
  }

  
  onSubmit() {
    console.log(this.user);
    this.guardar();
  }

  
  async guardar() {
    let usr = await this.storage.get(this.user.userName);

    if (this.user.password != null && this.user.userName != null) {
      usr.password = this.user.password;
      await this.storage.set(this.user.userName, usr);
      console.log("Cambio de contraseña exitoso");
      this.router.navigate(['/login']);
      
    }
    else{
      console.log("Todos los campos son requeridos");
    }
  }

}
