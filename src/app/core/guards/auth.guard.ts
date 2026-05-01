import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // TODO: Implement server-side session validation
  // Client-side signals can be tampered with; always verify on backend
  if (authService.$isLoggedIn()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
