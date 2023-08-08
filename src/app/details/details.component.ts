import { Component, AfterViewInit } from '@angular/core';
import { ApiService } from '../api.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FacebookLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

declare const gapi: any;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {

  private googleAuth: any;
  isDetailsVisible = false;
  user: SocialUser | null = null;
  loggedIn: boolean = false;

  constructor(public api: ApiService, private jwtHelper: JwtHelperService, private authService: SocialAuthService) {

  }

  ngOnInit() {
    this.api.loadGoogleAuth();
  }

  ngAfterViewInit() {
    // Initialize Google Sign-In here using gapi
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: '908871557137-gig0iemmk81qgrtgpp735a3nsaljbbg9.apps.googleusercontent.com',
        scope: 'profile-email'
      });
    });
  }

  // signInWithGoogle(): void {
  //   this.api.signIn().then((userData: any) => {
  //     // Handle user data from Google login
  //     console.log(userData);
  //   });
  // }

  signInWithGoogle() {
    gapi.auth2.getAuthInstance().signIn().then(
      (response: any) => {
        // Handle successful sign-in
        console.log('Signed in successfully:', response);
      },
      (error: any) => {
        // Handle sign-in error
        console.error('Sign-in error:', error);
      }
    );
  }

  signInWithFacebook(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
      .then(user => {
        this.user = user;
        this.loggedIn = true;
        // You can now use the user information as needed (e.g., send to your backend for authentication).
      })
      .catch(error => {
        console.log(error);
      });
  }

  signOut(): void {
    this.authService.signOut()
      .then(() => {
        this.user = null;
        this.loggedIn = false;
      })
      .catch(error => {
        console.log(error);
      });
  }


  // showDetails(){
  // }

}
