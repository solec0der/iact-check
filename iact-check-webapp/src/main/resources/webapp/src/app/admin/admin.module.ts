import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.routing.module';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { AdminComponent } from './admin.component';
import { MaterialModule } from '../material.module';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';

@NgModule({
  declarations: [SidebarComponent, HeaderComponent, AdminComponent, CustomerListComponent],
  imports: [CommonModule, AdminRoutingModule, MaterialModule],
  bootstrap: [AdminComponent],
})
export class AdminModule {}
