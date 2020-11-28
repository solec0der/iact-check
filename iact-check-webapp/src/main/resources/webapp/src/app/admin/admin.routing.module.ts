import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { LanguageComponent } from './settings/language/language.component';
import { CustomerDetailComponent } from './customers/customer-detail/customer-detail.component';

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
