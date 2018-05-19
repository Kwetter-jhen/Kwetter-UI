import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KwetterUser } from '../../domain/kwetterUser';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { LoginService } from '../login/login.service';

@Injectable()
export class UserService {
  private apiUrl = 'http://localhost:8080/Kwetter/api';

  public following: KwetterUser[] = [];
  public followers: KwetterUser[] = [];
  public viewedUser: KwetterUser;

  constructor(private loginService: LoginService,
    private http: HttpClient) { }

  getFollowing(user: KwetterUser): Observable<KwetterUser[]> {
    const url = user._links.find(l => l.rel === 'following').url;

    return this.http.get<KwetterUser[]>(url).pipe(
      tap((following: KwetterUser[]) => this.following = following)
    );
  }

  getFollowers(user: KwetterUser): Observable<KwetterUser[]> {
    const url = user._links.find(l => l.rel === 'followers').url;

    return this.http.get<KwetterUser[]>(url).pipe(
      tap((followers: KwetterUser[]) => this.followers = followers)
    );
  }

  getUser(username: string): Observable<KwetterUser> {
    const url = `${this.apiUrl}/users/${encodeURIComponent(username)}`;

    return this.http.get<KwetterUser>(url).pipe(
      tap((user: KwetterUser) => {
          this.viewedUser = user;
      })
    );
  }

  followUser(username: string): Observable<KwetterUser> {
    const url = `${this.apiUrl}/users/follow/${encodeURIComponent(username)}`;
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'token': this.loginService.token
        })
    };

    return this.http.put<KwetterUser>(url, '', httpOptions).pipe(
      tap((user: KwetterUser) => {
        this.followers.push(this.loginService.loggedUser);
      })
    );
  }
}
