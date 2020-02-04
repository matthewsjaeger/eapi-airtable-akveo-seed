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

    public slotproject: any ={}
    public slotprojects: any[] =[];
    public slotprojectssById: any = {};
    public slotproject$: BehaviorSubject<any[]> = new BehaviorSubject(null);
    public slotprojects$: BehaviorSubject<any[]> = new BehaviorSubject(null);

    public onSlotProjectsChange(): Observable<any> {
        return this.slotprojects$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }  
    
    public slot: any ={}
    public slots: any[] =[];
    public slotsById: any = {};
    public slot$: BehaviorSubject<any[]> = new BehaviorSubject(null);
    public slots$: BehaviorSubject<any[]> = new BehaviorSubject(null);

    public onSlotsChange(): Observable<any> {
        return this.slots$
            .pipe(
                filter(value => !!value),
                share(),
            );
    }   
}


