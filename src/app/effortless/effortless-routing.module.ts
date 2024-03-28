import { RouterModule, Routes } from '@angular/router';
import { NgModule, Component } from '@angular/core';

import { EffortlessComponent } from './effortless.component';
import { IonicComponent } from './ionic/ionic.component';
import { StorageSlotsComponent} from './storage-slots/storage-slots.component';
import { SlotProjectsComponent} from './slot-projects/slot-projects.component';
import { SearchStorageSlotsComponent } from './storage-slots/search-storage-slots/search-storage-slots.component';
import { SlotProjectComponent } from './slot-projects/slot-project/slot-project.component';
import { NewProjectComponent } from './slot-projects/new-project/new-project.component';
import { EditProjectComponent } from './slot-projects/slot-project/edit-project/edit-project.component';
import { StorageSlotComponent } from './storage-slots/search-storage-slots/storage-slot/storage-slot.component';
import { OnFloorComponent } from './on-floor/on-floor.component';
import { OnFloorSlotComponent } from './on-floor/on-floor-slot/on-floor-slot.component';
import { MediaVerificationComponent } from './on-floor/on-floor-slot/media-verification/media-verification.component';
import { StackerFullRecordComponent } from './on-floor/on-floor-slot/stacker-full-record/stacker-full-record.component';
import { VerifyTenTwentyComponent } from './on-floor/on-floor-slot/verify-ten-twenty/verify-ten-twenty.component';
import { PreventativeMaintenanceComponent } from './on-floor/on-floor-slot/preventative-maintenance/preventative-maintenance.component';
import { VerifyTwentyFiftyComponent } from './on-floor/on-floor-slot/verify-twenty-fifty/verify-twenty-fifty.component';
import { VerifyFiftyOnehundredComponent } from './on-floor/on-floor-slot/verify-fifty-onehundred/verify-fifty-onehundred.component';
import { VerifyOnehundredAboveComponent } from './on-floor/on-floor-slot/verify-onehundred-above/verify-onehundred-above.component';
import { StateInspectionComponent } from './on-floor/on-floor-slot/state-inspection/state-inspection.component';
import { GcInspectionComponent } from './on-floor/on-floor-slot/gc-inspection/gc-inspection.component';
import { LscConversionComponent } from './on-floor/on-floor-slot/lsc-conversion/lsc-conversion.component';
import { MlcConversionComponent } from './on-floor/on-floor-slot/mlc-conversion/mlc-conversion.component';
import { EditSealsComponent } from './on-floor/on-floor-slot/edit-seals/edit-seals.component';
import { ReplaceSealComponent } from './on-floor/on-floor-slot/edit-seals/replace-seal/replace-seal.component';
import { PlaceSlotSealsComponent } from './on-floor/on-floor-slot/edit-seals/replace-seal/place-slot-seals/place-slot-seals.component';
import { EditSealsLogicAccessComponent } from './on-floor/on-floor-slot/edit-seals/edit-seals-logic-access/edit-seals-logic-access.component';
import { UpdateActiveSlotComponent } from './on-floor/on-floor-slot/update-active-slot/update-active-slot.component';
import { RequestActivationComponent } from './on-floor/on-floor-slot/request-activation/request-activation.component';
import { MlcPlaceSlotComponent } from './on-floor/on-floor-slot/mlc-conversion/mlc-place-slot/mlc-place-slot.component';
import { MlcChecklistComponent } from './on-floor/on-floor-slot/mlc-conversion/mlc-place-slot/mlc-checklist/mlc-checklist.component';
import { LscPlaceSlotComponent } from './on-floor/on-floor-slot/lsc-conversion/lsc-place-slot/lsc-place-slot.component';
import { LscChecklistComponent } from './on-floor/on-floor-slot/lsc-conversion/lsc-place-slot/lsc-checklist/lsc-checklist.component';
import { CompleteMoveToStorageComponent } from './on-floor/on-floor-slot/complete-move-to-storage/complete-move-to-storage.component';
import { ScheduleMoveToStorageComponent } from './on-floor/on-floor-slot/schedule-move-to-storage/schedule-move-to-storage.component';
import { EditComponentsComponent } from './on-floor/on-floor-slot/edit-components/edit-components.component';
import { MultiOnFloorComponent } from './on-floor/multi-on-floor/multi-on-floor.component';
import { CdiComponent } from './cdi/cdi.component';
import { CdiStatusComponent } from './cdi-status/cdi-status.component';
import { CdiConflictedComponent } from './cdi/cdi-conflicted/cdi-conflicted.component';
import { CdiManualComponent } from './cdi/cdi-manual/cdi-manual.component';
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

