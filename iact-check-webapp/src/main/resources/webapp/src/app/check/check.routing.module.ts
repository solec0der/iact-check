import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CheckComponent } from './check.component';
import { StepsComponent } from './steps/steps.component';
import { WelcomeScreenComponent } from './steps/welcome-screen/welcome-screen.component';
import { UserRegistrationComponent } from './steps/user-registration/user-registration.component';
import { QuestionCategorySelectionComponent } from './steps/question-category-selection/question-category-selection.component';
import { QuestionsFormComponent } from './steps/questions-form/questions-form.component';
import { PossibleOutcomesComponent } from './steps/possible-outcomes/possible-outcomes.component';
import { ConfirmationScreenComponent } from './steps/confirmation-screen/confirmation-screen.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { DocumentGroupOverviewComponent } from './marketplace/document-group-overview/document-group-overview.component';
import { DocumentOverviewComponent } from './marketplace/document-group-overview/document-overview/document-overview.component';
import { IntroductionScreenComponent } from './steps/introduction-screen/introduction-screen.component';
import { FinalMarketplaceSlideComponent } from './marketplace/final-marketplace-slide/final-marketplace-slide.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'customers/-1/checks/-1',
  },
  {
    path: 'customers/:customerId/checks/:checkId',
    component: CheckComponent,
    children: [
      {
        path: 'marketplace',
        component: MarketplaceComponent,
      },
      {
        path: 'marketplace/final-slide',
        component: FinalMarketplaceSlideComponent,
      },
      {
        path: 'marketplace/document-groups',
        component: DocumentGroupOverviewComponent,
      },
      {
        path: 'marketplace/document-groups/:documentGroupId/documents',
        component: DocumentOverviewComponent,
      },
      {
        path: 'steps',
        component: StepsComponent,
        children: [
          {
            path: '1',
            component: WelcomeScreenComponent,
          },
          {
            path: '2',
            component: UserRegistrationComponent,
          },
          {
            path: '3',
            component: IntroductionScreenComponent,
          },
          {
            path: '4',
            component: QuestionCategorySelectionComponent,
          },
          {
            path: '5',
            component: QuestionsFormComponent,
          },
          {
            path: '6',
            component: PossibleOutcomesComponent,
          },
          {
            path: '7',
            component: ConfirmationScreenComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckRoutingModule {}
