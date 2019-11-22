/*
THIS FILE IS DERIVED - CHANGES WILL BE OVERWRITTEN (derived)
*/
import { EapiEndpointBase } from '../eapi-endpoint-base';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, share } from 'rxjs/operators';
import { GDS } from '../../gds.service';

export class CrmEndpointBase extends EapiEndpointBase {

    constructor(public gds: GDS) {
        super(gds)
    }






    // HANDLERS FOR: Network
    public network: any = {};
    public networks: any[] = [];
    public networksById: any = {};
    public network$: BehaviorSubject<any[]> = new BehaviorSubject(null);
    public networks$: BehaviorSubject<any[]> = new BehaviorSubject(null);

    public onNetworksChange(): Observable<any> {
        return this.networks$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public reloadNetworks(smqUser: any = null, sortField : string = '') {
        this.doReload(smqUser, 'NetworkId', 'networks', 'Networks', '', sortField);
    }

    public reloadNetworksWhere(smqUser: any = null, airtableWhere : string, sortField : string = '') {
        this.doReload(smqUser, 'NetworkId', 'networks', 'Networks', airtableWhere, sortField);
    }

    public networksSort(networkA: any, networkB: any) {
        return EapiEndpointBase.defaultSort(networkA, networkB);
    } 





    // HANDLERS FOR: AppUser
    public appuser: any = {};
    public appusers: any[] = [];
    public appusersById: any = {};
    public appuser$: BehaviorSubject<any[]> = new BehaviorSubject(null);
    public appusers$: BehaviorSubject<any[]> = new BehaviorSubject(null);

    public onAppUsersChange(): Observable<any> {
        return this.appusers$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public reloadAppUsers(smqUser: any = null, sortField : string = '') {
        this.doReload(smqUser, 'AppUserId', 'appusers', 'AppUsers', '', sortField);
    }

    public reloadAppUsersWhere(smqUser: any = null, airtableWhere : string, sortField : string = '') {
        this.doReload(smqUser, 'AppUserId', 'appusers', 'AppUsers', airtableWhere, sortField);
    }

    public appusersSort(appuserA: any, appuserB: any) {
        return EapiEndpointBase.defaultSort(appuserA, appuserB);
    } 





    // HANDLERS FOR: MyShow
    public myshow: any = {};
    public myshows: any[] = [];
    public myshowsById: any = {};
    public myshow$: BehaviorSubject<any[]> = new BehaviorSubject(null);
    public myshows$: BehaviorSubject<any[]> = new BehaviorSubject(null);

    public onMyShowsChange(): Observable<any> {
        return this.myshows$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public reloadMyShows(smqUser: any = null, sortField : string = '') {
        this.doReload(smqUser, 'MyShowId', 'myshows', 'MyShows', '', sortField);
    }

    public reloadMyShowsWhere(smqUser: any = null, airtableWhere : string, sortField : string = '') {
        this.doReload(smqUser, 'MyShowId', 'myshows', 'MyShows', airtableWhere, sortField);
    }

    public myshowsSort(myshowA: any, myshowB: any) {
        return EapiEndpointBase.defaultSort(myshowA, myshowB);
    } 





    // HANDLERS FOR: Show
    public show: any = {};
    public shows: any[] = [];
    public showsById: any = {};
    public show$: BehaviorSubject<any[]> = new BehaviorSubject(null);
    public shows$: BehaviorSubject<any[]> = new BehaviorSubject(null);

    public onShowsChange(): Observable<any> {
        return this.shows$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public reloadShows(smqUser: any = null, sortField : string = '') {
        this.doReload(smqUser, 'ShowId', 'shows', 'Shows', '', sortField);
    }

    public reloadShowsWhere(smqUser: any = null, airtableWhere : string, sortField : string = '') {
        this.doReload(smqUser, 'ShowId', 'shows', 'Shows', airtableWhere, sortField);
    }

    public showsSort(showA: any, showB: any) {
        return EapiEndpointBase.defaultSort(showA, showB);
    } 

}
