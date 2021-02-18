import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { catchError, map } from 'rxjs/operators';
import { HttpExceptionDialogComponent } from '../dialogs/http-exception-dialog/http-exception-dialog.component';
import { HTTP_ERROR_MESSAGES } from '../model/http-error-messages';

@Injectable()
export class GlobalHttpInterceptor implements HttpInterceptor {
  constructor(private matDialog: MatDialog) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          this.matDialog.closeAll();

          const httpErrorMessage = HTTP_ERROR_MESSAGES[error.status];

          this.matDialog.open(HttpExceptionDialogComponent, {
            data: {
              title: httpErrorMessage.title,
              content: httpErrorMessage.content
                ? httpErrorMessage.content
                : error.message,
              showReloadButton: httpErrorMessage.showReloadButton,
            },
          });
        }
        return throwError(error);
      })
    );
  }
}
