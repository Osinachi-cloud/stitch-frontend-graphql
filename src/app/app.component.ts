import { Component } from '@angular/core';
import { TokenService } from './services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router) { }

  token = TokenService.getToken();
  userAuthenticated: boolean = this.token && !TokenService.isTokenExpired(this.token);

  logOutIfNotAuthenticated() {
    console.log("not authenticated on the app 2");

    if (!this.userAuthenticated) {
      console.log("not authenticated on the app 3");
      this.router.navigate["/login"];
      // window.location.reload();

    } else {
      console.log("authenticated on the app");
    }

  }

  ngOnInit() {
    console.log("not authenticated on the app");
    this.logOutIfNotAuthenticated();
  }


  title = 'trevautyInternalApp';
  isRed = true;
  isBlue = true;
  isGreen = true;

  dynamicClass = 'dynamicClass'
}
