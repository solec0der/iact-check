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
import { QuestionCategorySelectionComponent } from './steps/question-category-selection/question-category-selection.component';
import { QuestionsFormComponent } from './steps/questions-form/questions-form.component';
import { PossibleOutcomesComponent } from './steps/possible-outcomes/possible-outcomes.component';
import { PossibleOutcomeDetailComponent } from './steps/possible-outcomes/possible-outcome-detail/possible-outcome-detail.component';
import { ConfirmationScreenComponent } from './steps/confirmation-screen/confirmation-screen.component';
import { RangeQuestionComponent } from './steps/questions-form/range-question/range-question.component';
import { ImageQuestionComponent } from './steps/questions-form/image-question/image-question.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { FlashCardsComponent } from './marketplace/flash-cards/flash-cards.component';

@NgModule({
  declarations: [
    CheckComponent,
    WelcomeScreenComponent,
    StepsComponent,
    UserRegistrationComponent,
    QuestionCategorySelectionComponent,
    QuestionsFormComponent,
    PossibleOutcomesComponent,
    PossibleOutcomeDetailComponent,
    ConfirmationScreenComponent,
    RangeQuestionComponent,
    ImageQuestionComponent,
    MarketplaceComponent,
    FlashCardsComponent,
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
