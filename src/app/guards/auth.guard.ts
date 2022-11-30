import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { TEACHER } from '../helpers/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private storage: Storage, private router: Router){}

  async authorize(){
    const logged = await this.storage.get('loggedUser');
    if(logged && logged.userType.toUpperCase() === TEACHER) 
    { 
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authorize();
  }
  
}
