import { Component } from '@angular/core';
import {LoginService} from './services/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Kwetter';

  constructor(public loginService: LoginService) {}

  logout() {
    this.loginService.token = null;
    this.loginService.loggedUser = null;
    localStorage.setItem('token', null);
  }
}
