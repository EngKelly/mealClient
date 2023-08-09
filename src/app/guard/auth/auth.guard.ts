import { JwtService } from './../../utils/jwt.service';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const jwtService = inject(JwtService);
  const router = inject(Router);
  const decodedToken = jwtService.decodeJwtToken();
  if (decodedToken.IsSuccessful && decodedToken.data != null) {
    return true;
  }
  return router.parseUrl('/login');
};
