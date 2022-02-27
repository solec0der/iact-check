import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializer } from './shared/keycloak/init-keycloak';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from './shared/translation/http-loader-factory';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { MAT_COLOR_FORMATS, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import { JsonInterceptor } from './shared/interceptors/json.interceptor';
import { ConfirmDialogComponent } from './shared/dialogs/confirm-dialog/confirm-dialog.component';
import { HttpExceptionDialogComponent } from './shared/dialogs/http-exception-dialog/http-exception-dialog.component';
import { GlobalHttpInterceptor } from './shared/interceptors/global-http.interceptor';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { KeycloakInfoService } from './shared/services/keycloak-info.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { GlobalErrorHandler } from './shared/interceptors/global-error-handler';
import { TruncatePipe } from './shared/pipes/truncate.pipe';

@NgModule({
  declarations: [AppComponent, ConfirmDialogComponent, HttpExceptionDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    KeycloakAngularModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgxMatFileInputModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      deps: [KeycloakService, KeycloakInfoService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JsonInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpInterceptor,
      multi: true,
    },
    {
      provide: MAT_COLOR_FORMATS,
      useValue: NGX_MAT_COLOR_FORMATS,
    },
    { provide: MAT_DATE_LOCALE, useValue: 'de-CH' },
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
