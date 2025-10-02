import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Get the token from local storage
  const authToken = localStorage.getItem('jwt_token');

  // 2. Clone the request and add the Authorization header
  if (authToken) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });
    // 3. Pass the cloned request to the next handler
    return next(authReq);
  }

  // If no token exists, pass the original request
  return next(req);
};