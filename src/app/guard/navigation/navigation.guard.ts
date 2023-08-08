import { CanActivateFn, Router } from '@angular/router';
import { JwtService } from '../../utils/jwt.service';
import { inject } from '@angular/core';

export const navigationGuard: CanActivateFn = (route, state) => {
  const jwtService = inject(JwtService);
  const router = inject(Router);
  const decodedToken = jwtService.decodeJwtToken();
  if (decodedToken.IsSuccessful && decodedToken.data != null) {
    return router.parseUrl('/');
  }
  return true;
};
