import {Component, Input, OnInit} from '@angular/core';
import {TweetService} from '../../services/tweet/tweet.service';
import {Tweet} from '../../domain/tweet';
import {KwetterUser} from '../../domain/kwetterUser';

@Component({
  selector: 'app-relevant-tweets',
  templateUrl: './relevant-tweets.component.html',
  styleUrls: ['./relevant-tweets.component.css']
})
export class RelevantTweetsComponent implements OnInit {
  @Input() user: KwetterUser;

  tweets: Tweet[] = [];

  constructor(private tweetService: TweetService) {
  }

  ngOnInit() {
    this.tweetService.getRelevantTweets(this.user)
      .subscribe((tweets: Tweet[]) => this.tweets = tweets);
  }

  report(tweet: Tweet) {
    this.tweetService.reportTweet(tweet).subscribe();
  }
}
