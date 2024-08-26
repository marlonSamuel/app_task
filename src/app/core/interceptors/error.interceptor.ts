import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

/**
 * An HTTP interceptor that handles errors from HTTP requests.
 * 
 * This interceptor catches any errors thrown during the HTTP request process,
 * logs an appropriate error message to the console, and returns an observable with the error message.
 * 
 * @param req - The outgoing HTTP request to be intercepted
 * @param next - A function to pass the request to the next interceptor or handler
 * @returns An observable of the HTTP response or error
*/
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  // Inject the Router service
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      let errorMessage = 'Ocurrió un error desconocido.';
      if (error.error instanceof ErrorEvent) {
        // Handle client-side or network errors
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Handle HTTP errors
        errorMessage = `Status Code: ${error.status}\nMessage: ${error.message}`;

        if (error.status === 404) {
          // Navigate to the login page if the error status is 404
          router.navigate(['/login']);
        }
      }
      return throwError(() => new Error(errorMessage)); // Handle client-side or network errors
    })
  );
};
