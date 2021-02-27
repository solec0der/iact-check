import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CheckComponent } from './check.component';
import { StepsComponent } from './steps/steps.component';
import { WelcomeScreenComponent } from './steps/welcome-screen/welcome-screen.component';

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
