import { UserDto } from '../../data/Dto/auth/user.dto';

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtService } from '../../utils/jwt.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const jwtService = inject(JwtService);
  const router = inject(Router);
  const decodedToken = jwtService.decodeJwtToken();
  const user: UserDto = decodedToken.data;
  if (user == null) {
    return router.parseUrl('/login');
  }
  const IsAdmin: boolean = user.roles.some((role) => {
    if (role == 'admin') {
      return true;
    }
    return false;
  });
  if (IsAdmin) {
    return true;
  } else {
    return router.parseUrl('/home');
  }
};
