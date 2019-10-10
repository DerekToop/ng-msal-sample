import { Component, OnInit, OnDestroy } from '@angular/core';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CmcHttpService } from './cmc-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  public title = 'MSAL Lab';
  public loggedIn: boolean;

  constructor(
    private broadcastService: BroadcastService,
    private authService: MsalService,
    protected httpSvc: CmcHttpService,
  ) {
    if (this.authService.getUser()) {
      this.loggedIn = true;
    } else {
     this.loggedIn = false;
    }
  }

  login() {
    const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

    if (isIE) {
      this.authService.loginRedirect();
    } else {
      this.authService.loginPopup();
    }
  }

  logout() {
   this.authService.logout();
  }

  vendors() {
    const url = 'http://dptiintravd02:3000/SearchResults?keyword=joe';
    this.httpSvc.httpGet<any>(url, '')
      .subscribe((payload) => {
        console.log(payload);
      });
  }

  ngOnInit() {
    this.broadcastService.subscribe('msal:loginFailure', (payload) => {
      console.log('login failure ' + JSON.stringify(payload));
      this.loggedIn = false;
    });

    this.broadcastService.subscribe('msal:loginSuccess', (payload) => {
      console.log('login success ' + JSON.stringify(payload));
      this.loggedIn = true;
    });
  }

  ngOnDestroy() {
    this.broadcastService.getMSALSubject().next(1);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
