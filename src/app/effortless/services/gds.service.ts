declare var generateGuestActor: any;
declare var generateATRActor: any;
declare var generateAuditAgentActor: any;
declare var generateGAINSUserActor: any;
declare var generateBJFeltLogActor: any;
declare var generateSlotRepairAdminActor: any;
declare var generateGamingAgentActor: any;


import { Injectable, ɵConsole } from '@angular/core';
import { NbMenuService } from '@nebular/theme';
import { Observable, BehaviorSubject, Subscription, timer, combineLatest } from 'rxjs';
import { Router } from '@angular/router';
import { filter, share, map, catchError, take, tap } from 'rxjs/operators';

interface TSWindow {
  [id: string]: any;
}

@Injectable()
export class GDS {
  dontConnect() {
    this.readiness$.next({});
  }

  public editSealPayload: any;
  public menu: NbMenuService;
  public smqPassword: string;
  public smqUsername: string;
  public vhost: string;
  public window: TSWindow = {};
  public isUserConnected: boolean;
  public smqGuest: any;
  public rabbitEndpoint: string;
  public accessToken: string;
  public createPayload: () => any;
  public myRoles: any;
  public smqUser: any;
  public smqBJFeltLog: any;
  public smqGamingAgent: any;
  public smqAuditAgent: any;
  public smqATR: any;
  public smqSlotRepairAdmin: any;
  public smqPayroll: any;
  public isAdmin: boolean;
  public isGamingAgent: boolean;
  public isAuditAgent: boolean;
  public isBJFeltLog: boolean;
  public isATR: boolean;
  public isEmployee: boolean;
  public isPayroll: boolean;
  public isManager: boolean;
  public role: string;
  public GAINSUser: any;
  public phases: any;
  public applicant: any;
  public firstLoad: boolean;
  public customer: any;
  public employee: any;
  public timers: Subscription[] = [];
  private readiness$: BehaviorSubject<{}> = new BehaviorSubject(null);

  public onReady(): Observable<any> {
    return this.readiness$
      .pipe(
      filter(value => !!value),
      share()
      )
  }

  constructor(private router: Router) {
    var self = this;
  }

  saveAccessToken(accessToken: string) {
    if (!accessToken) return;
    var gds = this;
    gds.accessToken = accessToken;
    localStorage.setItem('accessToken', accessToken);
    gds.smqGuest.WhoAmI(gds.createPayload())
      .then(function (waiReply) {
        gds.myRoles = waiReply.SingletonAppUser;
        gds.connect();
      });
  }

  public logout() {
    this.isAdmin = false;
    this.isGamingAgent = false;
    this.isAuditAgent = false;
    this.isBJFeltLog = false;
    this.isATR = false;
    this.isEmployee = false;
    this.myRoles = null;
    Object.keys(this).forEach(key => {
      if (this[key] instanceof BehaviorSubject) {
        this[key].next(null);
      }
    })
  }

  connect() {
    console.log("LOADING ALL DATA");
    console.log('test');
    var gds = this;
    if (!gds.myRoles) {
      alert('ERROR AUTHENTICATING');
      return;
    }
    gds.isAdmin = false;
    gds.isGamingAgent = false;
    gds.isAuditAgent = false;
    gds.isBJFeltLog = false;
    gds.isATR = false;
 
    gds.myRoles.forEach(role => {
      if (role.Description == 'Administrators') {
        gds.isAdmin = true;
      }
      if (role.Description == 'Gaming Agent') {
        gds.isGamingAgent = true;
      }
      if (role.isAuditAgent == 'Audit Agent') {
        gds.isAuditAgent = true;
      }
      if (role.Description == 'BJ Felt Log') {
        gds.isBJFeltLog = true;
      }
      if (role.Description == 'ATR') {
        gds.isATR = true;
      }
    });

    //gds.smqUser = generateGAINSUserActor();
    //gds.smqUser.rabbitEndpoint = gds.rabbitEndpoint;
    //gds.smqUser.connect(gds.vhost, gds.smqUsername, gds.smqPassword, function () { }, function () {
    //  gds.isUserConnected = true;
    //  gds.readiness$.next({});
    //});

    gds.smqBJFeltLog = generateBJFeltLogActor();
    gds.smqBJFeltLog.rabbitEndpoint = gds.rabbitEndpoint;
    gds.smqBJFeltLog.connect(gds.vhost, gds.smqUsername, gds.smqPassword, function () { }, function () { });
    gds.smqGamingAgent = generateGamingAgentActor();
    gds.smqGamingAgent.rabbitEndpoint = gds.rabbitEndpoint;
    gds.smqGamingAgent.connect(gds.vhost, gds.smqUsername, gds.smqPassword, function () { }, function () { });
    gds.smqAuditAgent = generateAuditAgentActor();
    gds.smqAuditAgent.rabbitEndpoint = gds.rabbitEndpoint;
    gds.smqAuditAgent.connect(gds.vhost, gds.smqUsername, gds.smqPassword, function () { }, function () { });
    gds.smqSlotRepairAdmin = generateSlotRepairAdminActor();
    gds.smqSlotRepairAdmin.rabbitEndpoint = gds.rabbitEndpoint;
    gds.smqSlotRepairAdmin.connect(gds.vhost, gds.smqUsername, gds.smqPassword, function () { }, function () { });
    gds.smqATR = generateATRActor();
    gds.smqATR.rabbitEndpoint = gds.rabbitEndpoint;
    gds.smqATR.connect(gds.vhost, gds.smqUsername, gds.smqPassword, function () { }, function () {
      gds.readiness$.next({});
    });

    gds.smqUser.createPayload = gds.smqUser.createPayload || function () {
      return { "AccessToken": gds.smqUser.accessToken || gds.accessToken };
    };
  }
}

/*
   
        */
