import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { UspComponent } from './effortless.component';

const routes: Routes = [{
  path: '',
  component: UspComponent,
  children: [
    {
      path: 'inquiries',
      component: InquiriesComponent,
    },
    {
      path: 'inquiries/inquiry/:iid',
      component: InquiryComponent,
    },
    {
      path: 'clients',
      component: ClientsComponent,
    },
    {
      path: 'clients/client/:cid',
      component: ClientComponent,
    },
    {
      path: 'facilities',
      component: FacilitiesComponent,
    },
    {
      path: 'facilities/facility/:fid',
      component: FacilityComponent,
    },
    {
      path: 'placements',
      component: PlacementsComponent,
    },
    {
      path: 'placements/placement/:pid',
      component: PlacementComponent,
    },
    {
      path: 'referral-sources',
      component: ReferralSourcesComponent,
    },
    {
      path: 'referral-sources/referral-source/:pid',
      component: ReferralSourceComponent,
    },
    {
      path: 'team-members',
      component: TheTeamComponent,
    },
    {
      path: 'team-members/team-member/:pid',
      component: TeamMemberComponent,
    },
    {
      path: 'configuration',
      component: ConfigurationComponent,
    },
    {
      path: 'clients/discovery-questions/:pid',
      component: DiscoveryQuestionsComponent,
    },
    {
      path: 'configuration/discovery-questions',
      component: ConfigureDiscoveryQuestionsComponent,
    },
    {
      path: 'configuration/facility-types',
      component: FacilityTypesComponent,
    },
    {
      path: 'configuration/placement-stages',
      component: PlacementStagesComponent,
    },
    {
      path: 'configuration/price-ranges',
      component: PriceRangesComponent,
    },
    {
      path: 'configuration/activities',
      component: ActivitiesComponent,
    },
    {
      path: 'configuration/adls',
      component: ADLsComponent,
    },
    {
      path: 'configuration/cognitive-disabilities',
      component: CognitiveDisabilitiesComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UspRoutingModule {
}
