import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { KwetterUser } from '../../domain/kwetterUser';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: KwetterUser;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.getLoggedInUser()
      .subscribe((user: KwetterUser) => this.user = user);
  }

}
