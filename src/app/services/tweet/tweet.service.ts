import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

import { Tweet } from '../../domain/tweet';
import {LoginService} from '../login/login.service';
import {KwetterUser} from '../../domain/kwetterUser';
import {AppSettings} from '../../AppSettings';

@Injectable()
export class TweetService {
  public static relevantTweets: Tweet[] = [];

  public tweets: Tweet[] = [];

  private ws = null;

  constructor(private loginService: LoginService,
    private http: HttpClient) { }

  getRelevantTweets(user: KwetterUser): Observable<Tweet[]> {
    const username = this.loginService.loggedUser.username;
    const url = user._links.find(l => l.rel === 'relevanttweets').url;

    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'token': this.loginService.token
        })
    };

    return this.http.get<Tweet[]>(url, httpOptions).pipe(
      tap((tweets: Tweet[]) => {
        TweetService.relevantTweets = tweets;
      })
    );
  }

  getTweets(username: string): Observable<Tweet[]> {
    const url = `${AppSettings.KWETTER_API}/tweets?username=${username}`;

    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'token': this.loginService.token
        })
    };

    return this.http.get<Tweet[]>(url, httpOptions).pipe(
      tap((tweets: Tweet[]) => this.tweets = tweets)
    );
  }

  postTweet(tweetText: string): Observable<Tweet> {
    const url = `${AppSettings.KWETTER_API}/tweets`;

    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'token': this.loginService.token
          })
    };

    const newTweet = {
      text: tweetText
    };

    return this.http.post<Tweet>(url, newTweet, httpOptions).pipe(
      tap((tweet: Tweet) => TweetService.relevantTweets.unshift(tweet))
    );
  }

  reportTweet(tweet: Tweet): Observable<Tweet> {
    const url = tweet._links.find(l => l.rel === 'change').url;

    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'token': this.loginService.token
        })
    };

    tweet.reported = true;

    console.log(tweet);

    return this.http.put<Tweet>(url, tweet, httpOptions);
  }
}
