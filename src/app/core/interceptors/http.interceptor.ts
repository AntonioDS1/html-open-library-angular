import { HttpInterceptorFn } from '@angular/common/http';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {

  // Logghiamo semplicemente la richiesta
  console.log('[HTTP REQUEST]', req.url);

  // Non modifichiamo nulla
  return next(req);
};
