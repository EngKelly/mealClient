import { CanActivateFn } from '@angular/router';

export const navigationGuard: CanActivateFn = (route, state) => {
  return true;
};
