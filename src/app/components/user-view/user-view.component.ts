import { Component, OnInit, Input } from '@angular/core';
import { KwetterUser } from '../../domain/kwetterUser';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { LoginService } from '../../services/login/login.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  user: KwetterUser;
  loggedUser: KwetterUser;
  isFollowed: boolean;

  constructor(private route: ActivatedRoute,
    private userService: UserService,
    public loginService: LoginService) { }

  ngOnInit() {
    const username = this.route.snapshot.paramMap.get('username');
    Observable.forkJoin([
      this.userService.getUser(username),
      this.loginService.getLoggedInUser()])
      .subscribe(data => {
        this.user = data[0];
        this.loggedUser = data[1];
        this.checkIsFollowed();
      });
  }

  follow() {
    this.userService.followUser(this.user.username).subscribe(() => {
      this.isFollowed = true;
    });
  }

  checkIsFollowed(): void {
    this.userService.getFollowing(this.loggedUser)
      .subscribe((following: KwetterUser[]) => {
        const results: KwetterUser[] =
          following.filter(user =>
            user.username === this.user.username);

        this.isFollowed =
          this.user.username === this.loggedUser.username ||
          results.length > 0;
      });
  }
}
