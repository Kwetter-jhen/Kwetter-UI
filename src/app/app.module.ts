import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';

import {AppComponent} from './app.component';

import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';

import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {AddTweetComponent} from './components/add-tweet/add-tweet.component';
import {LoginService} from './services/login/login.service';
import {RoutingService} from './services/routing/routing.service';
import {TweetService} from './services/tweet/tweet.service';
import {FollowingFollowersComponent} from './components/following-followers/following-followers.component';
import {UserService} from './services/user/user.service';
import {UserViewComponent} from './components/user-view/user-view.component';
import {RelevantTweetsComponent} from './components/relevant-tweets/relevant-tweets.component';
import {TweetsComponent} from './components/tweets/tweets.component';
import {AdminService} from './services/admin/admin.service';
import { AdminViewComponent } from './components/admin-view/admin-view.component';
import { BillingComponent } from './components/billing/billing.component';
import { PaymentsComponent } from './components/billing/payments/payments.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RelevantTweetsComponent,
    AddTweetComponent,
    FollowingFollowersComponent,
    UserViewComponent,
    TweetsComponent,
    AdminViewComponent,
    BillingComponent,
    PaymentsComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatGridListModule
  ],
  providers: [LoginService, RoutingService, TweetService, UserService, AdminService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
