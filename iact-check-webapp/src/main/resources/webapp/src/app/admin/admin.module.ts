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
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    AdminComponent,
    CustomerListComponent,
    LanguageComponent,
    CustomerDetailComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    TranslateModule.forChild({}),
    ReactiveFormsModule,
  ],
  bootstrap: [AdminComponent],
})
export class AdminModule {}
