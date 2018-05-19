import { Component, OnInit, Input } from '@angular/core';
import { KwetterUser } from '../../domain/kwetterUser';
import { UserService } from '../../services/user/user.service';
import { RoutingService } from '../../services/routing/routing.service';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-following-followers',
  templateUrl: './following-followers.component.html',
  styleUrls: ['./following-followers.component.css']
})
export class FollowingFollowersComponent implements OnInit {
  @Input() user: KwetterUser;

  following: KwetterUser[] = [];
  followers: KwetterUser[] = [];

  constructor(private userService: UserService,
    private routingService: RoutingService) { }

  ngOnInit() {
    this.userService.getFollowing(this.user)
      .subscribe((following: KwetterUser[]) => this.following = following);

    this.userService.getFollowers(this.user)
      .subscribe((followers: KwetterUser[]) => this.followers = followers);
  }

  navigate(username: string) {
    this.routingService.goUser(username,
      window.location.href.indexOf('home') <= -1);
  }
}
