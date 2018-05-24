import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';
import {KwetterUser} from '../../domain/kwetterUser';
import {RoutingService} from '../routing/routing.service';
import {AppSettings} from '../../AppSettings';

@Injectable()
export class LoginService {
  public token: string;
  public loggedUser: KwetterUser;

  constructor(private http: HttpClient,
              private routingService: RoutingService) {

    this.token = localStorage.getItem('token');
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
  }

  getToken(username: string, password: string): Observable<string> {
    const url = `${AppSettings.KWETTER_API}/users/login`;
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'username': username,
          'password': password
        })
    };

    return this.http.get<string>(url, httpOptions).pipe(
      tap(t => localStorage.setItem('token', t))
    );
  }

  getLoggedInUser(): Observable<KwetterUser> {
    const url = `${AppSettings.KWETTER_API}/users?token=${this.token}`;
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'token': this.token
        })
    };

    return this.http.get<KwetterUser>(url, httpOptions).pipe(
      tap((user: KwetterUser) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.loggedUser = user;
      }),
      catchError((err, caught) => {
        this.routingService.goLogin();
        return of(new KwetterUser());
      })
    );
  }
}
