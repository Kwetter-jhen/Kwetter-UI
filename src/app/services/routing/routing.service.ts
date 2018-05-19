import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class RoutingService {

  constructor(private router: Router) { }

  goHome() {
    this.router.navigate(['home']);
  }

  goLogin() {
    this.router.navigate(['login']);
  }

  goUser(username: string, reload: boolean) {
    this.router.navigate([`user/${username}`]);

    if (reload) {
      location.reload();
    }
  }
}
