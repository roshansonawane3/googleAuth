import { Injectable } from '@angular/core';
import { HttpClientModule,HttpClient  } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private googleAuth: any;

  number:any;
  item:any;
  url = 'http://wap.globocom.info/mglobopay';


  constructor(private jwtHelper: JwtHelperService,public http : HttpClient) { }
  

  loadGoogleAuth(): Promise<void> {
    return new Promise<void>((resolve) => {
      gapi.load('auth2', () => {
        gapi.auth2
          .init({
            client_id: '908871557137-gig0iemmk81qgrtgpp735a3nsaljbbg9.apps.googleusercontent.com',
          })
          .then((auth: any) => {
            this.googleAuth = auth;
            resolve();
          });
      });
    });
  }

  signIn(): Promise<any> {
    return this.googleAuth.signIn().then((googleUser: any) => {
      const idToken = googleUser.getAuthResponse().id_token;
      if (idToken) {
        return { idToken, ...googleUser.w3 };
      }
    });
  }

  signOut(): void {
    this.googleAuth.signOut();
  }

  getMobile(){
    return this.number;
  }

  setMobile(number: any){
    this.number = number;
  }


  getOtpLogin(number:any){
    return this.http.get(this.url+'/PINGEN?msisdn='+number)
  }

  verifyOtp(number:any,otp:any){
    return this.http.get(this.url+'/PINVER?msisdn='+number+'&pin='+otp)
  }

}
