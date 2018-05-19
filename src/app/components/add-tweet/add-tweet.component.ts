import { Component, OnInit } from '@angular/core';
import { TweetService } from '../../services/tweet/tweet.service';

@Component({
  selector: 'app-add-tweet',
  templateUrl: './add-tweet.component.html',
  styleUrls: ['./add-tweet.component.css']
})
export class AddTweetComponent implements OnInit {
  tweetText: string;

  constructor(private tweetService: TweetService) { }

  ngOnInit() {
  }

  postTweet() {
    if (!this.tweetText ||
      this.tweetText.trim().length === 0) { return; }

    this.tweetService.postTweet(this.tweetText)
      .subscribe(t => console.log(t));

    this.tweetText = null;
  }
}
