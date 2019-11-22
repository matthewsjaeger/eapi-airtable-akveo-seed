import { NgModule } from '@angular/core';
import { InquiriesComponent } from './inquiries/inquiries.component';
import { UspRoutingModule } from './effortless-routing.module';
import { NbMenuModule, NbCardModule, NbButtonModule, NbActionsModule, NbSelectModule, NbInputModule, NbTabsetModule, NbIconModule, NbSpinnerModule, NbToggleModule, NbListModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { UspComponent } from './effortless.component';
import { FormsModule } from '@angular/forms';
import { Ng5SliderModule } from 'ng5-slider';
import { ReloadWidgetComponent } from './widgets/reload-widget/reload-widget.component';



@NgModule({
  declarations: [UspComponent, 
    InquiriesComponent],
  imports: [
    UspRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbTabsetModule,
    NbIconModule,
    NbToggleModule,
    NbListModule,
    NbSpinnerModule,
    ThemeModule,
      NbMenuModule,
      FormsModule,
      Ng5SliderModule,
      NbSelectModule,
      NbInputModule,
  ]
})
export class UspModule {

}
