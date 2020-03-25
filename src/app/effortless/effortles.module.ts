import { NgModule } from '@angular/core';
import { EffortlessRoutingModule } from './effortless-routing.module';
import { NbMenuModule, NbCardModule, NbButtonModule, NbActionsModule, NbSelectModule, NbInputModule, NbTabsetModule, NbIconModule, NbSpinnerModule, NbToggleModule, NbListModule, NbDialogModule, NbLayoutModule, NbCheckboxModule, NbDatepickerModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { EffortlessComponent } from './effortless.component';
import { FormsModule } from '@angular/forms';
import { Ng5SliderModule } from 'ng5-slider';
import { ReloadWidgetComponent } from './widgets/reload-widget/reload-widget.component';
import { IonicComponent } from './ionic/ionic.component';
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
import { VerifyTwentyFiftyComponent } from './on-floor/on-floor-slot/verify-twenty-fifty/verify-twenty-fifty.component';
import { VerifyFiftyOnehundredComponent } from './on-floor/on-floor-slot/verify-fifty-onehundred/verify-fifty-onehundred.component';
import { VerifyOnehundredAboveComponent } from './on-floor/on-floor-slot/verify-onehundred-above/verify-onehundred-above.component';
import { StateInspectionComponent } from './on-floor/on-floor-slot/state-inspection/state-inspection.component';
import { GcInspectionComponent } from './on-floor/on-floor-slot/gc-inspection/gc-inspection.component';
import { LscConversionComponent } from './on-floor/on-floor-slot/lsc-conversion/lsc-conversion.component';
import { MlcConversionComponent } from './on-floor/on-floor-slot/mlc-conversion/mlc-conversion.component';
import { EditSealsComponent } from './on-floor/on-floor-slot/edit-seals/edit-seals.component';
import { AddSealComponent } from './on-floor/on-floor-slot/edit-seals/add-seal/add-seal.component';
import { ReplaceSealComponent } from './on-floor/on-floor-slot/edit-seals/replace-seal/replace-seal.component';
import { BreakSealComponent } from './on-floor/on-floor-slot/edit-seals/break-seal/break-seal.component';
import { PlaceSlotSealsComponent } from './on-floor/on-floor-slot/edit-seals/replace-seal/place-slot-seals/place-slot-seals.component';
import { ReplaceWitnessesComponent } from './on-floor/on-floor-slot/edit-seals/replace-seal/place-slot-seals/replace-witnesses/replace-witnesses.component';
import { EditSealsLogicAccessComponent } from './on-floor/on-floor-slot/edit-seals/edit-seals-logic-access/edit-seals-logic-access.component';
import { QuickCorrectionComponent } from './on-floor/on-floor-slot/quick-correction/quick-correction.component';
import { UpdateActiveSlotComponent } from './on-floor/on-floor-slot/update-active-slot/update-active-slot.component';
import { RequestActivationComponent } from './on-floor/on-floor-slot/request-activation/request-activation.component';

let declarations: any[] = [EffortlessComponent, ReloadWidgetComponent, IonicComponent, Page3Component,
  StorageSlotsComponent, SlotProjectsComponent, SearchStorageSlotsComponent, SlotProjectComponent, NewProjectComponent,
   EditProjectComponent, StorageSlotComponent, OnFloorComponent, OnFloorSlotComponent, EmergencyDropInspectionComponent,
  VerifyTenTwentyComponent, StackerFullRecordComponent, MediaVerificationComponent, PreventativeMaintenanceComponent, VerifyTwentyFiftyComponent,
VerifyFiftyOnehundredComponent, VerifyOnehundredAboveComponent, StateInspectionComponent, GcInspectionComponent,
LscConversionComponent, MlcConversionComponent, EditSealsComponent, AddSealComponent, ReplaceSealComponent, BreakSealComponent,
PlaceSlotSealsComponent, ReplaceWitnessesComponent, EditSealsLogicAccessComponent, QuickCorrectionComponent, UpdateActiveSlotComponent, RequestActivationComponent];

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
    NbSpinnerModule,
    ThemeModule,
    NbMenuModule,
    FormsModule,
    Ng5SliderModule,
    NbSelectModule,
    NbInputModule,
    NbLayoutModule,
    NbCheckboxModule,
    FormsModule,
    NbDialogModule.forChild(),
    NbDatepickerModule.forRoot()
  ],
  entryComponents: [ AddSealComponent, ReplaceSealComponent, BreakSealComponent, PlaceSlotSealsComponent, ReplaceWitnessesComponent, QuickCorrectionComponent]
})
export class EffortlessModule {

}
