import { BarsComponent } from "./bars/bars.component";
import { BarComponent } from './bars/bar/bar.component';
import { DataComponent } from './data.component';


export class DerivedDataDeclarations {
    static derivedDeclarations = [
        BarsComponent, // chhanged
        BarComponent
    ]

    static derivedPages: any[] = [
        {
            path: 'data',
            component: DataComponent,
        },
        {
            path: 'data/bars',
            component: BarsComponent,
        },
        {
            path: 'data/bars/bar',
            component: BarComponent
        },
        {
            path: 'data/bars/bar/:id',
            component: BarComponent
        },
    ];
};
