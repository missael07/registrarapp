import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user.interface';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: User = {
    userName: '',
    password: '',
    email: '',
    userType: '',
    asignature: ''
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

    if (usr == null) {
      await this.storage.set(this.user.userName, this.user);
      console.log("Usuario registrado");
      this.router.navigate(['/login']);
      
    }
    else{
      console.log("Usuario ya existe");
    }
  }

  handleChange(e: any) {
    this.user.userType = e.detail.value;
  }

}
