import { HttpInterceptorFn } from '@angular/common/http';

/**
 * An HTTP interceptor that adds an authorization token to outgoing HTTP requests.
 * 
 * The interceptor checks for the presence of an `authToken` in `localStorage` and, if found,
 * attaches it to the `Authorization` header of the outgoing request.
 * 
 * @param req - The outgoing HTTP request to be intercepted
 * @param next - A function to pass the request to the next interceptor or handler
 * @returns An observable of the HTTP response
*/
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // get the authentication token from localStorage
  const token = localStorage.getItem('authToken');

  if (token) {
    // Clone the request and add the Authorization header if token is present
    const request = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(request);
  }

  // Pass the original request if no token is found
  return next(req);
};
