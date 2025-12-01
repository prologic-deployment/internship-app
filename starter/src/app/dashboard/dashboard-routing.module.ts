import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { OfferListComponent } from './offer-list/offer-list.component';
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { VmRequestComponent } from './vm-request/vm-request.component';
import { MyRequestsComponent } from './vm-request/my-requests/my-requests.component';
import { MyTasksComponent } from './my-tasks/my-tasks.component';
import { ProfileComponent } from './profile/profile.component';
import { DocsComponent } from './docs/docs.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    component: MainComponent,
  },
  {
    path: 'offer',
    component: OfferListComponent,
  },
  {
    path: 'offerDetails/:id',
    component: OfferDetailsComponent,
  },
  {
    path: 'lab-request',
    component: VmRequestComponent,
  },
  {
    path: 'lab-request/:id',
    component: VmRequestComponent,
  },
  {
    path: 'myRequest',
    component: MyRequestsComponent,
  },
  {
    path: 'assignedTasks',
    component: MyTasksComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'adDocs',
    component: DocsComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
