import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckRoutingModule } from './check.routing.module';
import { CheckComponent } from './check.component';
import { WelcomeScreenComponent } from './steps/welcome-screen/welcome-screen.component';
import { StepsComponent } from './steps/steps.component';
import {MatRippleModule} from "@angular/material/core";

@NgModule({
  declarations: [CheckComponent, WelcomeScreenComponent, StepsComponent],
  imports: [
    CommonModule,
    CheckRoutingModule,
    MaterialModule,
    TranslateModule.forChild({}),
    ReactiveFormsModule,
    MatRippleModule,
  ],
})
export class CheckModule {}
