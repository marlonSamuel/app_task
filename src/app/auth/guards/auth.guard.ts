import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

/**
 * Auth Guard function for route protection.
 * 
 * This function checks if a user is authenticated and allows or denies access to a route based on the authentication status.
 * It also handles redirections for authenticated and unauthenticated users.
 * 
 * @param {ActivatedRouteSnapshot} route - The route that is being activated.
 * @param {RouterStateSnapshot} state - The state of the router at the moment of activation.
 * @return {Observable<boolean>} - An observable that resolves to true if access is allowed, or false if access is denied.
*/
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuth().pipe(
    map(isAuthenticated => {
      if (isAuthenticated && route.routeConfig?.path === 'login') {
        router.navigate(['']); // Redirects to the home page if authenticated and trying to access login
        return false;
      }
      if (!isAuthenticated && route.routeConfig?.path !== 'login') {
        router.navigate(['/login']); // Redirects to the login page if not authenticated and trying to access a protected route
        return false;
      }
      return true; // Allows navigation if the user is authenticated or trying to access the login page
    }),
    catchError(() => {
      router.navigate(['/login']); // Handles errors by redirecting to the login page
      return of(false);
    })
  );
};
