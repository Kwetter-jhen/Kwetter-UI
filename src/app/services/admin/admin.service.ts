import { Injectable } from '@angular/core';
import {KwetterUser} from '../../domain/kwetterUser';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {LoginService} from '../login/login.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Tweet} from '../../domain/tweet';

@Injectable()
export class AdminService {
  private apiUrl = 'https://kwetter-jhen-restless-bilby.cfapps.io'; // URL to web api
  public users: KwetterUser[] = [];
  public reportedTweets: Tweet[] = [];

  constructor(private http: HttpClient,
              private loginService: LoginService) { }

  getUsers(): Observable<KwetterUser[]> {
    const url = `${this.apiUrl}/users`;
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'token': this.loginService.token
        })
    };

    return this.http.get<KwetterUser[]>(url, httpOptions).pipe(
      tap(users => this.users = users)
    );
  }

  promoteUser(username: string): Observable<KwetterUser> {
    const url = `${this.apiUrl}/users/admin/${encodeURIComponent(username)}`;
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'token': this.loginService.token
        })
    };

    return this.http.put<KwetterUser>(url, '', httpOptions).pipe(
      tap(user => this.users[this.users.findIndex(u => u.id === user.id)] = user)
    );
  }

  getReportedTweets(): Observable<Tweet[]> {
    const url = `${this.apiUrl}/tweets?reported=true`;
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'token': this.loginService.token
        })
    };

    return this.http.get<Tweet[]>(url, httpOptions).pipe(
      tap(tweets => this.reportedTweets = tweets)
    );
  }

  deleteTweet(tweet: Tweet): Observable<Tweet> {
    const url = tweet._links.find(l => l.rel === 'delete').url;
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'token': this.loginService.token
        })
    };

    return this.http.delete<Tweet>(url, httpOptions).pipe(
      tap(() => {
        this.reportedTweets.splice(this.reportedTweets.findIndex(t => t.id === tweet.id));
      })
    );
  }
}
