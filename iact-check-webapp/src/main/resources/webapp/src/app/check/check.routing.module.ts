import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CheckComponent } from './check.component';
import { StepsComponent } from './steps/steps.component';
import { WelcomeScreenComponent } from './steps/welcome-screen/welcome-screen.component';
import { UserRegistrationComponent } from './steps/user-registration/user-registration.component';
import { QuestionCategorySelectionComponent } from './steps/question-category-selection/question-category-selection.component';

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
            component: QuestionCategorySelectionComponent,
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
