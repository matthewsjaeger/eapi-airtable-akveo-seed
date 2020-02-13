import { NgModule } from '@angular/core';
import { EffortlessRoutingModule } from './effortless-routing.module';
import { NbMenuModule, NbCardModule, NbButtonModule, NbActionsModule, NbSelectModule, NbInputModule, NbTabsetModule, NbIconModule, NbSpinnerModule, NbToggleModule, NbListModule, NbDialogModule, NbLayoutModule, NbCheckboxModule, NbRadioModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { EffortlessComponent } from './effortless.component';
import { FormsModule } from '@angular/forms';
import { Ng5SliderModule } from 'ng5-slider';
import { ReloadWidgetComponent } from './widgets/reload-widget/reload-widget.component';
import { IonicComponent } from './ionic/ionic.component';
import { Page2Component } from './page2/page2.component';
import { Page3Component } from './page3/page3.component';
import { JsonEditorModule } from 'ng2-json-editor';
import { StorageSlotsComponent } from './storage-slots/storage-slots.component';
import { SlotProjectsComponent } from './slot-projects/slot-projects.component';
import { SearchStorageSlotsComponent } from './storage-slots/search-storage-slots/search-storage-slots.component';
import { SlotProjectComponent } from './slot-projects/slot-project/slot-project.component';
import { NewProjectComponent } from './slot-projects/new-project/new-project.component';
import { EditProjectComponent } from './slot-projects/slot-project/edit-project/edit-project.component';
import { StorageSlotComponent } from './storage-slots/search-storage-slots/storage-slot/storage-slot.component';
import { OnFloorComponent } from './on-floor/on-floor.component';
import { OnFloorSlotComponent } from './on-floor/on-floor-slot/on-floor-slot.component';
import { EmergencyDropInspectionComponent } from './on-floor/on-floor-slot/emergency-drop-inspection/emergency-drop-inspection.component';
import { VerifyTenTwentyComponent } from './on-floor/on-floor-slot/verify-ten-twenty/verify-ten-twenty.component';
import { StackerFullRecordComponent } from './on-floor/on-floor-slot/stacker-full-record/stacker-full-record.component';
import { MediaVerificationComponent } from './on-floor/on-floor-slot/media-verification/media-verification.component';
import { PreventativeMaintenanceComponent } from './on-floor/on-floor-slot/preventative-maintenance/preventative-maintenance.component';

let declarations: any[] = [EffortlessComponent, ReloadWidgetComponent, IonicComponent, Page2Component, Page3Component,
  StorageSlotsComponent, SlotProjectsComponent, SearchStorageSlotsComponent, SlotProjectComponent, NewProjectComponent,
   EditProjectComponent, StorageSlotComponent, OnFloorComponent, OnFloorSlotComponent, EmergencyDropInspectionComponent,
  VerifyTenTwentyComponent, StackerFullRecordComponent, MediaVerificationComponent, PreventativeMaintenanceComponent];

@NgModule({
  declarations: declarations,
  imports: [
    EffortlessRoutingModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbTabsetModule,
    JsonEditorModule,
    NbIconModule,
    NbToggleModule,
    NbListModule,
    NbRadioModule,
    NbSpinnerModule,
    ThemeModule,
    NbMenuModule,
    FormsModule,
    Ng5SliderModule,
    NbSelectModule,
    NbInputModule,
    NbLayoutModule,
    NbCheckboxModule,
    NbDialogModule.forChild()
  ],
})
export class EffortlessModule {

}
