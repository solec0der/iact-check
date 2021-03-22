import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckRoutingModule } from './check.routing.module';
import { CheckComponent } from './check.component';
import { WelcomeScreenComponent } from './steps/welcome-screen/welcome-screen.component';
import { StepsComponent } from './steps/steps.component';
import { MatRippleModule } from '@angular/material/core';
import { UserRegistrationComponent } from './steps/user-registration/user-registration.component';
import { SharedTranslateModule } from '../shared/translation/shared-translate.module';

@NgModule({
  declarations: [
    CheckComponent,
    WelcomeScreenComponent,
    StepsComponent,
    UserRegistrationComponent,
  ],
  imports: [
    CommonModule,
    CheckRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatRippleModule,
    SharedTranslateModule,
  ],
})
export class CheckModule {}
