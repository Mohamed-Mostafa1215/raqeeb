import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('RBQX_SYSTEM_LOG: Protocol_Error Encountered.', error);

      let errorMsg = 'SYSTEM_ERROR: INTERNAL_SYNC_FAIL';
      if (error.status === 401) errorMsg = 'PROTOCOL_ERROR: UNAUTHORIZED_SECTOR_ACCESS';
      if (error.status === 403) errorMsg = 'PROTOCOL_ERROR: RESTRICTED_OPERATIONS';
      if (error.status === 404) errorMsg = 'GRID_ERROR: NODE_NOT_LOCATED';

      messageService.add({
        severity: 'error',
        summary: 'ALERT: SYNC_FAILURE',
        detail: errorMsg,
        life: 5000
      });

      return throwError(() => error);
    })
  );
};
