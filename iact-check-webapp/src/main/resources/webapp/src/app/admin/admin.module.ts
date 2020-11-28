import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.routing.module';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { AdminComponent } from './admin.component';

@NgModule({
  declarations: [SidebarComponent, HeaderComponent, AdminComponent],
  imports: [CommonModule, AdminRoutingModule],
  bootstrap: [AdminComponent]
})
export class AdminModule {}
