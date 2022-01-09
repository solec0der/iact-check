import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.routing.module';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { AdminComponent } from './admin.component';
import { MaterialModule } from '../material.module';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { CustomerDetailComponent } from './customers/customer-detail/customer-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMatColorPickerModule } from '@angular-material-components/color-picker';
import { CheckListComponent } from './customers/customer-detail/checks/check-list/check-list.component';
import { CheckDetailComponent } from './customers/customer-detail/checks/check-detail/check-detail.component';
import { QuestionCategoryListComponent } from './customers/customer-detail/checks/check-detail/question-category-list/question-category-list.component';
import { QuestionCategoryDetailComponent } from './customers/customer-detail/checks/check-detail/question-category-detail/question-category-detail.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { RangeQuestionListComponent } from './customers/customer-detail/checks/check-detail/question-category-detail/range-question-list/range-question-list.component';
import { RangeQuestionDetailComponent } from './customers/customer-detail/checks/check-detail/question-category-detail/range-question-detail/range-question-detail.component';
import { PossibleOutcomeListComponent } from './customers/customer-detail/checks/check-detail/question-category-detail/possible-outcome-list/possible-outcome-list.component';
import { PossibleOutcomeDetailComponent } from './customers/customer-detail/checks/check-detail/question-category-detail/possible-outcome-detail/possible-outcome-detail.component';
import { CustomerBrandingComponent } from './customers/customer-detail/customer-branding/customer-branding.component';
import { GeneralSettingsComponent } from './customers/customer-detail/customer-settings/general-settings/general-settings.component';
import { EmailSettingsComponent } from './customers/customer-detail/customer-settings/email-settings/email-settings.component';
import { TextSettingsComponent } from './customers/customer-detail/customer-settings/text-settings/text-settings.component';
import { CustomerSettingsComponent } from './customers/customer-detail/customer-settings/customer-settings.component';
import { CustomerGeneralComponent } from './customers/customer-detail/customer-general/customer-general.component';
import { CustomerUserRegistrationFieldsComponent } from './customers/customer-detail/customer-user-registration-fields/customer-user-registration-fields.component';
import { ImageQuestionListComponent } from './customers/customer-detail/checks/check-detail/question-category-detail/image-question-list/image-question-list.component';
import { ImageQuestionDetailComponent } from './customers/customer-detail/checks/check-detail/question-category-detail/image-question-detail/image-question-detail.component';
import { FlashCardQuestionListComponent } from './customers/customer-detail/checks/check-detail/flash-card-question-list/flash-card-question-list.component';
import { FlashCardQuestionDetailComponent } from './customers/customer-detail/checks/check-detail/flash-card-question-detail/flash-card-question-detail.component';
import { DocumentGroupListComponent } from './customers/customer-detail/checks/check-detail/document-group-list/document-group-list.component';
import { DocumentGroupDetailComponent } from './customers/customer-detail/checks/check-detail/document-group-detail/document-group-detail.component';
import { DocumentDetailComponent } from './customers/customer-detail/checks/check-detail/document-group-detail/document-detail/document-detail.component';
import { DocumentListComponent } from './customers/customer-detail/checks/check-detail/document-group-detail/document-list/document-list.component';

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    AdminComponent,
    CustomerListComponent,
    CustomerDetailComponent,
    CheckListComponent,
    CheckDetailComponent,
    QuestionCategoryListComponent,
    QuestionCategoryDetailComponent,
    RangeQuestionListComponent,
    RangeQuestionDetailComponent,
    PossibleOutcomeListComponent,
    PossibleOutcomeDetailComponent,
    CustomerBrandingComponent,
    GeneralSettingsComponent,
    EmailSettingsComponent,
    TextSettingsComponent,
    CustomerSettingsComponent,
    CustomerGeneralComponent,
    CustomerUserRegistrationFieldsComponent,
    ImageQuestionListComponent,
    ImageQuestionDetailComponent,
    FlashCardQuestionListComponent,
    FlashCardQuestionDetailComponent,
    DocumentGroupListComponent,
    DocumentGroupDetailComponent,
    DocumentDetailComponent,
    DocumentListComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    TranslateModule.forChild({}),
    ReactiveFormsModule,
    NgxMatColorPickerModule,
    NgxMatFileInputModule,
  ],
  bootstrap: [AdminComponent],
})
export class AdminModule {}
