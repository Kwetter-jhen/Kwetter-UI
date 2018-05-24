import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KwetterUser } from '../../domain/kwetterUser';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { LoginService } from '../login/login.service';
import {AppSettings} from '../../AppSettings';
import {Payment} from '../../domain/payment';

@Injectable()
export class UserService {
  public following: KwetterUser[] = [];
  public followers: KwetterUser[] = [];
  public viewedUser: KwetterUser;
  public payments: Payment[] = [];

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
    const url = `${AppSettings.KWETTER_API}/users/${encodeURIComponent(username)}`;

    return this.http.get<KwetterUser>(url).pipe(
      tap((user: KwetterUser) => {
          this.viewedUser = user;
      })
    );
  }

  followUser(username: string): Observable<KwetterUser> {
    const url = `${AppSettings.KWETTER_API}/users/follow/${encodeURIComponent(username)}`;
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

  getBillingId(): Observable<string> {
    const username = encodeURIComponent(this.loginService.loggedUser.username);
    const url = `${AppSettings.KWETTER_API}/users/${username}/billingid`
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'token': this.loginService.token
        })
    };

    return this.http.get<string>(url, httpOptions);
  }

  getPayments(billingId: string): Observable<Payment[]> {
    const billingIdParsed = encodeURIComponent(billingId);
    const url = `${AppSettings.KWETTER_BILLING_API}/payments?billingId=${billingIdParsed}`;

    return this.http.get<Payment[]>(url).pipe(
      tap((payments: Payment[]) => {
        this.payments = payments;
      })
    );
  }

  addPayment(billingId: string, amount: number): Observable<Payment> {
    const payment: Payment = new Payment();
    payment.amount = amount;
    payment.billingId = billingId;

    const url = `${AppSettings.KWETTER_BILLING_API}/payments`;

    return this.http.post<Payment>(url, payment).pipe(
      tap((payment: Payment) => {
        this.payments.push(payment);
      })
    )
  }
}
