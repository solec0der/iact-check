import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { LanguageComponent } from './settings/language/language.component';
import { CustomerDetailComponent } from './customers/customer-detail/customer-detail.component';
import { CheckListComponent } from './customers/checks/check-list/check-list.component';
import { CheckDetailComponent } from './customers/checks/check-detail/check-detail.component';
import { QuestionCategoryDetailComponent } from './customers/checks/check-detail/question-category-detail/question-category-detail.component';
import { RangeQuestionDetailComponent } from './customers/checks/check-detail/question-category-detail/range-question-detail/range-question-detail.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
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
        path:
          'customers/:customerId/checks/:checkId/question-categories/:questionCategoryId/:action',
        component: QuestionCategoryDetailComponent,
      },
      {
        path:
          'customers/:customerId/checks/:checkId/question-categories/:questionCategoryId/range-questions/:rangeQuestionId/:action',
        component: RangeQuestionDetailComponent,
      },
      {
        path: 'customers/:customerId/:action',
        component: CustomerDetailComponent,
      },
      {
        path: 'settings',
        redirectTo: 'settings/language',
        pathMatch: 'full',
      },
      {
        path: 'settings/language',
        component: LanguageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
