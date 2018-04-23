import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angular5-social-login';


import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {MyAuthService} from './shared/my-auth.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BaseHttpInterceptor} from './shared/base-http-interceptor';
import {AuthInterceptor} from './shared/auth-interceptor';
import {MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import {environment} from '../environments/environment';
import {ErrorService} from './shared/error.service';
import { HomeComponent } from './pages/dashboard/home/home.component';
import {AuthGuardService} from './shared/auth-guard.service';
import {DashboardRoutingModule} from './pages/dashboard/dashboard-routing.module';
import {MediaMatcher} from '@angular/cdk/layout';

export function getAuthServiceConfigs() {
  return new AuthServiceConfig( [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(environment.serverGoogleClientId)
      },
    ]
  );
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,



  ],
  imports: [
    BrowserModule,
    FormsModule,
    DashboardRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SocialLoginModule,

    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: BaseHttpInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },

    MediaMatcher,

    AuthGuardService,
    MyAuthService,
    ErrorService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
