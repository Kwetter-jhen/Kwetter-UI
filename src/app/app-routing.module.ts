import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {UserViewComponent} from './components/user-view/user-view.component';
import {AdminViewComponent} from './components/admin-view/admin-view.component';
import {BillingComponent} from './components/billing/billing.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'user/:username', component: UserViewComponent},
  {path: 'admin', component: AdminViewComponent},
  {path: 'billing', component: BillingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
