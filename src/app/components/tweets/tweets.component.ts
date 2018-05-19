import {Component, OnInit, Input} from '@angular/core';
import {Tweet} from '../../domain/tweet';
import {TweetService} from '../../services/tweet/tweet.service';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit {
  @Input() username: string;
  tweets: Tweet[] = [];

  constructor(private tweetService: TweetService) {
  }

  ngOnInit() {
    this.tweetService.getTweets(this.username).subscribe((tweets: Tweet[]) => {
      this.tweets = tweets;
    });
  }

  report(tweet: Tweet) {
    this.tweetService.reportTweet(tweet).subscribe();
  }
}
