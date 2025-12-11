import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './main/main.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxGaugeModule } from 'ngx-gauge';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { OfferListComponent } from './offer-list/offer-list.component';
import { OfferPipe } from '../core/pipes/offer.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ToastrModule } from 'ngx-toastr';
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { VmRequestComponent } from './vm-request/vm-request.component';
import {MatStepperModule} from '@angular/material/stepper';
import { MyRequestsComponent } from './vm-request/my-requests/my-requests.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { MyTasksComponent } from './my-tasks/my-tasks.component';
import { EditTaskComponent } from './my-tasks/edit-task/edit-task.component';
import { ProfileComponent } from './profile/profile.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CertificationFormComponent } from './profile/certification-form/certification-form.component';
import { DownloadCVComponent } from './profile/download-cv/download-cv.component';
import { EditCertificationFormComponent } from './profile/edit-certification-form/edit-certification-form.component';
import { EditEducationFormComponent } from './profile/edit-education-form/edit-education-form.component';
import { EditExperienceFormComponent } from './profile/edit-experience-form/edit-experience-form.component';
import { EditProjectFormComponent } from './profile/edit-project-form/edit-project-form.component';
import { EditSkillsFormComponent } from './profile/edit-skills-form/edit-skills-form.component';
import { EditSummaryFormComponent } from './profile/edit-summary-form/edit-summary-form.component';
import { ProjectFormComponent } from './profile/project-form/project-form.component';
import { SkillsFormComponent } from './profile/skills-form/skills-form.component';
import { EducationFormComponent } from './profile/education-form/education-form.component';
import { ExperienceFormComponent } from './profile/experience-form/experience-form.component';
import { LanguageModalComponent } from './profile/language-modal/language-modal.component';
import { EditLanguageModalComponent } from './profile/edit-language-modal/edit-language-modal.component';
import { DocsComponent } from './docs/docs.component';
import { AddDocsComponent } from './docs/add-docs/add-docs.component';
import { MeetingScheduleFormComponent } from './meeting-schedule-form/meeting-schedule-form.component';
import { RequestMeetingInfoComponent } from './request-meeting-info/request-meeting-info.component';

@NgModule({
  declarations: [
    MainComponent, 
    OfferListComponent ,
    OfferPipe, 
    OfferDetailsComponent, 
    VmRequestComponent,
    MyRequestsComponent,
    MyTasksComponent,
    EditTaskComponent,
    ProfileComponent,
    CertificationFormComponent,
    ProjectFormComponent,
    SkillsFormComponent,
    EditProjectFormComponent,
    EditSkillsFormComponent,
    EditCertificationFormComponent,
    EditExperienceFormComponent,
    EditEducationFormComponent,
    EditSummaryFormComponent,
    DownloadCVComponent,
    EducationFormComponent,
    ExperienceFormComponent,
    LanguageModalComponent,
    EditLanguageModalComponent,
    DocsComponent,
    AddDocsComponent,
    MeetingScheduleFormComponent,
    RequestMeetingInfoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatStepperModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    NgbModule,
    DashboardRoutingModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left'
    }),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    NgScrollbarModule,
    NgbProgressbarModule,
    FullCalendarModule,
    NgxGaugeModule,
    NgbCollapseModule
    
  ],
})
export class DashboardModule {}
