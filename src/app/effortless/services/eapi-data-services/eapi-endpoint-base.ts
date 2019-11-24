import { GDS } from '../gds.service';

export class EapiEndpointBase {
    constructor(public gds: GDS) {

    }

    public static defaultSort(defaultA: any, defaultB: any): number {
        let objectResult = EapiEndpointBase.objectSort(defaultA, defaultB);

        if ((objectResult == 0) && defaultA && defaultA.Name) {
            if (defaultA.Name > defaultB.Name) return 1;
            else if (defaultB.Name > defaultA.Name) return -1;
        }

        return 0;
    }

    public static objectSort(defaultA: any, defaultB: any): number {
        if (defaultA && !defaultB) return 1;
        else if (defaultB && !defaultA) return -1;
        return 0;
    }

    public static sortBy(items: any, sortField: string): any {
        return items.sort(function (a, b) {
            var objectSort = EapiEndpointBase.objectSort(a, b);
            if (objectSort == 0 && a) {
                if (a[sortField] > b[sortField]) return 1;
                else if (b[sortField] > a[sortField]) return -1;
            }
            return 0;
        })
    }

    public doReload(smqUser: any, idName: string, lowerName: string, upperName: string, airtableWhere: string, sortField: string = '', isSingular: boolean = false) {
        let self = this;

        if (!smqUser) smqUser = self.gds.smqUser;
        let payload = smqUser.createPayload ? smqUser.createPayload() : self.gds.createPayload();
        payload.AirtableWhere = airtableWhere;

        smqUser['Get' + upperName](payload)
            .then(reply => {
                self[lowerName + 'ById'] = {}
                let items = reply[upperName];
                if (items) {
                    if (sortField) items = EapiEndpointBase.sortBy(items, sortField);
                    else items = items.sort(self[lowerName + 'Sort']);
                    items.forEach(item => {
                        self[lowerName + 'ById'][item[idName]] = item;
                    })
                }
                if (!isSingular) {
                    self[lowerName] = items;
                    self[lowerName + '$'].next(self[lowerName]);
                } else {
                    self[lowerName] = items[0];
                    self[lowerName + '$'].next(self[lowerName]);
                }
            });

    }

}