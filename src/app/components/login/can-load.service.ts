import {Injectable} from '@angular/core';
import {Router, CanActivate, CanLoad, Route, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class LoadGuardService implements CanLoad {


  constructor( public router: Router) {
  }

  canLoad(route: Route): boolean {
    const logged = localStorage.getItem('userData');
    console.log(logged);
    if (!logged) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
