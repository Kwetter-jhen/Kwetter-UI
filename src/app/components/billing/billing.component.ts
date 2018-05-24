import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {LoginService} from '../../services/login/login.service';
import {KwetterUser} from '../../domain/kwetterUser';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {
  user: KwetterUser = null;
  billingId: String = null;

  constructor(private userService: UserService,
              private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.getLoggedInUser()
      .subscribe((user: KwetterUser) => this.user = user);

    this.userService.getBillingId()
      .subscribe(id => this.billingId = id);
  }

}
