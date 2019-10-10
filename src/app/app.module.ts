import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {appRoutes} from './app.routes';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {MsalModule, MsalInterceptor, MsalService} from '@azure/msal-angular';
import { CmcHttpService } from './cmc-http.service';

const tenantID = 'bda528f7-fca9-432f-bc98-bd7e90d40906';
const clientID = '7c8826dc-6c3b-4b6e-84a4-deae9d028ef9';

export const protectedResourceMap: [string, string[]][] = [
  [
    'http://dptiintravd02:3000', []
  ],
  [
    'http://localhost:3000', []
  ]
];

export function loggerCallback(logLevel, message, piiEnabled) {
  console.log(message);
}

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {useHash: true}) ,
    MsalModule.forRoot({
        clientID,
        authority: `https://login.microsoftonline.com/${tenantID}`,
        consentScopes: [ 'user.read' ],
        cacheLocation : 'sessionStorage',
        protectedResourceMap,
      }
    ),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
