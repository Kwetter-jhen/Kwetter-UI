import {Component, OnInit} from '@angular/core';
import {KwetterUser} from '../../domain/kwetterUser';
import {AdminService} from '../../services/admin/admin.service';
import {LoginService} from '../../services/login/login.service';
import {Tweet} from '../../domain/tweet';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {
  public users: KwetterUser[];
  public reportedTweets: Tweet[];

  constructor(private adminService: AdminService,
              private loginService: LoginService) {
  }

  ngOnInit() {
    this.loginService.getLoggedInUser().subscribe();
    this.adminService.getUsers().subscribe(users => this.users = users);
    this.adminService.getReportedTweets().subscribe(tweets => this.reportedTweets = tweets);
  }

  promoteUser(username: string): void {
    this.adminService.promoteUser(username).subscribe();
  }

  remove(tweet: Tweet) {
    this.adminService.deleteTweet(tweet).subscribe();
  }
}
