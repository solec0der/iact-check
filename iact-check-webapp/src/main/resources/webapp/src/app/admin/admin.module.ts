import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.routing.module';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { AdminComponent } from './admin.component';
import { MaterialModule } from '../material.module';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageComponent } from './settings/language/language.component';
import { CustomerDetailComponent } from './customers/customer-detail/customer-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMatColorPickerModule } from '@angular-material-components/color-picker';
import { CheckListComponent } from './customers/checks/check-list/check-list.component';
import { CheckDetailComponent } from './customers/checks/check-detail/check-detail.component';

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    AdminComponent,
    CustomerListComponent,
    LanguageComponent,
    CustomerDetailComponent,
    CheckListComponent,
    CheckDetailComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    TranslateModule.forChild({}),
    ReactiveFormsModule,
    NgxMatColorPickerModule,
  ],
  bootstrap: [AdminComponent],
})
export class AdminModule {}
