/*
THIS FILE IS DERIVED - CHANGES WILL BE OVERWRITTEN (derived)
*/
import { EapiEndpointBase } from '../eapi-endpoint-base';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, share } from 'rxjs/operators';
import { GDS } from '../../gds.service';

export class DataEndpointBase extends EapiEndpointBase {

    constructor(public gds: GDS) {
        super(gds)
    }


}
