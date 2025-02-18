import { NgModule } from '@angular/core';
import { EffortlessRoutingModule } from './effortless-routing.module';
import { NbMenuModule, NbCardModule, NbButtonModule, NbActionsModule, NbSelectModule, NbInputModule, NbTabsetModule, NbIconModule, NbSpinnerModule, NbToggleModule, NbListModule, NbDialogModule, NbLayoutModule, NbCheckboxModule, NbDatepickerModule, NbProgressBarModule, NbAlertModule, NbAccordionModule } from '@nebular/theme';
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
import { UpdateActiveSlotComponent } from './on-floor/on-floor-slot/update-active-slot/update-active-slot.component';
import { RequestActivationComponent } from './on-floor/on-floor-slot/request-activation/request-activation.component';
import { MlcPlaceSlotComponent } from './on-floor/on-floor-slot/mlc-conversion/mlc-place-slot/mlc-place-slot.component';
import { MlcAddComponent } from './on-floor/on-floor-slot/mlc-conversion/mlc-place-slot/mlc-add/mlc-add.component';
import { MlcBreakComponent } from './on-floor/on-floor-slot/mlc-conversion/mlc-place-slot/mlc-break/mlc-break.component';
import { MlcReplaceComponent } from './on-floor/on-floor-slot/mlc-conversion/mlc-place-slot/mlc-replace/mlc-replace.component';
import { PlaceConversionComponent } from './on-floor/on-floor-slot/mlc-conversion/mlc-place-slot/place-conversion/place-conversion.component';
import { MlcChecklistComponent } from './on-floor/on-floor-slot/mlc-conversion/mlc-place-slot/mlc-checklist/mlc-checklist.component';
import { LscPlaceSlotComponent } from './on-floor/on-floor-slot/lsc-conversion/lsc-place-slot/lsc-place-slot.component';
import { LscAddComponent } from './on-floor/on-floor-slot/lsc-conversion/lsc-place-slot/lsc-add/lsc-add.component';
import { LscReplaceComponent } from './on-floor/on-floor-slot/lsc-conversion/lsc-place-slot/lsc-replace/lsc-replace.component';
import { LscBreakComponent } from './on-floor/on-floor-slot/lsc-conversion/lsc-place-slot/lsc-break/lsc-break.component';
import { LscPlaceConversionComponent } from './on-floor/on-floor-slot/lsc-conversion/lsc-place-slot/lsc-place-conversion/lsc-place-conversion.component';
import { LscChecklistComponent } from './on-floor/on-floor-slot/lsc-conversion/lsc-place-slot/lsc-checklist/lsc-checklist.component';
import { CompleteMoveToStorageComponent } from './on-floor/on-floor-slot/complete-move-to-storage/complete-move-to-storage.component';
import { ScheduleMoveToStorageComponent } from './on-floor/on-floor-slot/schedule-move-to-storage/schedule-move-to-storage.component';
import { EditComponentsComponent } from './on-floor/on-floor-slot/edit-components/edit-components.component';
import { MultiOnFloorComponent } from './on-floor/multi-on-floor/multi-on-floor.component';
import { CdiComponent } from './cdi/cdi.component';
import { ComponentGeneratedComponent } from './cdi/component-generated/component-generated.component';
import { CdiStatusComponent } from './cdi-status/cdi-status.component';
import { CdiConflictedComponent } from './cdi/cdi-conflicted/cdi-conflicted.component';
import { ConflictedDetailsComponent } from './cdi/cdi-conflicted/conflicted-details/conflicted-details.component';
import { CdiManualComponent } from './cdi/cdi-manual/cdi-manual.component';
import { ComponentMatchedComponent } from './cdi/component-matched/component-matched.component';
import { InstalledDetailsComponent } from './cdi/cdi-conflicted/conflicted-details/installed-details/installed-details.component';
import { CdiSearchComponent } from './cdi/cdi-search/cdi-search.component';
import { CdiLetterComponent } from './cdi/cdi-letter/cdi-letter.component';
import { BjAtrComponent } from './bj-atr/bj-atr.component';
import { SearchTablesComponent } from './bj-atr/search-tables/search-tables.component';
import { BjTableComponent } from './bj-atr/bj-table/bj-table.component';
import { ScheduleTableModificationComponent } from './bj-atr/bj-table/schedule-table-modification/schedule-table-modification.component';
import { ScheduleTableRemoveComponent } from './bj-atr/bj-table/schedule-table-remove/schedule-table-remove.component';
import { ScheduleTournamentComponent } from './bj-atr/bj-table/schedule-tournament/schedule-tournament.component';
import { LogFeltChangeComponent } from './bj-atr/bj-table/log-felt-change/log-felt-change.component';
import { FeltChangeChecklistComponent } from './bj-atr/bj-table/felt-change-checklist/felt-change-checklist.component';
import { CompleteTableModificationComponent } from './bj-atr/bj-table/complete-table-modification/complete-table-modification.component';
import { CompleteTableRemoveComponent } from './bj-atr/bj-table/complete-table-remove/complete-table-remove.component';
import { ScheduleConversionComponent } from './on-floor/on-floor-slot/schedule-conversion/schedule-conversion.component';
import { ProjectScheduleConversionComponent } from './slot-projects/slot-project/project-schedule-conversion/project-schedule-conversion.component';
import { ResolveComponentAmbiguityComponent } from './slot-projects/slot-project/project-schedule-conversion/resolve-component-ambiguity/resolve-component-ambiguity.component';
import { ResolveReadOnlyComponent } from './slot-projects/slot-project/project-schedule-conversion/resolve-read-only/resolve-read-only.component';
import { AddRemoveSlotsComponent } from './slot-projects/slot-project/add-remove-slots/add-remove-slots.component';
import { ProjectScheduleMoveToStorageComponent } from './slot-projects/slot-project/project-schedule-move-to-storage/project-schedule-move-to-storage.component';
import { ProjectStorageToFloorComponent } from './slot-projects/slot-project/project-storage-to-floor/project-storage-to-floor.component';
import { RemovalTypeComponent } from './slot-projects/slot-project/removal-type/removal-type.component';
import { ProjectScheduleRemovalComponent } from './slot-projects/slot-project/project-schedule-removal/project-schedule-removal.component';
import { CancelScheduledEventsComponent } from './slot-projects/slot-project/cancel-scheduled-events/cancel-scheduled-events.component';
import { CreateActionsComponent } from './create-actions/create-actions.component';
import { CreateSlotComponent } from './create-actions/create-slot/create-slot.component';
import { ReceiveSlotComponent } from './on-floor/on-floor-slot/receive-slot/receive-slot.component';
import { ProjectSetUpSlotComponent } from './slot-projects/slot-project/project-set-up-slot/project-set-up-slot.component';
import { ApplyLicenseComponent } from './on-floor/on-floor-slot/apply-license/apply-license.component';
import { AddLicenseBarcodeComponent } from './on-floor/on-floor-slot/apply-license/add-license-barcode/add-license-barcode.component';
import { ConfigureSlotComponent } from './slot-projects/slot-project/configure-slot/configure-slot.component';
import { AddCabinetModelComponent } from './on-floor/on-floor-slot/add-cabinet-model/add-cabinet-model.component';
import { ResolveGameAmbiguityComponent } from './slot-projects/slot-project/project-schedule-conversion/resolve-game-ambiguity/resolve-game-ambiguity.component';
import { ResolveProgressiveAmbiguityComponent } from './slot-projects/slot-project/project-schedule-conversion/resolve-progressive-ambiguity/resolve-progressive-ambiguity.component';
import { RelicensingComponent } from './bj-atr/relicensing/relicensing.component';
import { ShuffleMastersComponent } from './bj-atr/shuffle-masters/shuffle-masters.component';
import { BjProjectsComponent } from './bj-atr/bj-projects/bj-projects.component';
import { BjProjectComponent } from './bj-atr/bj-projects/bj-project/bj-project.component';
import { NewBjProjectComponent } from './bj-atr/bj-projects/new-bj-project/new-bj-project.component';

