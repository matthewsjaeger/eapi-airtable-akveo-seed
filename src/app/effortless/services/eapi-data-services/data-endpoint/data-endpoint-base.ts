/*
THIS FILE IS DERIVED - CHANGES WILL BE OVERWRITTEN (derived)
*/
import { EapiEndpointBase } from './eapi-endpoint-base';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, share } from 'rxjs/operators';
import { GDS } from '../../gds.service';

export class DataEndpointBase extends EapiEndpointBase {

    constructor(public gds: GDS) {
        super(gds)
    }






    // HANDLERS FOR: GAINSUser
    public gainsuser: any = {};
    public gainsusers: any[] = [];
    public gainsusersById: any = {};
    public gainsuser$: BehaviorSubject<any[]> = new BehaviorSubject(null);
    public gainsusers$: BehaviorSubject<any[]> = new BehaviorSubject(null);

    public onGAINSUsersChange(): Observable<any> {
        return this.gainsusers$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public onGAINSUserChange(): Observable<any> {
        return this.gainsuser$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public async reloadGAINSUsers(smqUser: any = null, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'GAINSUserId', 'gainsusers', 'GAINSUsers', '', sortField, true, behaviorSubject);
    }

    public async reloadGAINSUsersWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'GAINSUserId', 'gainsusers', 'GAINSUsers', airtableWhere, sortField, true, behaviorSubject);
    }

    public async reloadGAINSUserWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'GAINSUserId', 'gainsuser', 'GAINSUsers', airtableWhere, sortField, false, behaviorSubject);
    }

    public gainsusersSort(gainsuserA: any, gainsuserB: any) {
        return EapiEndpointBase.defaultSort(gainsuserA, gainsuserB);
    } 





    // HANDLERS FOR: ItemCount
    public itemcount: any = {};
    public itemcounts: any[] = [];
    public itemcountsById: any = {};
    public itemcount$: BehaviorSubject<any[]> = new BehaviorSubject(null);
    public itemcounts$: BehaviorSubject<any[]> = new BehaviorSubject(null);

    public onItemCountsChange(): Observable<any> {
        return this.itemcounts$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public onItemCountChange(): Observable<any> {
        return this.itemcount$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public async reloadItemCounts(smqUser: any = null, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'ItemCountId', 'itemcounts', 'ItemCounts', '', sortField, true, behaviorSubject);
    }

    public async reloadItemCountsWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'ItemCountId', 'itemcounts', 'ItemCounts', airtableWhere, sortField, true, behaviorSubject);
    }

    public async reloadItemCountWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'ItemCountId', 'itemcount', 'ItemCounts', airtableWhere, sortField, false, behaviorSubject);
    }

    public itemcountsSort(itemcountA: any, itemcountB: any) {
        return EapiEndpointBase.defaultSort(itemcountA, itemcountB);
    } 





    // HANDLERS FOR: TemporaryAccessToken
    public temporaryaccesstoken: any = {};
    public temporaryaccesstokens: any[] = [];
    public temporaryaccesstokensById: any = {};
    public temporaryaccesstoken$: BehaviorSubject<any[]> = new BehaviorSubject(null);
    public temporaryaccesstokens$: BehaviorSubject<any[]> = new BehaviorSubject(null);

    public onTemporaryAccessTokensChange(): Observable<any> {
        return this.temporaryaccesstokens$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public onTemporaryAccessTokenChange(): Observable<any> {
        return this.temporaryaccesstoken$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }

    public async reloadTemporaryAccessTokens(smqUser: any = null, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'TemporaryAccessTokenId', 'temporaryaccesstokens', 'TemporaryAccessTokens', '', sortField, true, behaviorSubject);
    }

    public async reloadTemporaryAccessTokensWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'TemporaryAccessTokenId', 'temporaryaccesstokens', 'TemporaryAccessTokens', airtableWhere, sortField, true, behaviorSubject);
    }

    public async reloadTemporaryAccessTokenWhere(smqUser: any = null, airtableWhere : string, sortField : string = '', behaviorSubject?: BehaviorSubject<any>) {
        return this.doReload(smqUser, 'TemporaryAccessTokenId', 'temporaryaccesstoken', 'TemporaryAccessTokens', airtableWhere, sortField, false, behaviorSubject);
    }

    public temporaryaccesstokensSort(temporaryaccesstokenA: any, temporaryaccesstokenB: any) {
        return EapiEndpointBase.defaultSort(temporaryaccesstokenA, temporaryaccesstokenB);
    } 

}
