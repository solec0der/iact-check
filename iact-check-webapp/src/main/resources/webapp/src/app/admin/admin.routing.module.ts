import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { CustomerDetailComponent } from './customers/customer-detail/customer-detail.component';
import { CheckListComponent } from './customers/customer-detail/checks/check-list/check-list.component';
import { CheckDetailComponent } from './customers/customer-detail/checks/check-detail/check-detail.component';
import { QuestionCategoryDetailComponent } from './customers/customer-detail/checks/check-detail/question-category-detail/question-category-detail.component';
import { RangeQuestionDetailComponent } from './customers/customer-detail/checks/check-detail/question-category-detail/range-question-detail/range-question-detail.component';
import { PossibleOutcomeDetailComponent } from './customers/customer-detail/checks/check-detail/question-category-detail/possible-outcome-detail/possible-outcome-detail.component';
import { CustomerBrandingComponent } from './customers/customer-detail/customer-branding/customer-branding.component';
import { GeneralSettingsComponent } from './customers/customer-detail/customer-settings/general-settings/general-settings.component';
import { EmailSettingsComponent } from './customers/customer-detail/customer-settings/email-settings/email-settings.component';
import { TextSettingsComponent } from './customers/customer-detail/customer-settings/text-settings/text-settings.component';
import { CustomerSettingsComponent } from './customers/customer-detail/customer-settings/customer-settings.component';
import { ImageQuestionDetailComponent } from './customers/customer-detail/checks/check-detail/question-category-detail/image-question-detail/image-question-detail.component';
import { FlashCardQuestionDetailComponent } from './customers/customer-detail/checks/check-detail/flash-card-question-detail/flash-card-question-detail.component';
import { DocumentGroupDetailComponent } from './customers/customer-detail/checks/check-detail/document-group-detail/document-group-detail.component';
import { DocumentDetailComponent } from './customers/customer-detail/checks/check-detail/document-group-detail/document-detail/document-detail.component';
import { LogsComponent } from './logs/logs.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'customers',
        pathMatch: 'full',
      },
      {
        path: 'customers',
        component: CustomerListComponent,
      },
      {
        path: 'customers/:customerId/checks',
        component: CheckListComponent,
      },
      {
        path: 'customers/:customerId/checks/:checkId/:action',
        component: CheckDetailComponent,
      },
      {
        path: 'customers/:customerId/checks/:checkId/question-categories/:questionCategoryId/:action',
        component: QuestionCategoryDetailComponent,
      },
      {
        path: 'customers/:customerId/checks/:checkId/flash-card-questions/:flashCardQuestionId/:action',
        component: FlashCardQuestionDetailComponent,
      },
      {
        path: 'customers/:customerId/checks/:checkId/document-groups/:documentGroupId/:action',
        component: DocumentGroupDetailComponent,
      },
      {
        path: 'customers/:customerId/checks/:checkId/document-groups/:documentGroupId/documents/:documentId/:action',
        component: DocumentDetailComponent,
      },
      {
        path:
          'customers/:customerId/checks/:checkId/question-categories/:questionCategoryId/range-questions/:rangeQuestionId/:action',
        component: RangeQuestionDetailComponent,
      },
      {
        path:
          'customers/:customerId/checks/:checkId/question-categories/:questionCategoryId/image-questions/:imageQuestionId/:action',
        component: ImageQuestionDetailComponent,
      },
      {
        path:
          'customers/:customerId/checks/:checkId/question-categories/:questionCategoryId/possible-outcomes/:possibleOutcomeId/:action',
        component: PossibleOutcomeDetailComponent,
      },
      {
        path: 'customers/:customerId/branding',
        component: CustomerBrandingComponent,
      },
      {
        path: 'customers/:customerId/settings',
        component: CustomerSettingsComponent,
        children: [
          {
            path: '',
            redirectTo: 'general',
            pathMatch: 'full',
          },
          {
            path: 'general',
            component: GeneralSettingsComponent,
          },
          {
            path: 'email',
            component: EmailSettingsComponent,
          },
          {
            path: 'text',
            component: TextSettingsComponent,
          },
        ],
      },
      {
        path: 'customers/:customerId/:action',
        component: CustomerDetailComponent,
      },
      {
        path: 'logs',
        component: LogsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
