import { AuthService } from 'src/app/core/services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth2Guard implements CanActivate {
 
constructor( private auth: AuthService, private router: Router){

}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // console.log(this.auth.isRespondentLoggedIn)
      if (this.auth.isRespondentLoggedIn !== true) {
        window.alert('Access Denied, Login is Required to Access This Page!');
        this.router.navigate(['login']);
      }
    return true;
  }
  
}
