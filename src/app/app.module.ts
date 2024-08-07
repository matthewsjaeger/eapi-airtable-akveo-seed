/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
  NbMenuService,
  NbThemeService,
  NbTabsetModule,
  NbCheckboxModule,
} from '@nebular/theme';
import { GDS } from './effortless/services/gds.service';
import { DataEndpoint } from './effortless/services/eapi-data-services/data-endpoint/data-endpoint';
import { NbAuthService, NbAuthJWTToken } from './@core/auth';
import { AuthGuard } from './auth-guard.service';
import { Globals } from './app.globals';
import { Router } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    ThemeModule.forRoot(),

    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbCheckboxModule,
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
  ],
  providers: [GDS, DataEndpoint, AuthGuard, Globals],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private nbMenuService: NbMenuService, public themeService: NbThemeService, private authService: NbAuthService, private gds: GDS, public router: Router) {
    var gds = this.gds;
    let self = this;
    gds.firstLoad = true;
    gds.menu = nbMenuService;
    gds.smqUser = window['generateGAINSUserActor']();
    gds.rabbitEndpoint = window['rabbitEndpoint'];
    gds.smqUser.rabbitEndpoint = gds.rabbitEndpoint;
    gds.accessToken = "";
    gds.createPayload = function () {
      return { "AccessToken": gds.accessToken };
    }

    gds.vhost = "GAINS";
    gds.smqUsername = "gainsUser";
    gds.smqPassword = "4GrZkr46obls";

    gds.smqUser.connect(gds.vhost, gds.smqUsername, gds.smqPassword, function () { }, function () {
      gds.isUserConnected = true;
      self.authService.onTokenChange()
        .subscribe((token: NbAuthJWTToken) => {
          if (token.isValid()) {
            gds.accessToken = token.getValue()
            gds.createPayload = function () {
              return { "JWT": gds.accessToken };
            };
            if (gds.firstLoad) {
              gds.firstLoad = false;
              gds.smqUser.MyRoles(gds.createPayload())
                .then(function (waiReply) {
                  if (waiReply.ErrorMessage) {
                    self.router.navigateByUrl('auth/login');
                  }
                  console.error(waiReply);
                  gds.myRoles = waiReply.Roles;
                  gds.GAINSUser = waiReply.GAINSUser;
                  gds.connect();
                });
            }
          }
          else {
            gds.accessToken = "";
            gds.createPayload = function () {
              return { "AccessToken": gds.accessToken };
            };
            self.router.navigateByUrl('auth/login');
            gds.dontConnect();
          }
        });
    });

  }
}
