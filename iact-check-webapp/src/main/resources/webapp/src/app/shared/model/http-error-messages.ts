import { HttpExceptionDialogData } from '../dialogs/http-exception-dialog/http-exception-dialog.component';

export const HTTP_ERROR_MESSAGES: Record<number, HttpExceptionDialogData> = {
  400: {
    title: 'ERROR_MESSAGES.BAD_REQUEST',
    showReloadButton: false,
  },
  401: {
    title: 'ERROR_MESSAGES.UNAUTHORIZED',
    showReloadButton: false,
  },
  403: {
    title: 'ERROR_MESSAGES.FORBIDDEN',
    showReloadButton: false,
  },
  404: {
    title: 'ERROR_MESSAGES.NOT_FOUND',
    showReloadButton: false,
  },
  500: {
    title: 'ERROR_MESSAGES.INTERNAL_SERVER_ERROR',
    showReloadButton: false,
  },
  502: {
    title: 'ERROR_MESSAGES.SERVICE_UNAVAILABLE_TITLE',
    content: 'ERROR_MESSAGES.SERVICE_UNAVAILABLE_CONTENT',
    showReloadButton: true,
  },
};
