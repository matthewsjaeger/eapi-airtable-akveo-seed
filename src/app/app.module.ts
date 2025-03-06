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
  NbIconModule,
  NbIconLibraries,
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
  constructor(
    private iconLibraries: NbIconLibraries,
    private nbMenuService: NbMenuService,
    public themeService: NbThemeService,
    private authService: NbAuthService,
    private gds: GDS,
    public router: Router
  ) {
    // Register custom SVG icons
    this.iconLibraries.registerSvgPack('custom', {
      'table-game': '<img src="assets/icons/other_houses.svg" width="24px" height="24px"/>',
      'on-floor': '<img src="assets/icons/play_circle.svg" width="24px" height="24px"/>',
      'storage-slot': '<img src="assets/icons/inventory_2.svg" width="24px" height="24px"/>',
      'slot-projects': '<img src="assets/icons/stacks.svg" width="24px" height="24px"/>',
      'create-actions': '<img src="assets/icons/cloud_download.svg" width="24px" height="24px"/>',
      'cloud-download': '<img src="assets/icons/add_circle.svg" width="24px" height="24px"/>',
      'login': '<img src="assets/icons/shield.svg" width="24px" height="24px"/>',
      'relicensing': '<img src="assets/icons/check_circle.svg" width="24px" height="24px"/>',
      'header-arrow': '<img src="assets/icons/arrow_hamburger.svg" width="32px" height="32px"/>',
      'chevron-down': '<img src="assets/icons/chevron_right.svg" width="24px" height="24px"/>',
      'description': '<img src="assets/icons/description.svg" width="18px" height="19px"/>',
      'calendar': '<img src="assets/icons/calendar_clock.svg" width="18px" height="18px"/>',
    });

    this.iconLibraries.setDefaultPack('custom'); // Set the default icon pack

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
