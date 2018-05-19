import { Component, OnInit } from '@angular/core';
import { RoutingService } from '../../services/routing/routing.service';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(private loginService: LoginService,
    private routingService: RoutingService) { }

  ngOnInit() {
  }

  login() {
    this.loginService.getToken(this.username,
      this.password).subscribe(t => this.loginSuccessfull(t));

    this.username = null;
    this.password = null;
  }

  loginSuccessfull(token: string) {
    this.loginService.token = token;

    this.loginService.getLoggedInUser().subscribe(() => {
      this.routingService.goHome();
    });
  }
}