let declarations: any[] = [EffortlessComponent, ReloadWidgetComponent, IonicComponent, Page3Component,
  StorageSlotsComponent, SlotProjectsComponent, SearchStorageSlotsComponent, SlotProjectComponent, NewProjectComponent,
  EditProjectComponent, StorageSlotComponent, OnFloorComponent, OnFloorSlotComponent,
  VerifyTenTwentyComponent, StackerFullRecordComponent, MediaVerificationComponent, PreventativeMaintenanceComponent, VerifyTwentyFiftyComponent,
  VerifyFiftyOnehundredComponent, VerifyOnehundredAboveComponent, StateInspectionComponent, GcInspectionComponent,
  LscConversionComponent, MlcConversionComponent, EditSealsComponent, AddSealComponent, ReplaceSealComponent, BreakSealComponent,
  PlaceSlotSealsComponent, ReplaceWitnessesComponent, EditSealsLogicAccessComponent,  UpdateActiveSlotComponent, 
  RequestActivationComponent, MlcPlaceSlotComponent, MlcAddComponent, MlcBreakComponent, MlcReplaceComponent, PlaceConversionComponent,
  MlcChecklistComponent, LscPlaceSlotComponent, LscAddComponent, LscReplaceComponent, LscBreakComponent, LscPlaceConversionComponent,
  LscChecklistComponent, CompleteMoveToStorageComponent, ScheduleMoveToStorageComponent, EditComponentsComponent, MultiOnFloorComponent,
  CdiComponent, ComponentGeneratedComponent, CdiStatusComponent, CdiConflictedComponent, ConflictedDetailsComponent, CdiManualComponent,
  ComponentMatchedComponent, InstalledDetailsComponent, CdiSearchComponent, CdiLetterComponent, BjAtrComponent, SearchTablesComponent, BjTableComponent,
  ScheduleTableModificationComponent, ScheduleTableRemoveComponent, ScheduleTournamentComponent, LogFeltChangeComponent, FeltChangeChecklistComponent,
  CompleteTableModificationComponent, CompleteTableRemoveComponent, ScheduleConversionComponent, ProjectScheduleConversionComponent, ResolveComponentAmbiguityComponent,
  ResolveReadOnlyComponent, AddRemoveSlotsComponent, ProjectScheduleMoveToStorageComponent, ProjectStorageToFloorComponent, RemovalTypeComponent, ProjectScheduleRemovalComponent,
  CancelScheduledEventsComponent, CreateActionsComponent, CreateSlotComponent, ReceiveSlotComponent, ProjectSetUpSlotComponent, ApplyLicenseComponent, AddLicenseBarcodeComponent,
  ConfigureSlotComponent, AddCabinetModelComponent, ResolveGameAmbiguityComponent, ResolveProgressiveAmbiguityComponent, RelicensingComponent, ShuffleMastersComponent, BjProjectsComponent,
  BjProjectComponent, NewBjProjectComponent];

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
    NbProgressBarModule,
    NbAlertModule,
    NbAccordionModule,
    NbDialogModule.forChild(),
    NbDatepickerModule.forRoot()
  ],
  entryComponents: [ AddSealComponent, ReplaceSealComponent, BreakSealComponent, PlaceSlotSealsComponent, 
    ReplaceWitnessesComponent, MlcAddComponent, MlcBreakComponent, MlcReplaceComponent,
    PlaceConversionComponent, LscAddComponent, LscReplaceComponent, LscBreakComponent, LscPlaceConversionComponent,
    ComponentGeneratedComponent, CdiStatusComponent, ComponentMatchedComponent, CompleteTableModificationComponent,
    CompleteTableRemoveComponent, ResolveComponentAmbiguityComponent, ResolveReadOnlyComponent, RemovalTypeComponent,
    AddLicenseBarcodeComponent, ResolveGameAmbiguityComponent, ResolveProgressiveAmbiguityComponent]
})
export class EffortlessModule {

}
