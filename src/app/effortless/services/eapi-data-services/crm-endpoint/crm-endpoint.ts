import { CrmEndpointBase } from './crm-endpoint-base';
import { Injectable } from '@angular/core';

@Injectable()
export class CrmEndpoint extends CrmEndpointBase {
    dataLoaded: boolean;
    reloadStaticData(actor: any) {
        if (this.dataLoaded) {
            return;
        } else {
            this.dataLoaded = true;
            this.reloadNetworks(actor);
            this.reloadShows(actor);
        }
    }
}
