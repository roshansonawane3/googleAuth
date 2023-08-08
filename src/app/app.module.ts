import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import { AppComponent } from './app.component';
import { NumberComponent } from './number/number.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OtpComponent } from './otp/otp.component';
import { DetailsComponent } from './details/details.component';
import { JwtHelperService, JwtModule,JWT_OPTIONS } from '@auth0/angular-jwt';
import { FacebookLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';


@NgModule({
  declarations: [
    AppComponent,
    NumberComponent,
    OtpComponent,
    DetailsComponent
  ],
  imports: [
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
      },
    }),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    HttpClientModule,
    SocialLoginModule
  ],
  providers: [JwtHelperService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
         autoLogin: false,
         providers: [
          {
             id: FacebookLoginProvider.PROVIDER_ID,
             provider: new FacebookLoginProvider('1043599393666131')
          }
         ]
      } as SocialAuthServiceConfig,
     }],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function jwtOptionsFactory() {
  return {
    // Your JWT options here
    // For example, you might set "tokenGetter", "allowedDomains", etc.
  };
}
