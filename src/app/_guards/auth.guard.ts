import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';
import { LoginService } from '../_services/login.service';

/**
 * Guard para controlar el acceso a las páginas seguras.
 * En caso de no estar logado redirige al login.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private loginService: LoginService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    return this.loginService.keycloakIsActive().pipe(
      timeout(10000), // wait for 10 seconds before fail.
      map((x) => {
        if (x) {
          return true;
        } else {
          this.router.navigate(['main/login']);
          return false;
        }
      }), // return the received value true/false
      catchError(() => {
        this.router.navigate(['main/login']);
        return of(false);
      })
    );


  }
}
