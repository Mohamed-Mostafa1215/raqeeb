import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * RBQX Authentication Overlay:
 * Injects security tokens into all authorized requests.
 * SSR-Safe: Only attempts access in browser context.
 *
 * SECURITY AUDIT (CRITICAL):
 * - Current implementation reads from localStorage, which is vulnerable to XSS.
 * - RECOMMENDATION: Migrate to HttpOnly, Secure, SameSite cookies managed by the backend.
 * - This prevents client-side JavaScript from accessing the token directly.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    // TODO: Replace localStorage with document.cookie access or rely on withCredentials: true
    const token = localStorage.getItem('raqeeb_token');

    if (token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        },
        // TODO: Enable withCredentials when moving to cookie-based auth
        // withCredentials: true
      });
      return next(authReq);
    }
  }

  return next(req);
};
