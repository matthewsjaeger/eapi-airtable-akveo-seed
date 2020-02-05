import { NgModule } from '@angular/core';
import { EffortlessRoutingModule } from './effortless-routing.module';
import { NbMenuModule, NbCardModule, NbButtonModule, NbActionsModule, NbSelectModule, NbInputModule, NbTabsetModule, NbIconModule, NbSpinnerModule, NbToggleModule, NbListModule, NbDialogModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { EffortlessComponent } from './effortless.component';
import { FormsModule } from '@angular/forms';
import { Ng5SliderModule } from 'ng5-slider';
import { ReloadWidgetComponent } from './widgets/reload-widget/reload-widget.component';
import { IonicComponent } from './ionic/ionic.component';
import { Page2Component } from './page2/page2.component';
import { Page3Component } from './page3/page3.component';
import { JsonEditorModule } from 'ng2-json-editor';
import { StorageSlotsComponent} from './storage-slots/storage-slots.component';
import { SlotProjectsComponent} from './slot-projects/slot-projects.component';
import { SearchStorageSlotsComponent} from './storage-slots/search-storage-slots/search-storage-slots.component';
import { SlotProjectComponent } from './slot-projects/slot-project/slot-project.component';
import { NewProjectComponent } from './slot-projects/new-project/new-project.component';
import { EditProjectComponent } from './slot-projects/slot-project/edit-project/edit-project.component';
import { StorageSlotComponent } from './storage-slots/search-storage-slots/storage-slot/storage-slot.component';
import { OnFloorComponent } from './on-floor/on-floor.component';

let declarations: any[] = [EffortlessComponent, ReloadWidgetComponent, IonicComponent, Page2Component, Page3Component, 
  StorageSlotsComponent, SlotProjectsComponent, SearchStorageSlotsComponent, SlotProjectComponent, NewProjectComponent, EditProjectComponent, StorageSlotComponent, OnFloorComponent];

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
    NbDialogModule.forChild()
  ],
})
export class EffortlessModule {

}