let effortlessChildren = [
  {
    path: 'ionic',
    component: IonicComponent,
  },
  {
    path: 'storage-slots',
    component: StorageSlotsComponent,
  },
  {
    path: 'slot-projects',
    component: SlotProjectsComponent,
  },
  {
    path: 'search-storage-slots',
    component: SearchStorageSlotsComponent,
  },
  {
    path: 'slot-project/:pid',
    component: SlotProjectComponent,
  },
  {
    path: 'new-project',
    component: NewProjectComponent,
  },
  {
    path: 'edit-project',
    component: EditProjectComponent,
  },
  {
    path: 'storage-slot/:sid',
    component: StorageSlotComponent,
  },
  {
    path: 'on-floor/:sid',
    component: OnFloorComponent
  },
  {
    path: 'on-floor-slot/:sid',
    component: OnFloorSlotComponent,
  },

  {
    path: 'media-verification/:sid',
    component: MediaVerificationComponent,
  },
  {
    path: 'stacker-full-record/:sid',
    component: StackerFullRecordComponent,
  },
  {
    path: 'verify-ten-twenty/:sid',
    component: VerifyTenTwentyComponent,
  },
  {
    path: 'preventative-maintenance/:sid',
    component: PreventativeMaintenanceComponent,
  },
  {
    path: 'verify-twenty-fifty/:sid',
    component: VerifyTwentyFiftyComponent,
  },
  {
    path: 'verify-fifty-onehundred/:sid',
    component: VerifyFiftyOnehundredComponent ,
  },
  {
    path: 'verify-onehundred-above/:sid' ,
    component: VerifyOnehundredAboveComponent ,
  },
  {
    path: 'state-inspection/:sid',
    component: StateInspectionComponent,
  },
  {
    path: 'gc-inspection/:sid',
    component: GcInspectionComponent,
  },
  {
    path: 'lsc-conversion/:sid',
    component: LscConversionComponent,
  },
  {
    path: 'mlc-conversion/:sid',
    component: MlcConversionComponent,
  },
  {
    path: 'edit-seals/:sid',
    component: EditSealsComponent,
  },
  {
    path: 'edit-seals/:sid/:context',
    component: EditSealsComponent,
  },
  {
    path: 'edit-seals-logic-access/:sid',
    component: EditSealsLogicAccessComponent
  },
  {
    path: 'edit-seals-logic-access/:sid/:context',
    component: EditSealsLogicAccessComponent
  },
  {
    path: 'update-active-slot/:sid',
    component: UpdateActiveSlotComponent
  },
  {
    path: 'request-activation/:sid',
    component: RequestActivationComponent,
  },
  {
    path: 'mlc-place-slot/:sid',
    component: MlcPlaceSlotComponent,
  },
  {
    path: 'mlc-checklist/:sid',
    component: MlcChecklistComponent,
  },
  {
    path: 'lsc-place-slot/:sid',
    component: LscPlaceSlotComponent
  },
  {
    path: 'lsc-checklist/:sid',
    component: LscChecklistComponent
  },
  {
    path: 'complete-storage/:sid',
    component: CompleteMoveToStorageComponent
  },
  {
    path: 'schedule-storage',
    component: ScheduleMoveToStorageComponent
  },
  {
    path: 'edit-components/:sid/:context',
    component: EditComponentsComponent
  },
  {
    path: 'multi-select',
    component: MultiOnFloorComponent
  },
  {
    path: 'cdi',
    component: CdiComponent
  },
  {
    path: 'cdi-status',
    component: CdiStatusComponent
  },
  {
    path: 'cdi-conflicted',
    component: CdiConflictedComponent
  },
  {
    path: 'cdi-manual',
    component: CdiManualComponent
  },
  {
    path: 'cdi-search',
    component: CdiSearchComponent
  },
  {
    path: 'cdi-letter',
    component: CdiLetterComponent
  },
  {
    path: 'bj-atr',
    component: BjAtrComponent
  },
  {
    path: 'search-tables',
    component: SearchTablesComponent
  },
  {
    path: 'bj-table',
    component: BjTableComponent
  },
  {
    path: 'schedule-table-modification',
    component: ScheduleTableModificationComponent
  },
  {
    path: 'schedule-table-remove',
    component: ScheduleTableRemoveComponent
  },
  {
    path: 'schedule-tournament',
    component: ScheduleTournamentComponent
  },
  {
    path: 'log-felt-change',
    component: LogFeltChangeComponent
  },
  {
    path: 'felt-change-checklist',
    component: FeltChangeChecklistComponent
  },
  {
    path: 'complete-table-modification',
    component: CompleteTableModificationComponent
  },
  {
    path: 'complete-table-remove',
    component: CompleteTableRemoveComponent
  },
  {
    path: 'schedule-conversion/:sid',
    component: ScheduleConversionComponent
  },
  {
    path: 'project-schedule-conversion',
    component: ProjectScheduleConversionComponent
  }
];

const routes: Routes = [{
  path: '',
  component: EffortlessComponent,
  children: effortlessChildren,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EffortlessRoutingModule {
}
